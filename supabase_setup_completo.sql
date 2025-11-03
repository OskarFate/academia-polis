-- ============================================
-- SUPABASE DATABASE SETUP - ACADEMIA DE LA POLIS
-- ============================================
-- Este script crea TODAS las tablas necesarias
-- Ejecuta este script en Supabase SQL Editor

-- ============================================
-- 1. TABLA DE ESTUDIANTES
-- ============================================
CREATE TABLE IF NOT EXISTS students (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    enrolled_career TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 2. TABLA DE PROGRESO DE MATERIAS
-- ============================================
CREATE TABLE IF NOT EXISTS subject_progress (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    subject_id TEXT NOT NULL,
    subject_name TEXT NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP WITH TIME ZONE,
    progress_percentage INTEGER DEFAULT 0,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, subject_id)
);

-- ============================================
-- 3. TABLA DE EVALUACIONES
-- ============================================
CREATE TABLE IF NOT EXISTS evaluations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    subject_id TEXT NOT NULL,
    subject_name TEXT NOT NULL,
    evaluation_type TEXT NOT NULL,
    title TEXT NOT NULL,
    score DECIMAL(5,2),
    max_score DECIMAL(5,2) DEFAULT 100,
    passed BOOLEAN DEFAULT FALSE,
    attempts INTEGER DEFAULT 1,
    feedback TEXT,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 4. TABLA DE ACTIVIDAD DIARIA (Para racha)
-- ============================================
CREATE TABLE IF NOT EXISTS daily_activity (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    activity_date DATE NOT NULL DEFAULT CURRENT_DATE,
    lessons_completed INTEGER DEFAULT 0,
    time_spent_minutes INTEGER DEFAULT 0,
    exercises_completed INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, activity_date)
);

