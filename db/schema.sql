-- =====================================================================
--  Shri Sai Ayurveda — Admin/Clinic database schema (PostgreSQL)
--  Run once against your database:  psql "$DATABASE_URL" -f db/schema.sql
-- =====================================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;   -- for gen_random_uuid()

-- ---------- updated_at helper ----------------------------------------
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ---------- admin users (login / signup) -----------------------------
CREATE TABLE IF NOT EXISTS admin_users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT        NOT NULL,
  email         TEXT        NOT NULL UNIQUE,
  password_hash TEXT        NOT NULL,
  role          TEXT        NOT NULL DEFAULT 'admin',   -- admin | staff
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---------- doctors --------------------------------------------------
CREATE TABLE IF NOT EXISTS doctors (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name           TEXT        NOT NULL,
  qualification  TEXT,
  specialization TEXT,
  phone          TEXT,
  email          TEXT,
  bio            TEXT,
  active         BOOLEAN     NOT NULL DEFAULT TRUE,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---------- doctor weekly availability -------------------------------
-- weekday: 0 = Sunday … 6 = Saturday
CREATE TABLE IF NOT EXISTS doctor_availability (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id    UUID NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
  weekday      SMALLINT NOT NULL CHECK (weekday BETWEEN 0 AND 6),
  start_time   TIME NOT NULL,
  end_time     TIME NOT NULL,
  slot_minutes INT  NOT NULL DEFAULT 30,
  active       BOOLEAN NOT NULL DEFAULT TRUE,
  UNIQUE (doctor_id, weekday)
);

-- ---------- patients -------------------------------------------------
CREATE TABLE IF NOT EXISTS patients (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name      TEXT        NOT NULL,
  phone          TEXT        NOT NULL,
  email          TEXT,
  gender         TEXT,                       -- male | female | other
  dob            DATE,
  address        TEXT,
  blood_group    TEXT,
  marital_status TEXT,
  notes          TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_patients_phone ON patients (phone);
CREATE INDEX IF NOT EXISTS idx_patients_name  ON patients (lower(full_name));

DROP TRIGGER IF EXISTS trg_patients_updated ON patients;
CREATE TRIGGER trg_patients_updated BEFORE UPDATE ON patients
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ---------- appointments --------------------------------------------
CREATE TABLE IF NOT EXISTS appointments (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id       UUID REFERENCES patients(id) ON DELETE SET NULL,
  doctor_id        UUID REFERENCES doctors(id)  ON DELETE SET NULL,
  service          TEXT,
  service_label    TEXT,
  appointment_date DATE        NOT NULL,
  appointment_time TEXT        NOT NULL,
  name             TEXT        NOT NULL,
  phone            TEXT        NOT NULL,
  email            TEXT,
  notes            TEXT,
  status           TEXT        NOT NULL DEFAULT 'pending',  -- pending|confirmed|completed|cancelled
  source           TEXT        NOT NULL DEFAULT 'online',   -- online|walk-in
  meet_link        TEXT,                                    -- Google Meet URL (if generated)
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);
-- for databases created before meet_link existed:
ALTER TABLE appointments ADD COLUMN IF NOT EXISTS meet_link TEXT;
CREATE INDEX IF NOT EXISTS idx_appt_date   ON appointments (appointment_date);
CREATE INDEX IF NOT EXISTS idx_appt_status ON appointments (status);
CREATE INDEX IF NOT EXISTS idx_appt_patient ON appointments (patient_id);

DROP TRIGGER IF EXISTS trg_appt_updated ON appointments;
CREATE TRIGGER trg_appt_updated BEFORE UPDATE ON appointments
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ---------- patient visit history -----------------------------------
CREATE TABLE IF NOT EXISTS patient_history (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id   UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  doctor_id    UUID REFERENCES doctors(id) ON DELETE SET NULL,
  visit_date   DATE NOT NULL DEFAULT CURRENT_DATE,
  diagnosis    TEXT,
  treatment    TEXT,          -- e.g. Panchkarma therapy given
  prescription TEXT,
  notes        TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_history_patient ON patient_history (patient_id);

-- ---------- seed doctors --------------------------------------------
INSERT INTO doctors (name, qualification, specialization, phone, active)
SELECT 'Dr. S.S. Soni', 'BAMS, MD, PGDHHM, Ph.D.', 'Panchkarma & Infertility', '9770130255', TRUE
WHERE NOT EXISTS (SELECT 1 FROM doctors WHERE name = 'Dr. S.S. Soni');

INSERT INTO doctors (name, qualification, specialization, phone, active)
SELECT 'Dr. Varsha Soni', 'MS (Ayurveda)', 'Panchkarma & Nadi Nidan', '9229693191', TRUE
WHERE NOT EXISTS (SELECT 1 FROM doctors WHERE name = 'Dr. Varsha Soni');
