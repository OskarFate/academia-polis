# 🏛️ Academia de la Polis

> *"Saber para todos, poder para el pueblo"*

Una plataforma educativa 100% gratuita que ofrece carreras técnicas de nivel profesional sin costo alguno. Nacida del ideal de democratizar el acceso a la educación de calidad, Academia de la Polis se sostiene gracias a las donaciones voluntarias de su comunidad.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://oskarfate.github.io/academia-polis/)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![Contributions](https://img.shields.io/badge/contributions-welcome-orange)](CONTRIBUTING.md)

---

## 🌟 ¿Qué es Academia de la Polis?

Es una universidad autodidacta online que nació de la necesidad de ofrecer educación técnica de calidad sin barreras económicas. Aquí no hay matrículas, no hay mensualidades, no hay costos ocultos. Solo conocimiento libre y accesible para quien quiera aprender.

El modelo es simple: todo el contenido es gratis. Si te sirve y puedes, donas voluntariamente para mantener el proyecto vivo. Así de sencillo.

---

## ✨ Características

### 📚 Contenido de Nivel Profesional
- **42 materias por carrera** distribuidas en 6 semestres
- Curriculum diseñado para competir con las mejores universidades
- Enfoque 100% práctico con más de 200 proyectos reales
- Contenido actualizado constantemente

### 🎯 Sistema de Progreso Personalizado
- **Sistema de racha** para mantener la motivación (estilo Duolingo)
- Tracking de tu avance en tiempo real
- Estadísticas detalladas de tu aprendizaje
- Panel de control personalizado para cada estudiante

### 🔐 Portal de Estudiante Completo
- Autenticación segura con Supabase
- Dashboard interactivo con tu progreso
- Historial de evaluaciones y calificaciones
- Gestión de materias y recursos

### 💝 Modelo Sostenible
- 100% gratuito para estudiantes
- Sostenido por donaciones voluntarias
- Transparencia total en el uso de fondos
- Sin publicidad ni spam

---

## 🚀 Carreras Disponibles

### 🐍 Data Analysis & Python Mastery
La primera carrera disponible, enfocada en convertirte en un profesional de análisis de datos desde cero.

**Lo que aprenderás:**
- Python desde fundamentos hasta nivel avanzado
- Análisis de datos con Pandas, NumPy, Matplotlib
- Machine Learning con Scikit-learn
- Visualización de datos
- SQL y bases de datos
- Proyectos reales del mundo laboral

**Duración:** 3 años (puedes ir más rápido si lo deseas)  
**Costo:** $0 USD  
**Requisitos:** Ganas de aprender

---

## 🛠️ Tecnologías Utilizadas

### Frontend
- HTML5, CSS3 (vanilla)
- JavaScript ES6+ (sin frameworks, por ahora)
- Diseño responsive mobile-first
- Animaciones y transiciones suaves

### Backend & Database
- **Supabase** para autenticación y base de datos
- PostgreSQL con Row Level Security
- Triggers automáticos para calcular rachas
- API REST para integración

### Hosting
- GitHub Pages (sí, es gratis)
- Deploy automático desde main branch

---

## 📁 Estructura del Proyecto

```
academia-polis/
├── index.html              # Landing page principal
├── login.html              # Login y registro
├── carreras/               # Páginas de carreras
│   ├── data-analysis-curriculum.html
│   └── data-analysis-salaries.html
├── portal/                 # Portal del estudiante
│   └── estudiante.html
├── css/
│   └── styles.css         # Estilos globales (2400+ líneas)
├── js/
│   ├── auth.js            # Gestión de autenticación
│   ├── main.js            # JavaScript principal
│   └── career.js          # Lógica de carreras
└── docs/                  # Documentación adicional
```

---

## 🔧 Configuración Local

