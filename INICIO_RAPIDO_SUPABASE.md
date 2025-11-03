# 🚀 GUÍA RÁPIDA: CONFIGURAR SUPABASE EN 5 MINUTOS

## ✅ Paso 1: Crear cuenta en Supabase (1 minuto)

1. Abre tu navegador y ve a: **https://supabase.com**
2. Haz clic en el botón **"Start your project"** (esquina superior derecha)
3. Selecciona cómo quieres registrarte:
   - **Con GitHub** (recomendado - 1 clic)
   - Con Google
   - Con email
4. Completa el proceso y verifica tu email

---

## 🏗️ Paso 2: Crear tu primer proyecto (2 minutos)

1. Una vez dentro, verás tu **Dashboard**
2. Haz clic en **"New Project"** (botón verde)
3. Completa los campos:
   ```
   Organization: Selecciona tu organización (se crea automáticamente)
   Name: academia-polis
   Database Password: [Genera una con el botón o crea una segura]
   Region: South America (sao-paulo) o la más cercana
   Pricing Plan: FREE (es suficiente)
   ```
4. Haz clic en **"Create new project"**
5. **ESPERA 2-3 MINUTOS** mientras Supabase crea tu base de datos

---

## 🔑 Paso 3: Copiar tus credenciales (30 segundos)

1. Una vez creado el proyecto, en el menú lateral izquierdo busca el ícono de **engranaje ⚙️**
2. Haz clic en **"Settings"**
3. En el menú lateral, haz clic en **"API"**
4. Verás dos valores importantes:

### 📋 COPIA ESTOS VALORES:

**A) Project URL:**
```
https://xxxxxxxxxxxxx.supabase.co
```
(Aparece en "Project URL" - copia todo)

**B) anon/public key:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOi...
```
(Es una cadena MUY larga - aparece en "Project API keys" → "anon public")

💡 **TIP:** Haz clic en el ícono de **copiar** al lado de cada valor

---

## 💻 Paso 4: Pegar en tu código (30 segundos)

1. Abre el archivo: **`js/auth.js`**
2. Busca las líneas 10-13 (al inicio del archivo):
   ```javascript
   const SUPABASE_CONFIG = {
       url: 'TU_SUPABASE_URL_AQUI',
       anonKey: 'TU_SUPABASE_ANON_KEY_AQUI'
   };
   ```
3. Reemplaza con tus valores:
   ```javascript
   const SUPABASE_CONFIG = {
       url: 'https://xxxxxxxxxxxxx.supabase.co',
       anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
   };
   ```
4. **GUARDA el archivo** (Ctrl+S)

---

## 🗄️ Paso 5: Crear la tabla de estudiantes (1 minuto)

1. En Supabase, en el menú lateral, haz clic en **"SQL Editor"** (ícono de base de datos)
2. Haz clic en **"+ New query"**
3. **COPIA Y PEGA** este código SQL:

```sql
-- Crear tabla de estudiantes
CREATE TABLE students (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    enrolled_career TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id)
);

-- Habilitar seguridad
ALTER TABLE students ENABLE ROW LEVEL SECURITY;

-- Los usuarios solo ven su propio perfil
CREATE POLICY "Users can view own profile"
    ON students FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
    ON students FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
    ON students FOR UPDATE
    USING (auth.uid() = user_id);
```

4. Haz clic en el botón **"Run"** (▶️ esquina inferior derecha)
5. Deberías ver: **"Success. No rows returned"** ✅

---

## 🎉 Paso 6: ¡PROBAR! (30 segundos)

1. Abre tu archivo **`login.html`** en el navegador
2. Haz clic en la pestaña **"Registrarse"**
3. Completa el formulario:
   ```
   Nombre: Tu Nombre
   Email: tu@email.com
   Contraseña: mínimo 6 caracteres
   Confirmar contraseña: (la misma)
   ```
4. Haz clic en **"✨ Crear Cuenta Gratis"**
5. Si ves: **"¡Cuenta creada! Revisa tu email para confirmar."** → **¡FUNCIONA!** 🎉

---

## ❓ ¿Qué hago si veo un error?

### Error: "Invalid API key"
- ✅ Verifica que copiaste bien la URL y la key
- ✅ Asegúrate de NO tener espacios extras al pegar
- ✅ La key debe empezar con `eyJ`

### Error: "Failed to create account"
- ✅ Ve a Supabase → **"Table Editor"** → Deberías ver la tabla "students"
- ✅ Si no existe, repite el Paso 5

### No recibo el email de confirmación
- ✅ Revisa tu carpeta de SPAM
- ✅ Por ahora puedes iniciar sesión sin confirmar

---

## 🚀 Hostear en GitHub Pages (BONUS)

Para subir tu proyecto a internet GRATIS:

1. Crea un repositorio en GitHub
2. Sube todos tus archivos
3. Ve a **Settings** → **Pages**
4. En "Source" selecciona: **main branch**
5. Guarda y espera 2-3 minutos
6. Tu sitio estará en: `https://tu-usuario.github.io/nombre-repo`

### ⚠️ IMPORTANTE para GitHub Pages:
En **`js/auth.js`**, agrega tu URL de GitHub a Supabase:

1. Ve a Supabase → **Settings** → **Auth**
2. En **"Site URL"** agrega: `https://tu-usuario.github.io/nombre-repo`
3. En **"Redirect URLs"** agrega la misma URL

---

## 📚 Resumen en una imagen:

```
1. supabase.com → Registrarse
2. New Project → Crear proyecto
3. Settings → API → Copiar URL y key
4. Pegar en js/auth.js
5. SQL Editor → Crear tabla students
6. Probar en login.html
7. ¡LISTO! 🎉
```

---

**¿Necesitas ayuda?** Abre la consola del navegador (F12) y busca errores en rojo.

**¡Éxito!** 🏛️
