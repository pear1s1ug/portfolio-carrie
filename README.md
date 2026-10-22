# WP Dev — Portfolio (React + Vite)

Single-page app inspirada en la portada de referencia, con paleta basada en el tema oscuro de VS Code (grafito casi negro + acentos rosa, cian y amarillo).

## Cómo correr el proyecto

```bash
npm install
npm run dev       # desarrollo
npm run build     # build de producción -> carpeta dist/
npm run preview   # sirve el build de producción
```

> Nota: en este entorno de generación no hubo acceso a `registry.npmjs.org`, por lo que no se pudo ejecutar `npm install`/`build` aquí. El código fue verificado renderizando el mismo HTML/CSS con Chromium (carpeta `preview/`, no forma parte del build). En tu máquina con acceso normal a internet, `npm install && npm run dev` debería funcionar sin cambios.

## Reemplazar la foto de portada

La imagen actual (`src/assets/hero-placeholder.jpg`) es un **placeholder generado** (silueta), porque no tengo el archivo real de tu foto centrada.

1. Copia tu imagen (la que tiene el rostro centrado) a `src/assets/hero.jpg` (o el nombre que prefieras).
2. En `src/components/Hero.jsx`, cambia el import:
   ```jsx
   import heroImage from '../assets/hero.jpg'
   ```
3. En `src/styles/hero.css`, la regla `.hero-media__img` usa:
   ```css
   object-position: 78% 18%; /* X% Y% del punto focal */
   ```
   Como tu imagen ya tiene el rostro centrado, este `object-position` es lo que "recorta" visualmente la foto para que el rostro quede alineado al cuadrante superior-derecho, igual que en la referencia — **no necesitas editar la imagen**, solo ajustar estos dos porcentajes hasta que el rostro caiga donde quieras:
   - Primer valor (X): más alto = corre el punto focal hacia la derecha.
   - Segundo valor (Y): más bajo = sube el punto focal.
   - Hay un segundo ajuste igual en el media query `@media (max-width: 860px)` para el punto focal en mobile.
4. La opacidad y el color de fondo casi negro se controlan en las mismas reglas (`opacity`, `.hero-media__scrim`), por si quieres una foto un poco más o menos visible.

## Paleta de colores (tema VS Code)

| Uso | Variable CSS | Valor |
|---|---|---|
| Fondo principal | `--bg` | `#1e1e1e` |
| Fondo alterno / secciones | `--bg-alt` | `#252526` |
| Superficie de tarjetas | `--surface` | `#2d2d30` |
| Texto principal | `--text` | `#d4d4d4` |
| Texto secundario | `--text-dim` | `#9da5b4` |
| Acento rosa (strings/tags) | `--accent-pink` | `#f4b8c4` |
| Acento cian (funciones) | `--accent-cyan` | `#4fc1e9` |
| Acento amarillo (variables) | `--accent-yellow` | `#dcdcaa` |
| Acento verde (comentarios/CTA) | `--accent-green` | `#6a9955` |

Todas las variables están centralizadas en `src/styles/index.css`.

## Estructura

```
src/
  assets/hero-placeholder.jpg
  components/
    Hero.jsx
    Services.jsx
  styles/
    index.css     (variables + botones + import de módulos)
    hero.css
    services.css
  App.jsx
  main.jsx
```
