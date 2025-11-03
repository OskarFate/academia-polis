# 🚀 HOSTEAR EN GITHUB PAGES - GUÍA COMPLETA

## 📋 Requisitos previos
- Cuenta de GitHub (gratis)
- Tu proyecto local funcionando

---

## Paso 1: Crear repositorio en GitHub

1. Ve a **https://github.com**
2. Haz clic en el **+** (esquina superior derecha)
3. Selecciona **"New repository"**
4. Completa:
   ```
   Repository name: academia-polis
   Description: Academia gratuita de Data Analysis
   Public (seleccionado)
   ❌ NO marques "Add a README file"
   ```
5. Haz clic en **"Create repository"**

---

## Paso 2: Subir tu proyecto

### Opción A: Usando GitHub Desktop (Fácil)

1. Descarga **GitHub Desktop**: https://desktop.github.com
2. Instala y abre GitHub Desktop
3. File → **Add Local Repository**
4. Selecciona tu carpeta: `C:\Users\PC\Desktop\universidad autodidacta`
5. Si dice "not a git repository", haz clic en **"create a repository"**
6. Completa:
   ```
   Name: academia-polis
   Git Ignore: None
   License: None
   ```
7. Haz clic en **"Publish repository"**
8. Marca **Public** y haz clic en **"Publish Repository"**

### Opción B: Usando la terminal (Avanzado)

Abre PowerShell en tu carpeta del proyecto y ejecuta:

```powershell
cd "C:\Users\PC\Desktop\universidad autodidacta"
git init
git add .
git commit -m "Initial commit - Academia de la Polis"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/academia-polis.git
git push -u origin main
```

---

## Paso 3: Activar GitHub Pages

1. En tu repositorio en GitHub, ve a **Settings** (⚙️ tab superior)
2. En el menú lateral izquierdo, haz clic en **"Pages"**
3. En la sección **"Source"**:
   - Branch: Selecciona **main**
   - Folder: Deja **/ (root)**
4. Haz clic en **"Save"**
5. **ESPERA 2-3 MINUTOS**
6. Recarga la página y verás:
   ```
   ✅ Your site is live at https://TU-USUARIO.github.io/academia-polis/
   ```

---

## Paso 4: Configurar Supabase para GitHub Pages

⚠️ **MUY IMPORTANTE** para que el login funcione:

1. Ve a **Supabase** → tu proyecto
2. **Settings** → **Authentication**
3. En **"Site URL"** cambia a:
   ```
   https://TU-USUARIO.github.io/academia-polis
   ```
4. En **"Redirect URLs"** agrega:
   ```
   https://TU-USUARIO.github.io/academia-polis/portal/estudiante.html
   https://TU-USUARIO.github.io/academia-polis/**
   ```
5. Haz clic en **"Save"**

---

## Paso 5: Probar tu sitio

1. Abre: `https://TU-USUARIO.github.io/academia-polis/`
2. Navega por el sitio
3. Prueba el login/registro
4. Verifica que todo funcione

---

## 🔄 Actualizar tu sitio (cuando hagas cambios)

### Con GitHub Desktop:
1. Abre GitHub Desktop
2. Verás los archivos modificados
3. Escribe un mensaje de commit (ej: "Actualización de estilos")
4. Haz clic en **"Commit to main"**
5. Haz clic en **"Push origin"**
6. Espera 1-2 minutos y recarga tu sitio

### Con terminal:
```powershell
cd "C:\Users\PC\Desktop\universidad autodidacta"
git add .
git commit -m "Descripción de los cambios"
git push
```

---

## 🎨 Personalizar el dominio (Opcional)

Si tienes un dominio propio (ej: `academiadepolis.com`):

1. En GitHub Pages settings, en **"Custom domain"** pon: `academiadepolis.com`
2. En tu proveedor de dominio (GoDaddy, Namecheap, etc.), crea un registro CNAME:
   ```
   Type: CNAME
   Host: www
   Value: TU-USUARIO.github.io
   ```
3. Espera 24-48 horas para que se propague

---

## ✅ Checklist final

- [ ] Repositorio creado en GitHub
- [ ] Código subido
- [ ] GitHub Pages activado
- [ ] Sitio accesible en la URL
- [ ] Supabase configurado con la URL de GitHub Pages
- [ ] Login funcionando
- [ ] Portal accesible

---

## 🆘 Problemas comunes

### "404 - Page not found"
- Espera 5 minutos más
- Verifica que la rama sea **main** no **master**
- Verifica que **index.html** esté en la raíz del repo

### Login no funciona en GitHub Pages
- Verifica la configuración de "Site URL" en Supabase
- Abre la consola del navegador (F12) y busca errores

### Los estilos no cargan
- Verifica que las rutas en los archivos HTML sean relativas
- Asegúrate de que **css/styles.css** exista en el repo

---

## 📱 Compartir tu sitio

Una vez publicado, puedes compartir:

```
🏛️ ACADEMIA DE LA POLIS
"Saber para todos, poder para el pueblo"

🌐 Sitio: https://TU-USUARIO.github.io/academia-polis
🎓 100% Gratuito
📚 Data Analysis & Python Mastery
💝 Sostenido por donaciones
```

---

**¡Felicitaciones! Tu academia ya está en línea 🎉**
