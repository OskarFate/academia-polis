const supabase = window.supabase.createClient(
    SUPABASE_CONFIG.url,
    SUPABASE_CONFIG.anonKey
);

class AuthManager {
    constructor() {
        this.currentUser = null;
        this.ready = false;
        this.initPromise = this.init();
    }

    async init() {
        // Verificar si hay una sesión activa
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
            this.currentUser = session.user;
            this.updateUI();
        }

        // Escuchar cambios en la autenticación
        supabase.auth.onAuthStateChange((event, session) => {
            if (session) {
                this.currentUser = session.user;
                this.updateUI();
            } else {
                this.currentUser = null;
                this.updateUI();
            }
        });

        this.ready = true;
        return this;
    }

    // Esperar a que AuthManager esté listo
    async waitForReady() {
        await this.initPromise;
        return this;
    }

    // Registro de nuevo usuario
    async signUp(email, password, fullName) {
        try {
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        full_name: fullName,
                        created_at: new Date().toISOString()
                    }
                }
            });

            if (error) throw error;

            // Crear perfil de estudiante
            if (data.user) {
                await this.createStudentProfile(data.user.id, fullName, email);
            }

            return { success: true, message: '¡Cuenta creada! Revisa tu email para confirmar.' };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    // Login
    async signIn(email, password) {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            });

            if (error) throw error;

            // Actualizar usuario actual
            this.currentUser = data.user;

            return { success: true, message: '¡Bienvenido de vuelta!', user: data.user };
        } catch (error) {
            return { success: false, message: 'Email o contraseña incorrectos' };
        }
    }

    // Logout
    async signOut() {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            
            window.location.href = '../index.html';
            return { success: true };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    // Reset password
    async resetPassword(email) {
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: window.location.origin + '/reset-password.html'
            });

            if (error) throw error;

            return { success: true, message: 'Email de recuperación enviado. Revisa tu bandeja.' };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    // Crear perfil de estudiante en la base de datos
    async createStudentProfile(userId, fullName, email) {
        try {
            const { error } = await supabase
                .from('students')
                .insert([
                    {
                        user_id: userId,
                        full_name: fullName,
                        email: email,
                        enrolled_career: null,
                        created_at: new Date().toISOString()
                    }
                ]);

            if (error) throw error;
        } catch (error) {
            console.error('Error creando perfil:', error);
        }
    }

    // Obtener perfil del estudiante
    async getStudentProfile() {
        if (!this.currentUser) return null;

        try {
            const { data, error } = await supabase
                .from('students')
                .select('*')
                .eq('user_id', this.currentUser.id)
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error obteniendo perfil:', error);
            return null;
        }
    }

    // Actualizar carrera inscrita
    async enrollCareer(careerName) {
        if (!this.currentUser) return { success: false, message: 'No autenticado' };

        try {
            const { error } = await supabase
                .from('students')
                .update({ enrolled_career: careerName })
                .eq('user_id', this.currentUser.id);

            if (error) throw error;

            return { success: true, message: 'Inscripción exitosa!' };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    // Verificar si el usuario está autenticado
    isAuthenticated() {
        return this.currentUser !== null;
    }

    // Actualizar UI según estado de autenticación
    updateUI() {
        const loginBtn = document.getElementById('login-btn');
        const logoutBtn = document.getElementById('logout-btn');
        const userInfo = document.getElementById('user-info');

        if (this.isAuthenticated()) {
            if (loginBtn) loginBtn.style.display = 'none';
            if (logoutBtn) logoutBtn.style.display = 'block';
            if (userInfo) {
                userInfo.style.display = 'block';
                userInfo.textContent = `👤 ${this.currentUser.email}`;
            }
        } else {
            if (loginBtn) loginBtn.style.display = 'block';
            if (logoutBtn) logoutBtn.style.display = 'none';
            if (userInfo) userInfo.style.display = 'none';
        }
    }

    // Mostrar notificación
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    async getStudentStats() {
        if (!this.currentUser) return null;

        try {
            const { data, error } = await supabase
                .from('student_stats')
                .select('*')
                .eq('user_id', this.currentUser.id)
                .single();

            if (error && error.code === 'PGRST116') {
                // No existe, crear uno nuevo
                return await this.createStudentStats();
            }

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error obteniendo estadísticas:', error);
            return null;
        }
    }

    // Crear estadísticas iniciales
    async createStudentStats() {
        try {
            const { data, error } = await supabase
                .from('student_stats')
                .insert([{
                    user_id: this.currentUser.id,
                    current_streak: 0,
                    longest_streak: 0,
                    total_lessons_completed: 0,
                    total_exercises_completed: 0,
                    total_time_minutes: 0,
                    level: 1,
                    experience_points: 0
                }])
                .select()
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error creando estadísticas:', error);
            return null;
        }
    }

    // Registrar actividad diaria
    async recordDailyActivity(lessonsCompleted = 0, timeSpentMinutes = 0, exercisesCompleted = 0) {
        if (!this.currentUser) return { success: false, message: 'No autenticado' };

        try {
            const today = new Date().toISOString().split('T')[0];

            // Intentar insertar o actualizar
            const { data, error } = await supabase
                .from('daily_activity')
                .upsert({
                    user_id: this.currentUser.id,
                    activity_date: today,
                    lessons_completed: lessonsCompleted,
                    time_spent_minutes: timeSpentMinutes,
                    exercises_completed: exercisesCompleted
                }, {
                    onConflict: 'user_id,activity_date',
                    ignoreDuplicates: false
                });

            if (error) throw error;

            return { success: true, data };
        } catch (error) {
            console.error('Error registrando actividad:', error);
            return { success: false, message: error.message };
        }
    }

    // Obtener evaluaciones del estudiante
    async getEvaluations(subjectId = null) {
        if (!this.currentUser) return null;

        try {
            let query = supabase
                .from('evaluations')
                .select('*')
                .eq('user_id', this.currentUser.id)
                .order('completed_at', { ascending: false });

            if (subjectId) {
                query = query.eq('subject_id', subjectId);
            }

            const { data, error } = await query;

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error obteniendo evaluaciones:', error);
            return [];
        }
    }

    // Obtener progreso de materias
    async getSubjectProgress() {
        if (!this.currentUser) return [];

        try {
            const { data, error } = await supabase
                .from('subject_progress')
                .select('*')
                .eq('user_id', this.currentUser.id);

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error obteniendo progreso:', error);
            return [];
        }
    }

    // Obtener actividad de los últimos 30 días
    async getRecentActivity(days = 30) {
        if (!this.currentUser) return [];

        try {
            const startDate = new Date();
            startDate.setDate(startDate.getDate() - days);

            const { data, error } = await supabase
                .from('daily_activity')
                .select('*')
                .eq('user_id', this.currentUser.id)
                .gte('activity_date', startDate.toISOString().split('T')[0])
                .order('activity_date', { ascending: true });

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error obteniendo actividad reciente:', error);
            return [];
        }
    }

    // Registrar lección completada (actualiza racha automáticamente)
    async completeLesson(subjectId, subjectName, timeSpent = 30) {
        if (!this.currentUser) return { success: false, message: 'No autenticado' };

        try {
            const today = new Date().toISOString().split('T')[0];

            // Actualizar actividad diaria (trigger actualiza racha automáticamente)
            const activityResult = await this.recordDailyActivity(1, timeSpent, 0);
            
            if (!activityResult.success) {
                throw new Error('Error registrando actividad');
            }

            // Actualizar o crear progreso de la materia
            const { data: existingProgress } = await supabase
                .from('subject_progress')
                .select('*')
                .eq('user_id', this.currentUser.id)
                .eq('subject_id', subjectId)
                .single();

            if (existingProgress) {
                // Actualizar progreso existente
                const newPercentage = Math.min(100, existingProgress.progress_percentage + 5);
                await supabase
                    .from('subject_progress')
                    .update({ 
                        progress_percentage: newPercentage,
                        completed: newPercentage === 100,
                        completed_at: newPercentage === 100 ? new Date().toISOString() : null
                    })
                    .eq('user_id', this.currentUser.id)
                    .eq('subject_id', subjectId);
            } else {
                // Crear nuevo progreso
                await supabase
                    .from('subject_progress')
                    .insert({
                        user_id: this.currentUser.id,
                        subject_id: subjectId,
                        subject_name: subjectName,
                        progress_percentage: 5
                    });
            }

            return { success: true, message: '¡Lección completada! 🎉' };
        } catch (error) {
            console.error('Error completando lección:', error);
            return { success: false, message: error.message };
        }
    }

    // Registrar ejercicio completado
    async completeExercise(subjectId, subjectName, timeSpent = 15) {
        if (!this.currentUser) return { success: false, message: 'No autenticado' };

        try {
            const today = new Date().toISOString().split('T')[0];

            // Actualizar actividad diaria
            const activityResult = await this.recordDailyActivity(0, timeSpent, 1);
            
            if (!activityResult.success) {
                throw new Error('Error registrando actividad');
            }

            return { success: true, message: '¡Ejercicio completado! ✅' };
        } catch (error) {
            console.error('Error completando ejercicio:', error);
            return { success: false, message: error.message };
        }
    }

    // Registrar evaluación
    async submitEvaluation(subjectId, subjectName, evaluationType, title, score, maxScore = 100) {
        if (!this.currentUser) return { success: false, message: 'No autenticado' };

        try {
            const passed = (score / maxScore) >= 0.6; // 60% para aprobar

            const { error } = await supabase
                .from('evaluations')
                .insert({
                    user_id: this.currentUser.id,
                    subject_id: subjectId,
                    subject_name: subjectName,
                    evaluation_type: evaluationType,
                    title: title,
                    score: score,
                    max_score: maxScore,
                    passed: passed
                });

            if (error) throw error;

            // Si aprobó, actualizar progreso de la materia
            if (passed) {
                const { data: progress } = await supabase
                    .from('subject_progress')
                    .select('*')
                    .eq('user_id', this.currentUser.id)
                    .eq('subject_id', subjectId)
                    .single();

                if (progress) {
                    const newPercentage = Math.min(100, progress.progress_percentage + 10);
                    await supabase
                        .from('subject_progress')
                        .update({ 
                            progress_percentage: newPercentage,
                            completed: newPercentage === 100,
                            completed_at: newPercentage === 100 ? new Date().toISOString() : null
                        })
                        .eq('user_id', this.currentUser.id)
                        .eq('subject_id', subjectId);
                }
            }

            return { 
                success: true, 
                passed: passed,
                message: passed ? '🎉 ¡Aprobado!' : '📚 Sigue estudiando, puedes mejorar' 
            };
        } catch (error) {
            console.error('Error registrando evaluación:', error);
            return { success: false, message: error.message };
        }
    }

    // Verificar y actualizar racha (llamar al iniciar sesión)
    async checkAndUpdateStreak() {
        if (!this.currentUser) return;

        try {
            const today = new Date().toISOString().split('T')[0];
            const stats = await this.getStudentStats();

            if (!stats) return;

            const lastActivityDate = stats.last_activity_date;
            
            if (!lastActivityDate) {
                // Primera vez, no hacer nada
                return;
            }

            const lastDate = new Date(lastActivityDate);
            const todayDate = new Date(today);
            const diffTime = todayDate - lastDate;
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

            // Si han pasado más de 1 día, la racha se rompe
            if (diffDays > 1) {
                await supabase
                    .from('student_stats')
                    .update({ 
                        current_streak: 0
                    })
                    .eq('user_id', this.currentUser.id);
            }
        } catch (error) {
            console.error('Error verificando racha:', error);
        }
    }

    // Calcular nivel basado en experiencia
    calculateLevel(experiencePoints) {
        // Nivel = raíz cuadrada de (XP / 100)
        // Nivel 1: 0-100 XP
        // Nivel 2: 100-400 XP
        // Nivel 3: 400-900 XP, etc.
        return Math.floor(Math.sqrt(experiencePoints / 100)) + 1;
    }

    // Añadir experiencia
    async addExperience(amount) {
        if (!this.currentUser) return { success: false };

        try {
            const stats = await this.getStudentStats();
            if (!stats) return { success: false };

            const newXP = stats.experience_points + amount;
            const newLevel = this.calculateLevel(newXP);
            const leveledUp = newLevel > stats.level;

            await supabase
                .from('student_stats')
                .update({ 
                    experience_points: newXP,
                    level: newLevel
                })
                .eq('user_id', this.currentUser.id);

            return { 
                success: true, 
                leveledUp: leveledUp,
                newLevel: newLevel,
                newXP: newXP
            };
        } catch (error) {
            console.error('Error añadiendo experiencia:', error);
            return { success: false };
        }
    }
}

// Inicializar AuthManager globalmente
let authManager;

document.addEventListener('DOMContentLoaded', () => {
    authManager = new AuthManager();
});
