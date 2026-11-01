// Inventario de fotos y video reales que se usan en las páginas y en la galería.
const photoLibrary = [
    { src: 'assets/photos/juntos/Vic and I-4.jpg', title: 'Una foto compartida', kind: 'image' },
    { src: 'assets/photos/juntos/Vic and I-3.jpg', title: 'Otra foto juntas', kind: 'image' },
    { src: 'assets/photos/juntos/Vic and I-2.webp', title: 'Un recuerdo juntas', kind: 'image' },
    { src: 'assets/photos/juntos/Vic and I.webp', title: 'Una foto para guardar', kind: 'image' },
    { src: 'assets/photos/vic/bald Vic.png', title: 'La etapa pelona', kind: 'image' },
    { src: 'assets/photos/vic/Vic baby.jpg', title: 'Vic de pequeña', kind: 'image' },
    { src: 'assets/photos/vic/Boochi Vic.jpg', title: 'Una imagen para sonreír', kind: 'image' },
    { src: 'assets/photos/Vic like a frog.webm', title: 'Vic como ranita', kind: 'video' }
];

// Construye una foto Polaroid; si falta el archivo, queda el marco decorativo.
const photoFrame = (caption, label, photoPath) => `
    <button class="memory-frame reveal" type="button"
        data-note-title="${caption}"
        data-note-message="Esta imagen forma parte de tu álbum. También puedes abrirla y descargarla en la galería de la última página."
        aria-label="${label}">
        <img class="photo-image" src="${photoPath}" alt="${caption}">
        <span class="photo-placeholder">Un espacio<br>para una fotografía</span>
        <span class="memory-caption">${caption}</span>
        <span class="photo-hint">PULSÁ PARA LEER LA NOTA</span>
    </button>
`;

// Incorpora el video real como una pieza reproducible del museo de incidentes.
const videoFrame = (video, poster) => `
    <figure class="memory-frame video-memory reveal">
        <video class="memory-video" controls playsinline preload="metadata" poster="${poster}" aria-label="Video de Vic como ranita">
            <source src="${video.src}" type="video/webm">
            Tu navegador no puede reproducir este video.
        </video>
        <figcaption class="memory-caption">${video.title}</figcaption>
    </figure>
`;

// Firma y numeración impresas al pie de cada hoja.
const pageEnd = number => `
    <span class="page-footer">HECHO CON CARIÑO · PARA VIC</span>
    <span class="page-number">${String(number).padStart(2, '0')}</span>
`;

