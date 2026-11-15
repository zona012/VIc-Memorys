# Álbum para Vic

Libro digital de nueve páginas hecho con HTML, CSS y JavaScript, sin frameworks ni servicios de publicación. Para abrirlo localmente, inicia Live Server desde `index.html`.

Las cuatro fotos de `assets/photos/juntos/` y las tres fotos de `assets/photos/vic/`, además del video `assets/photos/Vic like a frog.webm`, se muestran en las páginas correspondientes y en la galería. La copia WebM conserva el MP4 original y permite reproducir el video en el navegador. Si falta una foto, el marco de la página conserva un espacio decorativo.

La navegación funciona con los botones y las flechas izquierda/derecha. Las notas se abren al pulsar los adhesivos o los espacios para fotografías; el sobre se abre en la octava página. La novena página es una galería privada con descarga de imágenes y video; también permite elegir la carpeta `assets/photos/` para ver otros archivos. La selección permanece en el navegador y no se envía a ningún servicio. Se respeta la preferencia del sistema para reducir movimiento.

Al entrar, una barra indica el progreso de carga de los recursos visuales iniciales. Las texturas y el adorno navideño usan versiones WebP optimizadas; las fotos de las páginas se cargan de forma diferida.

Los comentarios en HTML, CSS y JavaScript separan los módulos y explican su función; las etiquetas numeradas de cada plantilla identifican las páginas del álbum.

## Christmas Update (en desarrollo)

Los cambios de esta actualización se trabajan en la rama `christmas-update`, sin modificar `main`.

- El adorno ✳ del encabezado del libro es un easter egg: al pulsarlo cinco veces seguidas se revela una nota secreta y, si el dispositivo no solicita movimiento reducido, una nevada breve.
- Se añadieron dos easter eggs independientes: escribe `comadres` o `ranita` en el campo «¿Conoces una palabra secreta?» situado bajo el encabezado del libro y pulsa «Descubrir». El formulario también funciona con Enter y el teclado virtual del móvil.
- El efecto de nieve es la recompensa visual del secreto del adorno, no un easter egg adicional: utiliza 18 partículas CSS temporales y no añade animación continua durante la navegación normal.
- Las secuencias de entrada ahora revelan los elementos en tandas limitadas y se detienen si se cambia de página, reduciendo temporizadores innecesarios.
- Se corrigió el contador inicial para mostrar las nueve páginas reales.

Las cartas y sus textos se mantienen sin cambios para que puedan actualizarse por separado.
