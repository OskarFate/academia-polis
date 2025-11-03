# 🔧 CONFIGURACIÓN DE SUPABASE - ACADEMIA DE LA POLIS

## 📋 Paso 1: Crear cuenta en Supabase

1. Ve a https://supabase.com
2. Haz clic en "Start your project"
3. Crea una cuenta con GitHub, Google o Email
4. Verifica tu email

## 🏗️ Paso 2: Crear un nuevo proyecto

1. En el dashboard, haz clic en "New Project"
2. Completa los datos:
   - **Name**: academia-polis
   - **Database Password**: (genera una segura y guárdala)
   - **Region**: Elige la más cercana a tus usuarios
   - **Pricing Plan**: Free (suficiente para empezar)
3. Haz clic en "Create new project"
4. Espera 2-3 minutos mientras se crea el proyecto

## 🔑 Paso 3: Obtener las credenciales

1. Una vez creado el proyecto, ve a **Settings** (⚙️) en el menú lateral
2. Haz clic en **API**
3. Encontrarás:
   - **Project URL**: `https://xxxxxxxxxxxxx.supabase.co`
   - **anon/public key**: Una cadena larga que empieza con `eyJ...`
4. **¡COPIA ESTOS VALORES!** Los necesitarás en el siguiente paso

## 📝 Paso 4: Configurar las credenciales en el código

1. Abre el archivo: `js/auth.js`
2. Busca las líneas:
   ```javascript
   const SUPABASE_CONFIG = {
       url: 'TU_SUPABASE_URL_AQUI',
       anonKey: 'TU_SUPABASE_ANON_KEY_AQUI'
   };
   ```
3. Reemplaza:
   - `TU_SUPABASE_URL_AQUI` → Tu Project URL
   - `TU_SUPABASE_ANON_KEY_AQUI` → Tu anon/public key

**Ejemplo:**
```javascript
const SUPABASE_CONFIG = {
    url: 'https://abcdefghijklmn.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFz...'
};
```

## 🗄️ Paso 5: Crear la tabla de estudiantes

1. En Supabase, ve a **SQL Editor** en el menú lateral
2. Haz clic en "New query"
3. Pega el siguiente código SQL:

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

-- Habilitar Row Level Security (RLS)
ALTER TABLE students ENABLE ROW LEVEL SECURITY;

-- Política: Los usuarios solo pueden ver y editar su propio perfil
CREATE POLICY "Users can view their own profile"
    ON students FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
    ON students FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
    ON students FOR UPDATE
    USING (auth.uid() = user_id);

-- Crear índices para mejorar rendimiento
CREATE INDEX idx_students_user_id ON students(user_id);
CREATE INDEX idx_students_email ON students(email);

-- Función para actualizar timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para actualizar automáticamente updated_at
CREATE TRIGGER update_students_updated_at 
    BEFORE UPDATE ON students
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

4. Haz clic en "Run" (▶️)
5. Deberías ver: "Success. No rows returned"

## ✉️ Paso 6: Configurar Email (opcional pero recomendado)

Para que funcione el registro con confirmación de email:

1. Ve a **Authentication** → **Email Templates**
2. Personaliza los templates de "Confirm signup" y "Reset password"
3. Ve a **Settings** → **Auth**
4. Configura:
   - **Enable email confirmations**: ON
   - **Site URL**: `http://localhost` (o tu dominio en producción)

### Configurar email personalizado (producción):
1. Ve a **Settings** → **Auth** → **SMTP Settings**
2. Configura tu servidor SMTP (Gmail, SendGrid, etc.)

## 🎨 Paso 7: Opcional - Tabla de progreso (futuro)

Si quieres agregar sistema de progreso, ejecuta también:

```sql
-- Crear tabla de progreso de materias
CREATE TABLE subject_progress (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    subject_id TEXT NOT NULL,
    completed BOOLEAN DEFAULT false,
    completed_at TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, subject_id)
);

-- RLS para progreso
ALTER TABLE subject_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own progress"
    ON subject_progress
    USING (auth.uid() = user_id);

-- Índices
CREATE INDEX idx_subject_progress_user ON subject_progress(user_id);
CREATE INDEX idx_subject_progress_completed ON subject_progress(completed);
```

## ✅ Paso 8: Probar la integración

1. Abre el archivo `login.html` en tu navegador
2. Intenta crear una cuenta nueva
3. Revisa tu email para confirmar (si está habilitado)
4. Inicia sesión
5. Deberías ser redirigido a `portal/estudiante.html`

## 🚨 Troubleshooting

### Error: "Invalid API key"
- Verifica que copiaste correctamente la URL y la anon key
- Asegúrate de no tener espacios extra al pegar

### Error: "Failed to create account"
- Verifica que la tabla `students` fue creada correctamente
- Ve a Supabase → **Table Editor** → Deberías ver la tabla "students"

### No recibo emails de confirmación
- En desarrollo, revisa los logs en Supabase → **Authentication** → **Logs**
- Configura SMTP para producción

### Error: "Permission denied"
- Verifica que las políticas RLS están activas
- Ve a Supabase → **Authentication** → **Policies**

## 📚 Recursos adicionales

- Documentación de Supabase: https://supabase.com/docs
- Guía de autenticación: https://supabase.com/docs/guides/auth
- JavaScript Client: https://supabase.com/docs/reference/javascript

## 🆘 ¿Necesitas ayuda?

Si tienes problemas:
1. Revisa los logs en Supabase → **Logs**
2. Abre la consola del navegador (F12) para ver errores
3. Verifica que todas las configuraciones estén correctas

---

**¡Listo!** Una vez configurado, tu sistema de autenticación estará funcionando. 🎉
