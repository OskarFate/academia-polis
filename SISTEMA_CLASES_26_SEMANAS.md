# 📅 SISTEMA DE CLASES SEMANALES - ACADEMIA DE LA POLIS

## 🎯 Estructura del Semestre (26 Semanas)

### Distribución Total
- **Duración total:** 6 meses (26 semanas)
- **Semanas de clases efectivas:** 20-22 semanas
- **Semanas de evaluación/finalización:** 2-3 semanas
- **Semanas de descanso/ajuste:** 1-2 semanas

---

## 📚 Desglose Semanal

### **Semanas 1-20: Clases Regulares**
- **Tipo:** 📖 Clases normales
- **Contenido:** Todas las materias del semestre (7 materias)
- **Formato:** 1 clase por semana de cada materia
- **Total:** 140 clases (20 semanas × 7 materias)

**Ejemplo Semana 1:**
- Clase 1: Python Básico
- Clase 2: Estructuras de Datos
- Clase 3: Algoritmos
- Clase 4: Git & GitHub
- Clase 5: Linux Básico
- Clase 6: SQL Fundamentos
- Clase 7: Estadística I

---

### **Semanas 21-22: Clases de Repaso/Finalización**
- **Tipo:** 📝 Repaso
- **Contenido:** Todas las materias (repaso y cierre de temas)
- **Objetivo:** Consolidar conocimientos, resolver dudas finales
- **Total:** 14 clases (2 semanas × 7 materias)
- **Etiqueta visual:** Badge naranja "📝 Repaso"

**Características:**
- Revisión de conceptos clave
- Ejercicios de integración
- Preparación para evaluaciones finales
- Sesiones de consulta

---

### **Semanas 23-24: Evaluaciones Finales**
- **Tipo:** 📋 Exámenes
- **Contenido:** Evaluación final de cada materia
- **Duración:** 3 horas por examen
- **Total:** 14 evaluaciones (2 semanas × 7 materias)
- **Etiqueta visual:** Badge rojo "📋 Examen"

**Formato de evaluaciones:**
- Examen teórico-práctico
- Proyecto final de la materia
- Presentación de portfolio
- Resolución de casos reales

**Ejemplo Semana 23:**
- Evaluación Final: Python Básico
- Evaluación Final: Estructuras de Datos
- Evaluación Final: Algoritmos
- ...

---

### **Semana 25: Descanso**
- **Tipo:** 🏖️ Semana de Descanso
- **Contenido:** Sin clases programadas
- **Objetivo:** Recarga de energías
- **Actividades opcionales:**
  - Revisión personal de notas
  - Proyectos personales
  - Networking con compañeros
  - Preparación mental para siguiente semestre

**Display visual:**
- Card verde con borde verde
- Sin número de clase
- Mensaje motivacional

---

### **Semana 26: Cierre del Semestre**
- **Tipo:** 🎉 Semana de Cierre
- **Contenido:** Actividades de cierre
- **Actividades:**
  - Entrega de calificaciones finales
  - Feedback personalizado
  - Celebración de logros
  - Orientación para siguiente semestre
  - Actualización de portfolio
  - Ceremonia virtual de cierre

**Display visual:**
- Card verde con borde verde
- Mensaje de preparación para siguiente nivel

---

## 🔢 Numeración de Clases

### Sistema de Numeración Automática

**Semanas 1-22 (Clases regulares + repaso):**
```
Clase N = (Semana - 1) × 7 + Posición_Materia

Ejemplos:
- Semana 1, Python Básico (pos. 1): Clase 1
- Semana 1, Estadística I (pos. 7): Clase 7
- Semana 2, Python Básico (pos. 1): Clase 8
- Semana 22, Estadística I (pos. 7): Clase 154
```

**Semanas 23-24 (Evaluaciones):**
```
Clase N = 154 + (Semana - 23) × 7 + Posición_Materia

Ejemplos:
- Semana 23, Python Básico (pos. 1): Clase 155
- Semana 24, Estadística I (pos. 7): Clase 168
```

**Total de clases numeradas:** 168 clases por semestre

---

## 📊 Estados de las Clases

| Estado | Icono | Descripción | Color |
|--------|-------|-------------|-------|
| 🔓 Disponible | Verde | Fecha pasó, puede tomar la clase | Azul claro |
| 📚 En progreso | Naranja | Tiene progreso pero no completada | Naranja claro |
| ✅ Completada | Check | Clase finalizada exitosamente | Verde |
| 🔒 Bloqueada | Candado | Fecha futura, no disponible | Gris |

---

## 🎓 Cálculo de Fechas Dinámicas

