// ============================================
// SUPABASE CONFIGURATION
// ============================================

// INSTRUCCIONES DE CONFIGURACIÓN:
// 1. Crea una cuenta en https://supabase.com
// 2. Crea un nuevo proyecto
// 3. Ve a Settings > API
// 4. Copia tu Project URL y anon/public key
// 5. Reemplaza los valores abajo con tus credenciales reales

const SUPABASE_CONFIG = {
    url: 'https://bajkdvhooousgtahuslp.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhamtkdmhvb291c2d0YWh1c2xwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxMzU2MzcsImV4cCI6MjA3NzcxMTYzN30.LtfTHTYysZRnG6NALQYRvD0ofurntS9aljOXuAVw2sM'
};

// Inicializar cliente de Supabase
const supabase = window.supabase.createClient(
    SUPABASE_CONFIG.url,
    SUPABASE_CONFIG.anonKey
);

// ============================================
// AUTHENTICATION MANAGER
// ============================================

class AuthManager {
    constructor() {
        this.currentUser = null;
        this.init();
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

            return { success: true, message: '¡Bienvenido de vuelta!' };
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
}

// Inicializar AuthManager globalmente
let authManager;

document.addEventListener('DOMContentLoaded', () => {
    authManager = new AuthManager();
});
