// ============================================
// CAREER PAGE JAVASCRIPT - Data Analysis
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // FILTRO DE SEMESTRES
    // ============================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const semesterBlocks = document.querySelectorAll('.semester-block');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remover clase active de todos los botones
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Agregar clase active al botón clickeado
                this.classList.add('active');
                
                const semesterFilter = this.getAttribute('data-semester');
                
                // Mostrar/ocultar semestres según el filtro
                semesterBlocks.forEach(block => {
                    if (semesterFilter === 'all') {
                        block.style.display = 'block';
                        setTimeout(() => {
                            block.style.opacity = '1';
                            block.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        const blockSemester = block.getAttribute('data-semester');
                        if (blockSemester === semesterFilter) {
                            block.style.display = 'block';
                            setTimeout(() => {
                                block.style.opacity = '1';
                                block.style.transform = 'translateY(0)';
                            }, 10);
                        } else {
                            block.style.opacity = '0';
                            block.style.transform = 'translateY(20px)';
                            setTimeout(() => {
                                block.style.display = 'none';
                            }, 300);
                        }
                    }
                });

                // Scroll suave hacia la sección de malla
                const mallaSection = document.getElementById('malla');
                if (mallaSection) {
                    setTimeout(() => {
                        mallaSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 100);
                }
            });
        });
    }

    // ============================================
    // FAQ ACCORDION
    // ============================================
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Cerrar todos los FAQs
            faqItems.forEach(faq => {
                faq.classList.remove('active');
                const answer = faq.querySelector('.faq-answer');
                answer.style.maxHeight = '0';
            });
            
            // Abrir el FAQ clickeado si no estaba activo
            if (!isActive) {
                item.classList.add('active');
                const answer = item.querySelector('.faq-answer');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // ============================================
    // FORMULARIO DE INSCRIPCIÓN
    // ============================================
    const enrollmentForm = document.getElementById('enrollmentForm');
    
    if (enrollmentForm) {
        enrollmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                nombres: document.getElementById('nombres').value,
                apellidos: document.getElementById('apellidos').value,
                email: document.getElementById('email').value,
                telefono: document.getElementById('telefono').value,
                motivo: document.getElementById('motivo').value,
                carrera: 'Análisis de Datos',
                fecha: new Date().toISOString()
            };

            // Validación
            if (!document.getElementById('acepto-terminos').checked) {
                alert('Debes aceptar los términos y condiciones');
                return;
            }

            // Guardar inscripción en localStorage
            let inscripciones = JSON.parse(localStorage.getItem('inscripciones')) || [];
            inscripciones.push(formData);
            localStorage.setItem('inscripciones', JSON.stringify(inscripciones));

            // Crear registro de estudiante
            const estudianteId = 'EST' + Date.now();
            const estudiante = {
                id: estudianteId,
                ...formData,
                progreso: {
                    semestre: 1,
                    materiasCompletadas: 0,
                    totalMaterias: 42,
                    porcentaje: 0
                },
                fechaInicio: new Date().toISOString()
            };

            localStorage.setItem('estudiante_' + estudianteId, JSON.stringify(estudiante));
            localStorage.setItem('estudianteActual', estudianteId);

            // Mensaje de éxito con datos del estudiante
            alert(`¡Felicitaciones ${formData.nombres}! 🎉\n\nTe has inscrito exitosamente en la carrera de Análisis de Datos.\n\nTu ID de estudiante es: ${estudianteId}\n\n¡Bienvenido a Universidad Autodidacta!`);
            
            // Limpiar formulario
            enrollmentForm.reset();

            // Mostrar siguiente paso
            setTimeout(() => {
                if (confirm('¿Deseas comenzar tu primer semestre ahora?')) {
                    // Aquí se podría redirigir a una página de inicio de curso
                    console.log('Iniciando primer semestre para estudiante:', estudianteId);
                    showNotification('¡Excelente! Accediendo a tu primer semestre...', 'success');
                }
            }, 500);
            
            console.log('Inscripción guardada:', estudiante);
        });
    }

    // ============================================
    // DESCARGAR MALLA CURRICULAR
    // ============================================
    const downloadBtn = document.getElementById('downloadCurriculum');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            // Generar contenido de la malla para descarga
            const mallaContent = generarMallaTexto();
            
            // Crear blob y descargar
            const blob = new Blob([mallaContent], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Malla_Curricular_Analisis_Datos_Universidad_Autodidacta.txt';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            
            showNotification('¡Malla curricular descargada exitosamente!', 'success');
        });
    }

    // ============================================
    // TRACKING DE MATERIAS
    // ============================================
    const subjectCards = document.querySelectorAll('.subject-card');
    
    subjectCards.forEach(card => {
        card.addEventListener('click', function() {
            const subjectTitle = this.querySelector('h4').textContent;
            const semester = this.closest('.semester-block').getAttribute('data-semester');
            
            // Marcar como seleccionada visualmente
            this.style.borderColor = 'var(--primary-color)';
            this.style.background = 'rgba(37, 99, 235, 0.05)';
            
            // Mostrar información adicional
            mostrarInfoMateria(subjectTitle, semester);
            
            // Guardar interacción
            registrarInteraccion('materia_vista', {
                materia: subjectTitle,
                semestre: semester,
                fecha: new Date().toISOString()
            });
        });
    });

    // ============================================
    // ANIMACIÓN DE PROGRESO EN CARDS
    // ============================================
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.subject-card, .job-card, .tool-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.5s ease-out';
        observer.observe(el);
    });

    // ============================================
    // CONTADOR DE HORAS TOTALES
    // ============================================
    calcularHorasTotales();

    // ============================================
    // INICIALIZACIÓN
    // ============================================
    console.log('🎓 Página de Análisis de Datos inicializada');
    verificarEstudianteActual();
});

