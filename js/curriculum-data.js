// Configuración centralizada del currículum
// Todos los archivos deben usar este archivo para garantizar consistencia

const CURRICULUM_DATA = {
    subjects: {
        1: [
            { id: 'python-basics', name: 'Python Básico', hours: 40, icon: '🐍' },
            { id: 'data-structures', name: 'Estructuras de Datos', hours: 35, icon: '📊' },
            { id: 'algorithms', name: 'Algoritmos', hours: 30, icon: '⚙️' },
            { id: 'git-github', name: 'Git & GitHub', hours: 20, icon: '🔀' },
            { id: 'linux-basics', name: 'Linux Básico', hours: 25, icon: '🐧' },
            { id: 'sql-fundamentals', name: 'SQL Fundamentos', hours: 30, icon: '🗄️' },
            { id: 'statistics-1', name: 'Estadística I', hours: 35, icon: '📈' }
        ],
        2: [
            { id: 'python-advanced', name: 'Python Avanzado', hours: 40, icon: '🐍' },
            { id: 'pandas-numpy', name: 'Pandas & NumPy', hours: 45, icon: '🐼' },
            { id: 'data-viz', name: 'Visualización de Datos', hours: 35, icon: '📊' },
            { id: 'sql-advanced', name: 'SQL Avanzado', hours: 35, icon: '🗄️' },
            { id: 'statistics-2', name: 'Estadística II', hours: 40, icon: '📈' },
            { id: 'probability', name: 'Probabilidad', hours: 30, icon: '🎲' },
            { id: 'linear-algebra', name: 'Álgebra Lineal', hours: 35, icon: '🔢' }
        ],
        3: [
            { id: 'ml-basics', name: 'Machine Learning Básico', hours: 50, icon: '🤖' },
            { id: 'supervised-learning', name: 'Aprendizaje Supervisado', hours: 45, icon: '🎯' },
            { id: 'unsupervised-learning', name: 'Aprendizaje No Supervisado', hours: 40, icon: '🔍' },
            { id: 'sklearn', name: 'Scikit-Learn', hours: 35, icon: '⚡' },
            { id: 'model-evaluation', name: 'Evaluación de Modelos', hours: 30, icon: '📊' },
            { id: 'feature-engineering', name: 'Feature Engineering', hours: 35, icon: '🔧' },
            { id: 'time-series', name: 'Series Temporales', hours: 40, icon: '📉' }
        ],
        4: [
            { id: 'deep-learning', name: 'Deep Learning', hours: 50, icon: '🧠' },
            { id: 'neural-networks', name: 'Redes Neuronales', hours: 45, icon: '🕸️' },
            { id: 'tensorflow-keras', name: 'TensorFlow & Keras', hours: 40, icon: '🔥' },
            { id: 'computer-vision', name: 'Visión por Computadora', hours: 35, icon: '👁️' },
            { id: 'nlp', name: 'Procesamiento de Lenguaje Natural', hours: 40, icon: '💬' },
            { id: 'recommendation-systems', name: 'Sistemas de Recomendación', hours: 30, icon: '⭐' },
            { id: 'ab-testing', name: 'A/B Testing', hours: 25, icon: '🧪' }
        ],
        5: [
            { id: 'big-data', name: 'Big Data Fundamentals', hours: 45, icon: '💾' },
            { id: 'spark', name: 'Apache Spark', hours: 40, icon: '⚡' },
            { id: 'hadoop', name: 'Hadoop Ecosystem', hours: 35, icon: '🐘' },
            { id: 'aws-data', name: 'AWS para Data Science', hours: 40, icon: '☁️' },
            { id: 'docker-kubernetes', name: 'Docker & Kubernetes', hours: 35, icon: '🐳' },
            { id: 'mlops', name: 'MLOps', hours: 40, icon: '🔄' },
            { id: 'data-engineering', name: 'Ingeniería de Datos', hours: 45, icon: '🏗️' }
        ],
        6: [
            { id: 'business-intelligence', name: 'Business Intelligence', hours: 40, icon: '💼' },
            { id: 'tableau-powerbi', name: 'Tableau & Power BI', hours: 35, icon: '📊' },
            { id: 'data-storytelling', name: 'Data Storytelling', hours: 30, icon: '📖' },
            { id: 'ethics-ai', name: 'Ética en IA', hours: 25, icon: '⚖️' },
            { id: 'capstone-project', name: 'Proyecto Final', hours: 80, icon: '🎓' },
            { id: 'career-prep', name: 'Preparación Profesional', hours: 30, icon: '💼' },
            { id: 'portfolio-building', name: 'Construcción de Portfolio', hours: 40, icon: '📁' }
        ]
    },
    
    semesters: {
        1: { name: 'Fundamentos', icon: '📖', color: '#3b82f6' },
        2: { name: 'Análisis de Datos', icon: '📊', color: '#8b5cf6' },
        3: { name: 'Machine Learning', icon: '🤖', color: '#ec4899' },
        4: { name: 'Advanced Analytics', icon: '📈', color: '#f59e0b' },
        5: { name: 'Big Data & Cloud', icon: '🚀', color: '#10b981' },
        6: { name: 'Especialización', icon: '🎯', color: '#ef4444' }
    },

    // Función helper para obtener todas las materias como array plano
    getAllSubjects() {
        const subjects = [];
        for (let semester = 1; semester <= 6; semester++) {
            this.subjects[semester].forEach(subject => {
                subjects.push({
                    ...subject,
                    semester: semester
                });
            });
        }
        return subjects;
    },

    // Función helper para obtener una materia específica por ID
    getSubjectById(subjectId) {
        for (let semester = 1; semester <= 6; semester++) {
            const subject = this.subjects[semester].find(s => s.id === subjectId);
            if (subject) {
                return {
                    ...subject,
                    semester: semester
                };
            }
        }
        return null;
    },

    // Función helper para obtener nombre formateado de semestre
    getSemesterName(semester) {
        const sem = this.semesters[semester];
        return `${sem.icon} Semestre ${semester} - ${sem.name}`;
    }
};

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.CURRICULUM_DATA = CURRICULUM_DATA;
}
