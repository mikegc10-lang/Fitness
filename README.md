# Mike Tracker — Plan Físico

App web (PWA) para registrar el plan de 12 semanas: peso, cintura, sueño, comidas, entrenamientos A/B/C, yoga y progreso.
Funciona sin internet y se instala en el celular como una app.

## Archivos

| Archivo | Para qué |
| --- | --- |
| `index.html` | Toda la app (HTML, estilos y lógica) |
| `manifest.json` | Nombre, colores e íconos para instalarla |
| `sw.js` | Service worker: permite usarla sin internet |
| `icon-192.png`, `icon-512.png` | Íconos |
| `.nojekyll` | Le dice a GitHub Pages que sirva los archivos tal cual |

## Subirla a GitHub Pages (desde el navegador, sin terminal)

1. Entra a <https://github.com/new>.
2. Nombre del repositorio: `mike-tracker`. Déjalo **Public** (GitHub Pages gratis requiere repo público). Clic en **Create repository**.
3. En la página del repo vacío, clic en **uploading an existing file**.
4. Arrastra **todos** los archivos de esta carpeta (incluido `.nojekyll`; si tu explorador lo oculta, actívalo con "mostrar archivos ocultos", o créalo después en GitHub con **Add file → Create new file** y nombre `.nojekyll` vacío).
5. Clic en **Commit changes**.
6. Ve a **Settings → Pages**. En *Build and deployment*: Source = **Deploy from a branch**, Branch = **main** y carpeta **/ (root)**. **Save**.
7. Espera 1–2 minutos y recarga esa página: aparece la dirección, algo como
   `https://TU-USUARIO.github.io/mike-tracker/`

## Subirla con terminal (opcional)

```bash
cd mike-tracker
git init
git add .
git commit -m "Mike Tracker v1"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/mike-tracker.git
git push -u origin main
```
Luego haz el paso 6 de arriba.

## Probarla

- **En la compu:** abre la dirección en Chrome. F12 → pestaña *Application* → *Manifest* y *Service workers* deben verse sin errores.
- **Android (Chrome):** abre la dirección → Ajustes de la app → **Instalar en este dispositivo**, o menú ⋮ → *Instalar app*.
- **iPhone (Safari):** abre la dirección → botón Compartir → **Agregar a inicio**.
- **Sin internet:** ábrela una vez con internet, activa modo avión y vuelve a abrirla: debe cargar.

> Abrir `index.html` con doble clic también funciona para probar, pero así no se instala ni funciona offline: eso solo pasa servida por https (GitHub Pages).

## Tus datos

- Se guardan **en el navegador de ese dispositivo** (localStorage). No se suben a GitHub ni a ningún servidor.
- Si borras datos del navegador o desinstalas, se pierden: usa **Ajustes → Exportar JSON** cada semana como respaldo.
- Para pasar datos a otro teléfono o a la versión en Claude: Exportar JSON en uno → Importar en el otro.
- **CSV** abre directo en Excel (una tabla por día y otra por serie de ejercicio).

## Hacer cambios

1. Edita `index.html` (en GitHub: abre el archivo → ícono de lápiz → **Commit changes**).
2. En `sw.js` sube el número de versión: `mike-tracker-v2` → `mike-tracker-v3`.
3. En el teléfono, cierra y vuelve a abrir la app (a veces dos veces) para que tome la versión nueva.

## Problemas comunes

| Síntoma | Solución |
| --- | --- |
| Página 404 en GitHub Pages | Espera 2 min; revisa que `index.html` esté en la raíz, no dentro de otra carpeta |
| No aparece "Instalar" | Debe abrirse por `https://...github.io/...`, no como archivo; recarga una vez |
| No ves tus cambios | Sube la versión en `sw.js` y reabre la app |
| Íconos no salen | Revisa que los `.png` se hayan subido con el mismo nombre |