// ============================================
// FUNCIONES AUXILIARES
// ============================================

function generarMallaTexto() {
    let contenido = `
═══════════════════════════════════════════════════════════════
    UNIVERSIDAD AUTODIDACTA ONLINE
    MALLA CURRICULAR - ANÁLISIS DE DATOS
═══════════════════════════════════════════════════════════════

Título: Técnico Superior en Análisis de Datos
Duración: 6 semestres (3 años) + Práctica Profesional
Total Materias: 42 asignaturas
Modalidad: 100% Online

═══════════════════════════════════════════════════════════════
PRIMER SEMESTRE - FUNDAMENTOS
═══════════════════════════════════════════════════════════════

1. Matemáticas para Análisis de Datos (120 horas)
2. Introducción a la Programación con Python (120 horas)
3. Estadística Descriptiva (100 horas)
4. Fundamentos de Bases de Datos (100 horas)
5. Excel Avanzado para Análisis (80 horas)
6. Pensamiento Lógico y Analítico (80 horas)
7. Inglés Técnico I (60 horas)

═══════════════════════════════════════════════════════════════
SEGUNDO SEMESTRE - ANÁLISIS Y VISUALIZACIÓN
═══════════════════════════════════════════════════════════════

8. SQL y Bases de Datos Relacionales (120 horas)
9. Python para Data Analysis (120 horas)
10. Estadística Inferencial (100 horas)
11. Visualización de Datos con Python (100 horas)
12. Introducción a Power BI (90 horas)
13. Análisis Exploratorio de Datos (EDA) (80 horas)
14. Inglés Técnico II (60 horas)

═══════════════════════════════════════════════════════════════
TERCER SEMESTRE - BUSINESS INTELLIGENCE
═══════════════════════════════════════════════════════════════

15. Inteligencia de Negocios (BI) (120 horas)
16. ETL y Data Warehousing (120 horas)
17. Tableau y Visualización Avanzada (100 horas)
18. Análisis de Series Temporales (100 horas)
19. Google Analytics y Web Analytics (80 horas)
20. Gestión de Proyectos de Datos (80 horas)
21. Comunicación Efectiva de Datos (60 horas)

═══════════════════════════════════════════════════════════════
CUARTO SEMESTRE - MACHINE LEARNING FOUNDATIONS
═══════════════════════════════════════════════════════════════

22. Introducción a Machine Learning (130 horas)
23. Machine Learning con Python (Scikit-learn) (130 horas)
24. Análisis de Regresión Avanzado (100 horas)
25. Minería de Datos (100 horas)
26. Big Data Fundamentals (90 horas)
27. Bases de Datos NoSQL (80 horas)
28. Ética y Privacidad de Datos (60 horas)

═══════════════════════════════════════════════════════════════
QUINTO SEMESTRE - ESPECIALIZACIÓN AVANZADA
═══════════════════════════════════════════════════════════════

29. Deep Learning y Redes Neuronales (130 horas)
30. Procesamiento de Lenguaje Natural (NLP) (120 horas)
31. Análisis Predictivo Avanzado (110 horas)
32. Computer Vision para Analistas (100 horas)
33. A/B Testing y Experimentación (90 horas)
34. Cloud Computing para Data (AWS/Azure) (90 horas)
35. Optimización y Research Operations (80 horas)

═══════════════════════════════════════════════════════════════
SEXTO SEMESTRE - PROYECTO FINAL E INTEGRACIÓN
═══════════════════════════════════════════════════════════════

36. Proyecto Integrador de Data Analysis (150 horas)
37. MLOps y Deployment de Modelos (120 horas)
38. Casos de Estudio Empresariales (100 horas)
39. AutoML y Herramientas Avanzadas (90 horas)
40. Data Storytelling y Reportería Ejecutiva (80 horas)
41. Preparación para Certificaciones (80 horas)
42. Portfolio Profesional y Carrera (60 horas)

═══════════════════════════════════════════════════════════════
PRÁCTICA PROFESIONAL
═══════════════════════════════════════════════════════════════

- Práctica Laboral: Mínimo 400 horas
- Proyecto de Titulación: Desarrollo completo
- Certificación Final: Técnico Superior en Análisis de Datos

═══════════════════════════════════════════════════════════════

HERRAMIENTAS Y TECNOLOGÍAS:
- Python (NumPy, Pandas, Matplotlib, Seaborn, Scikit-learn)
- SQL y NoSQL (PostgreSQL, MongoDB)
- Power BI y Tableau
- TensorFlow y PyTorch
- Apache Spark
- AWS/Azure Cloud Services
- Git y GitHub
- Jupyter Notebooks

═══════════════════════════════════════════════════════════════
Universidad Autodidacta Online - 2025
www.universidadautodidacta.edu
═══════════════════════════════════════════════════════════════
`;
    
    return contenido;
}