-- ============================================
-- 5. TABLA DE ESTADÍSTICAS DEL ESTUDIANTE
-- ============================================
CREATE TABLE IF NOT EXISTS student_stats (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    current_streak INTEGER DEFAULT 0,
    longest_streak INTEGER DEFAULT 0,
    total_lessons_completed INTEGER DEFAULT 0,
    total_exercises_completed INTEGER DEFAULT 0,
    total_time_minutes INTEGER DEFAULT 0,
    last_activity_date DATE,
    level INTEGER DEFAULT 1,
    experience_points INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- HABILITAR ROW LEVEL SECURITY
-- ============================================
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE subject_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE evaluations ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_stats ENABLE ROW LEVEL SECURITY;

-- ============================================
-- POLÍTICAS DE SEGURIDAD - STUDENTS
-- ============================================
DROP POLICY IF EXISTS "Users can view their own student profile" ON students;
DROP POLICY IF EXISTS "Users can insert their own student profile" ON students;
DROP POLICY IF EXISTS "Users can update their own student profile" ON students;

CREATE POLICY "Users can view their own student profile"
    ON students FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own student profile"
    ON students FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own student profile"
    ON students FOR UPDATE
    USING (auth.uid() = user_id);

-- ============================================
-- POLÍTICAS DE SEGURIDAD - SUBJECT_PROGRESS
-- ============================================
DROP POLICY IF EXISTS "Users can view their own progress" ON subject_progress;
DROP POLICY IF EXISTS "Users can insert their own progress" ON subject_progress;
DROP POLICY IF EXISTS "Users can update their own progress" ON subject_progress;

CREATE POLICY "Users can view their own progress"
    ON subject_progress FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress"
    ON subject_progress FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress"
    ON subject_progress FOR UPDATE
    USING (auth.uid() = user_id);

-- ============================================
-- POLÍTICAS DE SEGURIDAD - EVALUATIONS
-- ============================================
DROP POLICY IF EXISTS "Users can view their own evaluations" ON evaluations;
DROP POLICY IF EXISTS "Users can insert their own evaluations" ON evaluations;
DROP POLICY IF EXISTS "Users can update their own evaluations" ON evaluations;

CREATE POLICY "Users can view their own evaluations"
    ON evaluations FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own evaluations"
    ON evaluations FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own evaluations"
    ON evaluations FOR UPDATE
    USING (auth.uid() = user_id);

-- ============================================
-- POLÍTICAS DE SEGURIDAD - DAILY_ACTIVITY
-- ============================================
DROP POLICY IF EXISTS "Users can view their own daily activity" ON daily_activity;
DROP POLICY IF EXISTS "Users can insert their own daily activity" ON daily_activity;
DROP POLICY IF EXISTS "Users can update their own daily activity" ON daily_activity;

CREATE POLICY "Users can view their own daily activity"
    ON daily_activity FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own daily activity"
    ON daily_activity FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own daily activity"
    ON daily_activity FOR UPDATE
    USING (auth.uid() = user_id);

-- ============================================
-- POLÍTICAS DE SEGURIDAD - STUDENT_STATS
-- ============================================
DROP POLICY IF EXISTS "Users can view their own stats" ON student_stats;
DROP POLICY IF EXISTS "Users can insert their own stats" ON student_stats;
DROP POLICY IF EXISTS "Users can update their own stats" ON student_stats;

CREATE POLICY "Users can view their own stats"
    ON student_stats FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own stats"
    ON student_stats FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own stats"
    ON student_stats FOR UPDATE
    USING (auth.uid() = user_id);

-- ============================================
-- ÍNDICES PARA MEJOR RENDIMIENTO
-- ============================================
CREATE INDEX IF NOT EXISTS idx_students_user_id ON students(user_id);
CREATE INDEX IF NOT EXISTS idx_subject_progress_user_id ON subject_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_subject_progress_subject_id ON subject_progress(subject_id);
CREATE INDEX IF NOT EXISTS idx_evaluations_user_id ON evaluations(user_id);
CREATE INDEX IF NOT EXISTS idx_evaluations_subject_id ON evaluations(subject_id);
CREATE INDEX IF NOT EXISTS idx_daily_activity_user_id ON daily_activity(user_id);
CREATE INDEX IF NOT EXISTS idx_daily_activity_date ON daily_activity(activity_date);
CREATE INDEX IF NOT EXISTS idx_student_stats_user_id ON student_stats(user_id);

-- ============================================
-- TRIGGERS PARA ACTUALIZAR updated_at
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_students_updated_at ON students;
DROP TRIGGER IF EXISTS update_subject_progress_updated_at ON subject_progress;
DROP TRIGGER IF EXISTS update_student_stats_updated_at ON student_stats;

CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON students
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subject_progress_updated_at BEFORE UPDATE ON subject_progress
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_student_stats_updated_at BEFORE UPDATE ON student_stats
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- FUNCIÓN PARA CALCULAR RACHA AUTOMÁTICAMENTE
-- ============================================
CREATE OR REPLACE FUNCTION update_streak()
RETURNS TRIGGER AS $$
DECLARE
    last_date DATE;
    current_streak_count INTEGER;
BEGIN
    -- Obtener estadísticas actuales
    SELECT last_activity_date, current_streak INTO last_date, current_streak_count
    FROM student_stats
    WHERE user_id = NEW.user_id;
    
    -- Si no existe registro de stats, crearlo
    IF NOT FOUND THEN
        INSERT INTO student_stats (user_id, current_streak, longest_streak, last_activity_date)
        VALUES (NEW.user_id, 1, 1, NEW.activity_date);
        RETURN NEW;
    END IF;
    
    -- Si es el día siguiente, incrementar racha
    IF NEW.activity_date = last_date + INTERVAL '1 day' THEN
        current_streak_count := current_streak_count + 1;
    -- Si es el mismo día, no hacer nada
    ELSIF NEW.activity_date = last_date THEN
        RETURN NEW;
    -- Si hay un salto de días, reiniciar racha
    ELSE
        current_streak_count := 1;
    END IF;
    
    -- Actualizar estadísticas
    UPDATE student_stats
    SET 
        current_streak = current_streak_count,
        longest_streak = GREATEST(longest_streak, current_streak_count),
        last_activity_date = NEW.activity_date,
        total_lessons_completed = total_lessons_completed + NEW.lessons_completed,
        total_exercises_completed = total_exercises_completed + NEW.exercises_completed,
        total_time_minutes = total_time_minutes + NEW.time_spent_minutes
    WHERE user_id = NEW.user_id;
    
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS calculate_streak_on_activity ON daily_activity;

CREATE TRIGGER calculate_streak_on_activity
    AFTER INSERT OR UPDATE ON daily_activity
    FOR EACH ROW EXECUTE FUNCTION update_streak();