const Scrapbook = {
    modal: document.getElementById('modal'),
    previousFocus: null,
    selectedGalleryFiles: [],
    galleryObjectUrls: new Map(),

    // Plantillas de las ocho páginas originales y la galería final.
    pages: [
        `<article class="page-layout cover-layout">
            <img class="cover-branch reveal" src="assets/decorations/flowers/Rama-2.png" alt="">
            <img class="cover-rose reveal" src="assets/decorations/flowers/Rosa.png" alt="">
            <span class="page-label reveal">UN LIBRO PEQUEÑO, UN CARIÑO ENORME</span>
            <h2 class="page-title cover-title reveal">Para<br><em>Vic.</em></h2>
            <p class="page-copy cover-copy reveal">Hay historias que no necesitan hacer ruido<br>para convertirse en un hogar.</p>
            <img class="cover-seal reveal" src="assets/decorations/stickers/Corazo-1.png" alt="">
            ${pageEnd(1)}
        </article>`,

        `<article class="page-layout story-layout">
            <img class="page-flower reveal" src="assets/decorations/flowers/Flower-3.png" alt="">
            <span class="page-label reveal">01 · EL COMIENZO</span>
            <h2 class="page-title reveal">De no llevarnos<br>a ser <em>comadres.</em></h2>
            <p class="page-copy reveal">Quién iba a decir que una historia que empezó con tan poca química terminaría convirtiéndose en una amistad tan nuestra.</p>
            <div class="story-note reveal">
                <p>Con el tiempo llegaron la confianza, las risas y ese título de <strong>comadres</strong> que hoy nos queda tan bien.</p>
            </div>
            <div class="memory-grid single-memory">${photoFrame(photoLibrary[0].title, 'Abrir la foto compartida', photoLibrary[0].src)}</div>
            ${pageEnd(2)}
        </article>`,

        `<article class="page-layout memory-layout">
            <img class="page-flower reveal" src="assets/decorations/flowers/Flower-5.png" alt="">
            <span class="page-label reveal">02 · EL DESASTRE DE SIEMPRE</span>
            <h2 class="page-title reveal">La seriedad<br>nunca fue <em>lo nuestro.</em></h2>
            <p class="page-copy reveal">Entre ocurrencias, planes que se tuercen y esa facilidad para reírnos juntas, hasta un día cualquiera puede terminar en anécdota.</p>
            <div class="memory-grid">
                ${photoFrame(photoLibrary[1].title, 'Abrir la tercera foto del álbum', photoLibrary[1].src)}
                ${photoFrame(photoLibrary[2].title, 'Abrir la cuarta foto del álbum', photoLibrary[2].src)}
            </div>
            <button class="page-sticker reveal" type="button" data-note-title="Archivo de ocurrencias" data-note-message="Este álbum todavía guarda espacio para las historias absurdas que solo ustedes entienden." aria-label="Leer nota del archivo de ocurrencias">
                <img src="assets/decorations/stickers/Garabato-1.png" alt="">
            </button>
            ${pageEnd(3)}
        </article>`,

        `<article class="page-layout incident-layout">
            <span class="page-label reveal">03 · EL MUSEO DE LOS INCIDENTES</span>
            <h2 class="page-title reveal">Piezas que<br>merecen <em>marco propio.</em></h2>
            <div class="incident-list">
                <p class="incident reveal"><strong>Los Skinny Jeans rotos.</strong> Una pieza fundamental del archivo.</p>
                <p class="incident reveal"><strong>La transformación de Vic en pelona.</strong> Un antes y un después.</p>
                <p class="incident reveal">Las referencias a <strong>Hitori Gotō</strong> y <strong>Sans</strong>, patrimonio de esta amistad.</p>
            </div>
            <p class="incident-aside reveal"><img src="assets/decorations/stickers/Stars-2.png" alt="">La curaduría de este museo es completamente seria. Más o menos.</p>
            <div class="memory-grid">
                ${photoFrame(photoLibrary[4].title, 'Abrir la foto de la etapa pelona', photoLibrary[4].src)}
                ${videoFrame(photoLibrary[7], photoLibrary[4].src)}
            </div>
            ${pageEnd(4)}
        </article>`,

        `<article class="page-layout admiration-layout">
            <img class="page-flower reveal" src="assets/decorations/flowers/Flower-6.png" alt="">
            <span class="page-label reveal">04 · LO QUE ADMIRO DE VOS</span>
            <h2 class="page-title reveal">Tenés un don<br>para <em>convencer.</em></h2>
            <blockquote class="admiration-quote reveal">Tu labia de político en campaña podría convencer a cualquiera de cualquier cosa.</blockquote>
            <p class="page-copy reveal">Pero detrás de ese talento para salirte con la tuya está algo que admiro todavía más: tu manera tan auténtica de ser vos.</p>
            <div class="memory-grid single-memory">${photoFrame(photoLibrary[6].title, 'Abrir una imagen para sonreír', photoLibrary[6].src)}</div>
            <button class="page-sticker convince-sticker reveal" type="button" data-note-title="Habilidad comprobada" data-note-message="Capacidad de persuasión: extraordinaria. Capacidad de hacerte querer: todavía mayor." aria-label="Leer una nota sobre sus habilidades">
                <img src="assets/decorations/stickers/Stars.png" alt="">
            </button>
            ${pageEnd(5)}
        </article>`,

        `<article class="page-layout support-layout">
            <img class="page-flower reveal" src="assets/decorations/flowers/Rama-1.png" alt="">
            <span class="page-label reveal">05 · EN LOS DÍAS DIFÍCILES</span>
            <h2 class="page-title reveal">También supimos<br>quedarnos <em>cerca.</em></h2>
            <p class="page-copy reveal">Hemos atravesado momentos complicados. No hace falta tener siempre las palabras perfectas: a veces alcanza con saber que podemos acompañarnos y seguir adelante, un día a la vez.</p>
            <img class="support-mark reveal" src="assets/decorations/stickers/Corazo-3.png" alt="">
            ${pageEnd(6)}
        </article>`,

        `<article class="page-layout friendship-layout">
            <span class="page-label reveal">06 · UNA AMISTAD ENTRE MILES</span>
            <h2 class="page-title reveal">Amiga del<br><em>alma.</em></h2>
            <p class="page-copy reveal">Sos de esas personas difíciles de encontrar y todavía más difíciles de reemplazar. Entre tanta gente, vos ocupás un lugar que es solamente tuyo.</p>
            <div class="memory-grid">
                ${photoFrame(photoLibrary[3].title, 'Abrir otra foto compartida', photoLibrary[3].src)}
                ${photoFrame(photoLibrary[5].title, 'Abrir la foto de Vic de pequeña', photoLibrary[5].src)}
            </div>
            <button class="page-sticker friendship-sticker reveal" type="button" data-note-title="Un lugar especial" data-note-message="No hace falta llenar estas páginas para saber cuánto significás. Este lugar ya es tuyo." aria-label="Leer una nota sobre su lugar especial">
                <img src="assets/decorations/stickers/Corazo-2.png" alt="">
            </button>
            ${pageEnd(7)}
        </article>`,

        `<article class="page-layout letter-layout">
            <span class="page-label reveal">07 · LA ÚLTIMA CARTA</span>
            <h2 class="page-title reveal">Para cuando<br>lo necesités.</h2>
            <div class="letter-paper reveal">
                <p class="letter-copy">Vic: gracias por convertirte en mi comadre, por las risas, por las ocurrencias y por estar también cuando los días pesan. Me alegra que aquella historia que empezó con tan poca química nos haya traído hasta acá.<br><br>Ojalá nunca se te olvide que sos una amiga del alma, de esas que no aparecen todos los días. Te quiero muchísimo y siempre voy a guardar con cariño este lugar que tenemos.</p>
                <p class="letter-signature">Con todo mi cariño.</p>
            </div>
            <button class="envelope-button reveal" type="button" aria-expanded="false" aria-controls="envelope-message">
                <span class="envelope" aria-hidden="true"><img class="envelope-heart" src="assets/decorations/stickers/Corazo-4-WHite.png" alt=""></span>
                <span class="envelope-label">Abrí el sobre</span>
            </button>
            <p class="envelope-message" id="envelope-message" hidden>Y si alguna vez lo olvidás, volvé a esta página: acá siempre vas a encontrar un abrazo.</p>
            ${pageEnd(8)}
        </article>`,

        `<article class="page-layout gallery-layout">
            <span class="page-label reveal">08 · UN RECUERDO PARA LLEVAR</span>
            <h2 class="page-title reveal">La galería<br><em>de nosotras.</em></h2>
            <p class="gallery-intro reveal">Aquí puedes mirar las fotos y el video guardados en el álbum y descargar los que quieras conservar.</p>
            <div class="gallery-actions reveal">
                <label class="gallery-folder-label">
                    <input class="gallery-folder-input" id="gallery-folder-picker" type="file" accept="image/*,video/*" multiple webkitdirectory directory aria-describedby="gallery-privacy">
                    <span class="gallery-picker">Elegí la carpeta de fotos</span>
                </label>
                <span class="gallery-count" id="gallery-count" aria-live="polite">Buscando fotos…</span>
            </div>
            <p class="gallery-status reveal" id="gallery-privacy">Por privacidad, el navegador no puede abrir carpetas sin permiso. Elige assets/photos/; las imágenes y el video se procesan solo en tu dispositivo. Si tu navegador no permite elegir carpetas, selecciona los archivos directamente.</p>
            <div class="gallery-grid reveal" id="gallery-grid">
                <p class="gallery-empty" id="gallery-empty">Todavía no hay recuerdos. Puedes añadirlos a la carpeta o elegirlos aquí.</p>
            </div>
            ${pageEnd(9)}
        </article>`
    ],

    // Detecta imágenes ausentes y deja visible el marco artesanal como alternativa.
    preparePhotos(container) {
        container.querySelectorAll('.photo-image').forEach(image => {
            const frame = image.closest('.memory-frame');
            const showPhoto = () => frame.classList.add('has-photo');
            const discardMissingPhoto = () => image.remove();

            image.addEventListener('load', showPhoto, { once: true });
            image.addEventListener('error', discardMissingPhoto, { once: true });

            if (image.complete) {
                if (image.naturalWidth > 0) showPhoto();
                else discardMissingPhoto();
            }
        });
    },

    // Libera las URL temporales al reemplazar la carpeta elegida.
    releaseGalleryUrls() {
        this.galleryObjectUrls.forEach(url => URL.revokeObjectURL(url));
        this.galleryObjectUrls.clear();
    },

    // Explora solo las rutas conocidas y los archivos que Vic seleccione explícitamente.
    renderGallery(container) {
        const grid = container.querySelector('#gallery-grid');
        const empty = container.querySelector('#gallery-empty');
        const counter = container.querySelector('#gallery-count');
        const status = container.querySelector('#gallery-privacy');
        if (!grid || !empty || !counter || !status) return;

        const knownPhotos = photoLibrary.map(photo => ({
            ...photo,
            fileName: photo.src.split('/').pop(),
            key: photo.src.replace(/^assets\/photos\//, '').toLowerCase()
        }));
        const seen = new Set(knownPhotos.map(photo => photo.key));
        const chosenPhotos = this.selectedGalleryFiles.flatMap(file => {
            const parts = (file.webkitRelativePath || file.name).split('/');
            const photosIndex = parts.lastIndexOf('photos');
            const key = (photosIndex >= 0 ? parts.slice(photosIndex + 1) : parts.slice(-2))
                .join('/')
                .toLowerCase();
            if (seen.has(key)) return [];
            seen.add(key);

            let src = this.galleryObjectUrls.get(file);
            if (!src) {
                src = URL.createObjectURL(file);
                this.galleryObjectUrls.set(file, src);
            }

            return [{
                src,
                title: 'Recuerdo añadido',
                fileName: file.name,
                key,
                kind: file.type.startsWith('video/') || /\.(mp4|webm|mov|ogv)$/i.test(file.name)
                    ? 'video'
                    : 'image'
            }];
        });

        grid.replaceChildren(empty);
        let visibleCount = 0;
        const updateCount = () => {
            counter.textContent = `${visibleCount} ${visibleCount === 1 ? 'recuerdo disponible' : 'recuerdos disponibles'}`;
            empty.hidden = visibleCount > 0;
            if (visibleCount === 0 && this.selectedGalleryFiles.length > 0) {
                status.textContent = 'No encontramos imágenes o videos compatibles en la carpeta elegida.';
            } else if (this.selectedGalleryFiles.length > 0) {
                status.textContent = 'Las imágenes y videos seleccionados se muestran solo en este dispositivo; no se han enviado a internet.';
            }
        };

        [...knownPhotos, ...chosenPhotos].forEach(photo => {
            const card = document.createElement('article');
            card.className = 'gallery-card';

            let media;
            if (photo.kind === 'video') {
                media = document.createElement('video');
                media.className = 'gallery-image gallery-video';
                media.src = photo.src;
                media.controls = true;
                media.playsInline = true;
                media.preload = 'metadata';
                media.poster = photoLibrary.find(item => item.kind === 'image' && item.title === 'La etapa pelona').src;
                media.setAttribute('aria-label', `Video: ${photo.title}`);
            } else {
                const previewLink = document.createElement('a');
                previewLink.className = 'gallery-image-link';
                previewLink.href = photo.src;
                previewLink.target = '_blank';
                previewLink.rel = 'noopener';
                previewLink.setAttribute('aria-label', `Abrir ${photo.title}`);

                media = document.createElement('img');
                media.className = 'gallery-image';
                media.src = photo.src;
                media.alt = photo.title;
                media.loading = 'lazy';
                previewLink.append(media);
                card.append(previewLink);
            }

            const caption = document.createElement('p');
            caption.className = 'gallery-caption';
            caption.textContent = photo.title;

            const download = document.createElement('a');
            download.className = 'gallery-download';
            download.href = photo.src;
            download.download = photo.fileName;
            download.textContent = photo.kind === 'video' ? 'Descargar video' : 'Descargar foto';

            card.append(caption, download);
            const markAvailable = () => {
                visibleCount += 1;
                updateCount();
            };
            const discardUnavailable = () => {
                card.remove();
                updateCount();
            };
            media.addEventListener(photo.kind === 'video' ? 'loadedmetadata' : 'load', markAvailable, { once: true });
            media.addEventListener('error', discardUnavailable, { once: true });
            grid.append(card);
        });
        updateCount();
    },

    init() {
        const closeButton = document.getElementById('close-modal');

        closeButton.addEventListener('click', () => this.closeModal());
        this.modal.addEventListener('click', event => {
            if (event.target === this.modal) this.closeModal();
        });

        document.addEventListener('click', event => {
            if (!(event.target instanceof Element)) return;
            const noteTrigger = event.target.closest('[data-note-title]');
            if (noteTrigger) {
                this.openModal(noteTrigger.dataset.noteTitle, noteTrigger.dataset.noteMessage);
                return;
            }

            const envelope = event.target.closest('.envelope-button');
            if (envelope) {
                const isOpen = envelope.getAttribute('aria-expanded') === 'true';
                envelope.setAttribute('aria-expanded', String(!isOpen));
                envelope.querySelector('.envelope-label').textContent = isOpen ? 'Abrí el sobre' : 'Cerrar el sobre';
                document.getElementById('envelope-message').hidden = isOpen;
            }
        });

        // El selector de carpeta solo conserva referencias locales en memoria.
        document.addEventListener('change', event => {
            if (!(event.target instanceof HTMLInputElement) || event.target.id !== 'gallery-folder-picker') return;

            this.releaseGalleryUrls();
            this.selectedGalleryFiles = [...event.target.files].filter(file =>
                file.type.startsWith('image/')
                || file.type.startsWith('video/')
                || /\.(avif|gif|jpe?g|png|svg|webp|mp4|webm|mov|ogv)$/i.test(file.name)
            );
            this.renderGallery(event.target.closest('.gallery-layout'));
        });

        document.addEventListener('keydown', event => {
            if (event.key === 'Escape' && !this.modal.classList.contains('hidden')) {
                this.closeModal();
            }
        });
    },

    openModal(title, message) {
        this.previousFocus = document.activeElement;
        document.getElementById('modal-title').textContent = title;
        document.getElementById('modal-message').textContent = message;
        this.modal.classList.remove('hidden');
        document.getElementById('close-modal').focus();
    },

    closeModal() {
        if (this.modal.classList.contains('hidden')) return;
        this.modal.classList.add('hidden');
        if (this.previousFocus instanceof HTMLElement) this.previousFocus.focus();
    }
};

Scrapbook.init();
