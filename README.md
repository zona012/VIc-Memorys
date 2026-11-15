# Álbum para Vic

Libro digital de nueve páginas hecho con HTML, CSS y JavaScript, sin frameworks ni servicios de publicación. Para abrirlo localmente, inicia Live Server desde `index.html`.

Las cuatro fotos de `assets/photos/juntos/` y las tres fotos de `assets/photos/vic/`, además del video `assets/photos/Vic like a frog.webm`, se muestran en las páginas correspondientes y en la galería. La copia WebM conserva el MP4 original y permite reproducir el video en el navegador. Si falta una foto, el marco de la página conserva un espacio decorativo.

La navegación funciona con los botones y las flechas izquierda/derecha. Las notas se abren al pulsar los adhesivos o los espacios para fotografías; el sobre se abre en la octava página. La novena página es una galería privada con descarga de imágenes y video; también permite elegir una carpeta local para ver otros archivos. La selección permanece en el navegador y no se envía a ningún servicio. Se respeta la preferencia del sistema para reducir movimiento.

Al entrar, una barra indica el progreso de carga de los recursos visuales iniciales. Las texturas y el adorno navideño usan versiones WebP optimizadas; las fotos de las páginas se cargan de forma diferida.

## Actualización navideña

El álbum conserva sus nueve páginas, los textos originales y las notas interactivas. Se añadieron tres easter eggs:

- Pulsa cinco veces seguidas el adorno ✳ para descubrir una nota de diciembre y una nevada breve.
- Escribe `comadres` o `ranita` en el campo «¿Conoces una palabra secreta?» y pulsa «Descubrir». También funciona con Enter y con el teclado virtual del móvil.
- La nieve es la recompensa visual del secreto del adorno, no un cuarto easter egg. Se generan 18 partículas temporales y se respeta `prefers-reduced-motion`.

Las ventanas de notas se pueden cerrar con Escape, con el botón o pulsando fuera; ahora mantienen el foco dentro del diálogo y desactivan temporalmente el fondo para lectores de teclado.

## Publicación y rendimiento

El flujo de GitHub Pages construye una carpeta `dist/` con los archivos HTML, CSS y JavaScript, más los recursos gráficos que esos archivos referencian. Los originales no utilizados se conservan en el repositorio, pero no se incluyen en el sitio publicado. Para generar la carpeta localmente, ejecuta:

```bash
node scripts/build-pages.mjs
```

Las cartas y sus textos se mantienen intactos para que puedan actualizarse por separado.