### Prerrequisitos
- Un navegador web moderno (Chrome, Firefox, Edge)
- Cuenta en [Supabase](https://supabase.com) (gratis)

### Instalación

1. **Clona el repositorio**
```bash
git clone https://github.com/OskarFate/academia-polis.git
cd academia-polis
```

2. **Configura Supabase**

Ve a Supabase y crea un nuevo proyecto. Luego ejecuta el script SQL:

```bash
# Copia el contenido de supabase_setup_completo.sql
# Pégalo en Supabase SQL Editor y ejecuta
```

3. **Configura las credenciales**

Edita `js/auth.js` y agrega tus credenciales:

```javascript
const SUPABASE_CONFIG = {
    url: 'TU_SUPABASE_URL',
    anonKey: 'TU_SUPABASE_ANON_KEY'
};
```

4. **Abre en el navegador**

Puedes abrir directamente `index.html` o usar un servidor local:

```bash
# Opción 1: Abrir directamente
# file:///ruta/al/proyecto/index.html

# Opción 2: Servidor con Python
python -m http.server 5500

# Opción 3: Live Server de VS Code
# Click derecho en index.html → Open with Live Server
```

---

## 📊 Base de Datos

El proyecto utiliza 5 tablas principales en Supabase:

### `students`
Perfil básico del estudiante
```sql
- user_id (UUID, FK a auth.users)
- full_name (TEXT)
- email (TEXT)
- enrolled_career (TEXT)
- avatar_url (TEXT)
```

### `student_stats`
Estadísticas y sistema de racha
```sql
- user_id (UUID, FK)
- current_streak (INTEGER)
- longest_streak (INTEGER)
- total_lessons_completed (INTEGER)
- level (INTEGER)
- experience_points (INTEGER)
```

### `subject_progress`
Progreso en cada materia
```sql
- user_id (UUID, FK)
- subject_id (TEXT)
- progress_percentage (INTEGER)
- completed (BOOLEAN)
```

### `evaluations`
Registro de evaluaciones
```sql
- user_id (UUID, FK)
- subject_id (TEXT)
- evaluation_type (TEXT)
- score (DECIMAL)
- passed (BOOLEAN)
```

### `daily_activity`
Actividad diaria para calcular rachas
```sql
- user_id (UUID, FK)
- activity_date (DATE)
- lessons_completed (INTEGER)
- time_spent_minutes (INTEGER)
```

**Nota:** Todas las tablas tienen Row Level Security (RLS) habilitado para proteger los datos de cada usuario.

---

## 🎨 Diseño y UX

El diseño sigue estos principios:

- **Colores**: Paleta de rojos pastel (#e57373, #ef5350) que representan pasión y energía
- **Tipografía**: Poppins para una lectura cómoda y moderna
- **Espaciado**: Generoso uso de whitespace para no abrumar
- **Iconos**: Emojis nativos para compatibilidad universal
- **Mobile First**: Diseño responsive desde el inicio

---

## 🤝 Cómo Contribuir

Este proyecto está abierto a contribuciones. Aquí hay algunas formas de ayudar:

### 💻 Contribuciones de Código
1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### 📚 Contribuciones de Contenido
- Agregar nuevas materias
- Mejorar el contenido existente
- Traducir a otros idiomas
- Crear recursos adicionales

### 🐛 Reportar Bugs
Usa los [GitHub Issues](https://github.com/OskarFate/academia-polis/issues) para reportar bugs. Incluye:
- Descripción del problema
- Pasos para reproducirlo
- Comportamiento esperado vs actual
- Screenshots si aplica

---

## 🗺️ Roadmap

### ✅ Completado
- [x] Landing page y diseño base
- [x] Sistema de autenticación con Supabase
- [x] Portal de estudiante
- [x] Sistema de racha (streak)
- [x] Primera carrera completa (Data Analysis)
- [x] Deploy en GitHub Pages

### 🚧 En Progreso
- [ ] Sistema de evaluaciones interactivas
- [ ] Gráficos de progreso con Chart.js
- [ ] Sistema de logros y badges

### 📅 Próximamente
- [ ] Segunda carrera: Desarrollo Web Full Stack
- [ ] Tercera carrera: Inteligencia Artificial
- [ ] Foros de discusión por materia
- [ ] Sistema de mentorías
- [ ] App móvil nativa (React Native)
- [ ] Certificados descargables

---

## 💝 Donaciones

Academia de la Polis es y siempre será gratis. Pero mantener el proyecto requiere tiempo y recursos. Si te está ayudando y puedes permitírtelo, considera hacer una donación voluntaria.

**Cada donación se usa para:**
- Mantener los servidores
- Crear más contenido de calidad
- Pagar por recursos educativos
- Mejorar la plataforma

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 📧 Contacto

¿Preguntas? ¿Sugerencias? ¿Solo quieres decir hola?

- **GitHub Issues**: [Crear issue](https://github.com/OskarFate/academia-polis/issues)
- **Sitio Web**: [https://oskarfate.github.io/academia-polis/](https://oskarfate.github.io/academia-polis/)

---

## 🙏 Agradecimientos

Gracias a todos los que han contribuido con su tiempo, código, ideas y donaciones. Este proyecto existe gracias a ustedes.

Especial agradecimiento a:
- La comunidad de desarrolladores que comparte conocimiento libre
- Supabase por su tier gratuito increíble
- GitHub por alojar este proyecto sin costo
- Todos los estudiantes que confían en esta plataforma

---

## 📚 Recursos Adicionales

- [Guía de configuración de Supabase](SETUP_SUPABASE.md)
- [Guía de deployment](GITHUB_PAGES.md)
- [Resumen de mejoras](RESUMEN_MEJORAS.md)
- [Instrucciones SQL](EJECUTAR_SQL.md)

---

<div align="center">

**⭐ Si este proyecto te ayuda, considera darle una estrella ⭐**

*Hecho con ❤️ para democratizar la educación*

[🏛️ Visita Academia de la Polis](https://oskarfate.github.io/academia-polis/)

</div>