### Algoritmo de Fechas
```javascript
fechaClase = fechaInscripción + ((semana - 1) × 7 días)

Ejemplo:
- Inscripción: 10 Nov 2025
- Semana 1: 10 Nov 2025
- Semana 2: 17 Nov 2025
- Semana 3: 24 Nov 2025
- ...
- Semana 26: 5 Mayo 2026
```

### No importa el día de inicio
- ✅ Domingo → Su día 1
- ✅ Lunes → Su día 1
- ✅ Miércoles → Su día 1
- Siempre se cuenta desde la fecha real de inscripción

---

## 📈 Progreso del Estudiante

### Cálculo de Progreso
```
Progreso Total = (Clases Completadas / Total Clases) × 100%

Ejemplo:
- Total clases: 168
- Completadas: 50
- Progreso: 29.76%
```

### Estadísticas Mostradas
1. **Total de Clases:** 168 clases
2. **Completadas:** Número de clases finalizadas
3. **Semana Actual:** Calculada automáticamente desde inscripción
4. **Progreso Total:** Porcentaje general del semestre

---

## 🔄 Navegación por Semanas

### Selector de Semana
- **Botón Anterior (←):** Retrocede 1 semana
- **Botón Siguiente (→):** Avanza 1 semana
- **Display Central:** Muestra "Semana X" y rango de fechas

### Límites
- **Mínimo:** Semana 1
- **Máximo:** Semana 26
- **Semana Actual:** Calculada desde fecha de inscripción

---

## 🎨 Características Visuales

### Cards de Clases Regulares (Semanas 1-20)
- Borde izquierdo rosa (primary color)
- Número de clase en badge rosa
- Información completa de materia
- Barra de progreso

### Cards de Repaso (Semanas 21-22)
- Badge naranja "📝 Repaso"
- Misma estructura que clases regulares
- Enfoque en consolidación

### Cards de Exámenes (Semanas 23-24)
- Badge rojo "📋 Examen"
- Título: "Evaluación Final: [Materia]"
- Duración: 3 horas
- Sin barra de progreso (binario: aprobado/no aprobado)

### Cards de Descanso (Semanas 25-26)
- Fondo verde degradado
- Badge verde "Descanso"
- Sin número de clase
- Mensaje motivacional
- No clickeable

---

## 🚀 Integración con el Sistema

### Conexión con Base de Datos
- Lee `created_at` de tabla `students`
- Lee progreso de `subject_progress`
- Actualiza progreso en tiempo real
- Calcula semestre actual automáticamente

### Sincronización
- ✅ Mis Materias: Mismas materias e IDs
- ✅ Mis Clases: Vista semanal cronológica
- ✅ Malla Curricular: Vista general del programa
- ✅ Progreso: Dashboard de estadísticas

---

## 📱 Responsive Design
- ✅ Desktop: Grid completo
- ✅ Tablet: Grid ajustado
- ✅ Mobile: Cards apiladas
- ✅ Navegación táctil optimizada

---

## 🎯 Casos de Uso

### Estudiante Nuevo (Semana 1)
- Ve solo clases de Semana 1 disponibles
- Semanas 2-26 bloqueadas (fecha futura)
- Puede explorar cronograma completo

### Estudiante Activo (Semana 10)
- Semanas 1-10 disponibles
- Puede revisar clases pasadas
- Semanas 11-26 bloqueadas

### Estudiante Finalizando (Semana 23)
- Todas las clases 1-154 completadas
- En período de exámenes
- Puede ver semanas de descanso próximas

### Estudiante en Descanso (Semana 25)
- Semestre completado
- Visualiza mensaje de descanso
- Se prepara para Semestre 2

---

## 📋 Resumen Ejecutivo

```
┌─────────────────────────────────────────────────────┐
│  SEMESTRE COMPLETO: 26 SEMANAS                      │
├─────────────────────────────────────────────────────┤
│  📚 Semanas 1-20   → 140 clases regulares           │
│  📝 Semanas 21-22  → 14 clases de repaso            │
│  📋 Semanas 23-24  → 14 evaluaciones finales        │
│  🏖️ Semana 25      → Descanso                       │
│  🎉 Semana 26      → Cierre de semestre             │
├─────────────────────────────────────────────────────┤
│  TOTAL: 168 clases + 2 semanas especiales          │
│  7 materias por semestre                            │
│  Fechas dinámicas desde inscripción                 │
└─────────────────────────────────────────────────────┘
```

---

## 🔮 Próximas Mejoras

1. **Notificaciones:** Recordatorios de clases próximas
2. **Calendario:** Vista de calendario mensual
3. **Exportar:** Descargar cronograma en PDF
4. **Sincronización:** Con Google Calendar / Outlook
5. **Gamificación:** Badges por semanas completadas
6. **Social:** Compartir progreso con compañeros

---

**Fecha de implementación:** Noviembre 2025
**Versión:** 1.0
**Estado:** ✅ Activo y funcional
