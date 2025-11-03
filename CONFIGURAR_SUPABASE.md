# 🔧 Configuración Final de Supabase

## ⚡ Paso 1: Ejecutar SQL (2 minutos)

1. Ve a tu proyecto en Supabase: https://supabase.com/dashboard/project/bajkdvhooousgtahuslp
2. Click en **SQL Editor** en el menú izquierdo
3. Click en **New Query**
4. Copia y pega el contenido del archivo `supabase_setup.sql`
5. Click en **Run** (▶️)
6. Deberías ver: ✅ "Success. No rows returned"

## 🌐 Paso 2: Configurar URLs de Redirección (1 minuto)

1. En tu proyecto de Supabase, ve a **Settings** → **Authentication**
2. Busca la sección **"Site URL"**
3. Cambia el valor a:
   ```
   https://oskarfate.github.io/academia-polis
   ```

4. Busca la sección **"Redirect URLs"**
5. Agrega estas URLs (una por línea):
   ```
   https://oskarfate.github.io/academia-polis/**
   http://localhost:5500/**
   http://127.0.0.1:5500/**
   ```

6. Click en **Save**

## 🎉 ¡Listo!

Tu sitio estará disponible en:
**https://oskarfate.github.io/academia-polis/**

⏱️ **Nota**: GitHub Pages puede tomar 2-3 minutos en activarse completamente.

## 🧪 Probar

1. Visita: https://oskarfate.github.io/academia-polis/
2. Click en **Iniciar Sesión**
3. Regístrate con un email y contraseña
4. Deberías poder acceder al portal estudiantil

---

📚 Si tienes problemas, revisa la consola del navegador (F12) para ver errores.
