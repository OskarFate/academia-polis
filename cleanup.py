# Script para limpiar el archivo y restaurar el original

import re

# Leer el archivo
with open('carreras/data-analysis-curriculum.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Eliminar todo el bloque de estilos de progreso
content = re.sub(
    r'    <style>.*?</style>\n',
    '',
    content,
    flags=re.DOTALL
)

# 2. Eliminar el panel de progreso completo
content = re.sub(
    r'    <!-- PANEL DE PROGRESO -->.*?    </section>\n\n',
    '',
    content,
    flags=re.DOTALL
)

# 3. Eliminar todos los checkboxes de las tarjetas
content = re.sub(
    r'                        <div class="subject-checkbox-container">.*?</div>\n',
    '',
    content,
    flags=re.DOTALL
)

# 4. Eliminar la referencia al script progress.js
content = re.sub(
    r'    <script src="../js/progress.js"></script>\n',
    '',
    content
)

# 5. Eliminar input file hidden
content = re.sub(
    r'            <input type="file" id="import-progress-input" accept=".json">\n',
    '',
    content
)

# Guardar el archivo limpio
with open('carreras/data-analysis-curriculum.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ ¡Listo! Archivo restaurado al original sin sistema de progreso")
print("✓ Estilos de progreso eliminados")
print("✓ Panel de progreso eliminado")
print("✓ Checkboxes eliminados")
print("✓ Script progress.js eliminado")
