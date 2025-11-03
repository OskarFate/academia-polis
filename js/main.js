// ============================================
// MAIN JAVASCRIPT - Universidad Autodidacta
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // NAVEGACIÓN MÓVIL
    // ============================================
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Cerrar menú al hacer click en un enlace
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }

    // ============================================
    // SMOOTH SCROLL PARA ENLACES INTERNOS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ============================================
    // FORMULARIO DE ADMISIÓN
    // ============================================
    const admissionForm = document.getElementById('admissionForm');
    
    if (admissionForm) {
        admissionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                nombre: document.getElementById('nombre').value,
                apellidos: document.getElementById('apellidos').value,
                email: document.getElementById('email').value,
                telefono: document.getElementById('telefono').value,
                carrera: document.getElementById('carrera').value,
                privacidad: document.getElementById('privacidad').checked
            };

            // Validación
            if (!formData.privacidad) {
                alert('Debes aceptar las Políticas de Privacidad');
                return;
            }

            // Guardar en localStorage
            let solicitudes = JSON.parse(localStorage.getItem('solicitudes')) || [];
            solicitudes.push({
                ...formData,
                fecha: new Date().toISOString()
            });
            localStorage.setItem('solicitudes', JSON.stringify(solicitudes));

            // Mensaje de éxito
            alert('¡Solicitud enviada con éxito! Te contactaremos pronto.');
            admissionForm.reset();
            
            console.log('Solicitud guardada:', formData);
        });
    }

    // ============================================
    // BOTÓN "TE LLAMAMOS"
    // ============================================
    const callbackBtn = document.getElementById('callbackBtn');
    
    if (callbackBtn) {
        callbackBtn.addEventListener('click', function() {
            const telefono = prompt('Por favor, ingresa tu número de teléfono y te llamaremos:');
            
            if (telefono && telefono.trim() !== '') {
                // Guardar solicitud de llamada
                let callbacks = JSON.parse(localStorage.getItem('callbacks')) || [];
                callbacks.push({
                    telefono: telefono.trim(),
                    fecha: new Date().toISOString()
                });
                localStorage.setItem('callbacks', JSON.stringify(callbacks));
                
                alert('¡Gracias! Te llamaremos pronto al ' + telefono);
                console.log('Solicitud de llamada guardada:', telefono);
            }
        });
    }

    // ============================================
    // ANIMACIONES AL SCROLL
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos con animación
    document.querySelectorAll('.feature-card, .career-card, .step, .stat-item, .job-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // ============================================
    // CONTADOR ANIMADO PARA ESTADÍSTICAS
    // ============================================
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + (target === 100 ? '%' : '+');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (target === 100 ? '%' : '+');
            }
        }, 16);
    }

    // Activar contadores cuando sean visibles
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const h3 = entry.target.querySelector('h3');
                const text = h3.textContent;
                const number = parseInt(text.replace(/[^0-9]/g, ''));
                
                if (!isNaN(number)) {
                    h3.textContent = '0';
                    animateCounter(h3, number);
                }
                
                entry.target.classList.add('counted');
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-item').forEach(stat => {
        statsObserver.observe(stat);
    });

    // ============================================
    // VALIDACIÓN DE FORMULARIOS EN TIEMPO REAL
    // ============================================
    const inputs = document.querySelectorAll('input[type="email"], input[type="tel"]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateInput(this);
        });
    });

    function validateInput(input) {
        const type = input.type;
        const value = input.value.trim();

        if (type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (value && !emailRegex.test(value)) {
                input.style.borderColor = '#ef4444';
                showError(input, 'Email inválido');
            } else {
                input.style.borderColor = '';
                removeError(input);
            }
        }

        if (type === 'tel') {
            const phoneRegex = /^[0-9+\-\s()]+$/;
            if (value && (!phoneRegex.test(value) || value.length < 8)) {
                input.style.borderColor = '#ef4444';
                showError(input, 'Teléfono inválido');
            } else {
                input.style.borderColor = '';
                removeError(input);
            }
        }
    }

    function showError(input, message) {
        removeError(input);
        const error = document.createElement('span');
        error.className = 'error-message';
        error.textContent = message;
        error.style.color = '#ef4444';
        error.style.fontSize = '0.875rem';
        error.style.marginTop = '0.25rem';
        error.style.display = 'block';
        input.parentElement.appendChild(error);
    }

    function removeError(input) {
        const error = input.parentElement.querySelector('.error-message');
        if (error) {
            error.remove();
        }
    }

    // ============================================
    // HEADER SCROLL EFFECT
    // ============================================
    let lastScroll = 0;
    const header = document.querySelector('.main-header');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
        } else {
            header.style.boxShadow = '';
        }

        lastScroll = currentScroll;
    });

    // ============================================
    // PREVISUALIZACIÓN DE IMÁGENES (FUTURO)
    // ============================================
    const imageInputs = document.querySelectorAll('input[type="file"]');
    
    imageInputs.forEach(input => {
        input.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    console.log('Imagen cargada:', file.name);
                    // Aquí se puede agregar lógica de preview
                };
                reader.readAsDataURL(file);
            }
        });
    });

    // ============================================
    // SISTEMA DE NOTIFICACIONES
    // ============================================
    window.showNotification = function(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.padding = '1rem 1.5rem';
        notification.style.borderRadius = '8px';
        notification.style.color = 'white';
        notification.style.fontWeight = '600';
        notification.style.zIndex = '9999';
        notification.style.animation = 'slideInRight 0.3s ease-out';
        
        if (type === 'success') {
            notification.style.background = '#10b981';
        } else if (type === 'error') {
            notification.style.background = '#ef4444';
        } else {
            notification.style.background = '#3b82f6';
        }
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    };

    // ============================================
    // SISTEMA DE PROGRESO (para futuro)
    // ============================================
    window.initProgressSystem = function() {
        const progressData = JSON.parse(localStorage.getItem('careerProgress')) || {};
        console.log('Sistema de progreso inicializado:', progressData);
        return progressData;
    };

    window.saveProgress = function(career, semester, subject, completed) {
        let progressData = JSON.parse(localStorage.getItem('careerProgress')) || {};
        
        if (!progressData[career]) {
            progressData[career] = {};
        }
        if (!progressData[career][semester]) {
            progressData[career][semester] = {};
        }
        
        progressData[career][semester][subject] = {
            completed: completed,
            date: new Date().toISOString()
        };
        
        localStorage.setItem('careerProgress', JSON.stringify(progressData));
        console.log('Progreso guardado:', progressData);
    };

    // ============================================
    // LOG DE INICIALIZACIÓN
    // ============================================
    console.log('🎓 Universidad Autodidacta - Sistema inicializado');
    console.log('Versión: 1.0.0');
    console.log('Fecha:', new Date().toLocaleDateString());
});

// ============================================
// FUNCIONES GLOBALES ÚTILES
// ============================================

// Función para obtener datos de formulario
function getFormData(formId) {
    const form = document.getElementById(formId);
    if (!form) return null;
    
    const formData = new FormData(form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    return data;
}

// Función para formatear fecha
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Función para calcular progreso
function calculateProgress(completed, total) {
    return Math.round((completed / total) * 100);
}