function mostrarInfoMateria(titulo, semestre) {
    console.log(`Materia seleccionada: ${titulo} (Semestre ${semestre})`);
    
    // Aquí se podría mostrar un modal con información detallada
    // Por ahora, solo mostramos una notificación
    if (typeof showNotification === 'function') {
        showNotification(`Materia: ${titulo}`, 'info');
    }
}

function registrarInteraccion(tipo, datos) {
    let interacciones = JSON.parse(localStorage.getItem('interacciones')) || [];
    interacciones.push({
        tipo: tipo,
        datos: datos,
        timestamp: Date.now()
    });
    
    // Mantener solo las últimas 100 interacciones
    if (interacciones.length > 100) {
        interacciones = interacciones.slice(-100);
    }
    
    localStorage.setItem('interacciones', JSON.stringify(interacciones));
}

function calcularHorasTotales() {
    const horasElements = document.querySelectorAll('.subject-hours');
    let totalHoras = 0;
    
    horasElements.forEach(el => {
        const horas = parseInt(el.textContent);
        if (!isNaN(horas)) {
            totalHoras += horas;
        }
    });
    
    console.log(`Total de horas del programa: ${totalHoras} horas`);
    
    // Mostrar en algún lugar de la página
    const totalHorasEl = document.createElement('div');
    totalHorasEl.className = 'total-hours-display';
    totalHorasEl.innerHTML = `
        <strong>Total de horas de estudio:</strong> ${totalHoras} horas
        <br>
        <small>Aproximadamente ${Math.round(totalHoras / 40)} semanas de estudio intensivo</small>
    `;
    totalHorasEl.style.cssText = `
        position: fixed;
        bottom: 100px;
        left: 20px;
        background: var(--primary-color);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: var(--shadow-xl);
        font-size: 0.9rem;
        max-width: 250px;
        z-index: 998;
    `;
    
    // Agregar botón de cerrar
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
        position: absolute;
        top: 5px;
        right: 10px;
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    `;
    closeBtn.onclick = () => totalHorasEl.remove();
    totalHorasEl.appendChild(closeBtn);
    
    setTimeout(() => {
        document.body.appendChild(totalHorasEl);
    }, 2000);
}

function verificarEstudianteActual() {
    const estudianteId = localStorage.getItem('estudianteActual');
    
    if (estudianteId) {
        const estudiante = JSON.parse(localStorage.getItem('estudiante_' + estudianteId));
        if (estudiante) {
            console.log('Estudiante activo:', estudiante);
            
            // Mostrar mensaje de bienvenida
            const welcomeMsg = document.createElement('div');
            welcomeMsg.innerHTML = `
                ¡Bienvenido de nuevo, ${estudiante.nombres}! 
                <br>
                <small>Progreso: ${estudiante.progreso.porcentaje}% completado</small>
            `;
            welcomeMsg.style.cssText = `
                position: fixed;
                top: 80px;
                right: 20px;
                background: var(--success-color);
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 10px;
                box-shadow: var(--shadow-xl);
                z-index: 999;
                animation: slideInRight 0.5s ease-out;
            `;
            
            document.body.appendChild(welcomeMsg);
            
            setTimeout(() => {
                welcomeMsg.style.animation = 'slideOutRight 0.5s ease-out';
                setTimeout(() => welcomeMsg.remove(), 500);
            }, 5000);
        }
    }
}

// Exportar funciones globales
window.careerFunctions = {
    generarMallaTexto,
    mostrarInfoMateria,
    registrarInteraccion,
    calcularHorasTotales,
    verificarEstudianteActual
};
