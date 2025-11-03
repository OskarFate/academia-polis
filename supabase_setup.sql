-- ============================================
-- CONFIGURACIÓN DE BASE DE DATOS - ACADEMIA DE LA POLIS
-- ============================================
-- Ejecuta este código en Supabase → SQL Editor → New Query

-- 1. Crear tabla de estudiantes
CREATE TABLE IF NOT EXISTS students (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    enrolled_career TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id)
);

-- 2. Habilitar Row Level Security (RLS)
ALTER TABLE students ENABLE ROW LEVEL SECURITY;

-- 3. Políticas de seguridad (usuarios solo ven su propio perfil)
DROP POLICY IF EXISTS "Users can view own profile" ON students;
CREATE POLICY "Users can view own profile"
    ON students FOR SELECT
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own profile" ON students;
CREATE POLICY "Users can insert own profile"
    ON students FOR INSERT
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own profile" ON students;
CREATE POLICY "Users can update own profile"
    ON students FOR UPDATE
    USING (auth.uid() = user_id);

-- 4. Índices para mejorar rendimiento
CREATE INDEX IF NOT EXISTS idx_students_user_id ON students(user_id);
CREATE INDEX IF NOT EXISTS idx_students_email ON students(email);

-- 5. Función para actualizar timestamp automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 6. Trigger para actualizar updated_at
DROP TRIGGER IF EXISTS update_students_updated_at ON students;
CREATE TRIGGER update_students_updated_at 
    BEFORE UPDATE ON students
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 7. Crear tabla de progreso (opcional, para futuro)
CREATE TABLE IF NOT EXISTS subject_progress (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    subject_id TEXT NOT NULL,
    completed BOOLEAN DEFAULT false,
    completed_at TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, subject_id)
);

-- 8. RLS para tabla de progreso
ALTER TABLE subject_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can manage own progress" ON subject_progress;
CREATE POLICY "Users can manage own progress"
    ON subject_progress
    USING (auth.uid() = user_id);

-- 9. Índices para progreso
CREATE INDEX IF NOT EXISTS idx_subject_progress_user ON subject_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_subject_progress_completed ON subject_progress(completed);

-- ✅ ¡LISTO! Si ves "Success. No rows returned" está todo bien.
