# Mike Tracker — Plan Físico

App web (PWA) para registrar el plan de 12 semanas.

- **Hoy:** anillos del día, sueño por horario, medidas con selector tipo Digital Crown, varias actividades por día y check-in con 14 preguntas más comentarios.
- **Entreno:** sesiones A/B/C o libres, con los pesos de la vez pasada ya llenos y avance en puntos.
- **Comida:** medidores de macros, metas por comida, tabla de opciones, alimentos propios y cálculo a partir de texto.
- **Cuerpo:** holograma 3D por porcentajes, mosaico de músculos, recomendaciones y diccionario sin internet.
- **Progreso:** plan de 12 semanas, calendario de constancia, estadísticas, puntos de interés (correlaciones) y registro por semana.
- **Ajustes (⚙):** tema claro/oscuro, sistema métrico o imperial (y unidades por medida), matriz de semana y semanas guardadas, sesiones y actividades personalizables, perfil con cálculo de calorías, alimentos con detección automática de grupo, datos y Google Sheets.

## Archivos

| Archivo | Para qué |
| --- | --- |
| `index.html` | Toda la app (HTML, estilos y lógica) |
| `manifest.json` | Nombre, colores e íconos para instalarla |
| `sw.js` | Service worker: permite usarla sin internet |
| `icon-192.png`, `icon-512.png` | Íconos |
| `vendor/three.min.js` | Librería 3D (three.js r128, licencia MIT) para el modelo muscular; local para que funcione sin internet |
| `google-apps-script.gs` | Script para copiar tus datos a Google Sheets (opcional) |
| `.nojekyll` | Le dice a GitHub Pages que sirva los archivos tal cual |

**Importante:** sube también la carpeta `vendor/` con su contenido (arrastra la carpeta completa en GitHub). Sin ella, la pestaña Músculos intenta cargar la librería desde internet.

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

## Guardar tus datos para analizarlos (Google Sheets)

1. Abre `google-apps-script.gs`; los 6 pasos vienen al inicio del archivo.
2. Al terminar tendrás una hoja con pestañas **Semanas, Dias, Series y Comidas**, que se actualiza cada vez que das "Enviar ahora" o una vez al día si activas "Envío diario".
3. Con esa hoja puedes practicar análisis de datos: tablas dinámicas, gráficas, o conectarla a Looker Studio (gratis) o Power BI.

Tus datos siempre viven primero en el teléfono. Sheets es una copia, y el respaldo JSON sirve para restaurarlos.
