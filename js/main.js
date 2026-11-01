const intro = document.getElementById('intro');
const scrapbook = document.getElementById('scrapbook');
const paper = document.getElementById('page-content');
const startButton = document.getElementById('start');
const previousButton = document.getElementById('previous-page');
const nextButton = document.getElementById('next-page');
const pageCounter = document.getElementById('page-counter');

// Estado de navegación: índice cero y bandera que bloquea aperturas repetidas.
let currentPage = 0;
let started = false;

// Sincroniza los botones y el contador con la página activa.
function updateNavigation() {
    pageCounter.textContent = `Página ${currentPage + 1} de ${Scrapbook.pages.length}`;
    previousButton.disabled = currentPage === 0;
    nextButton.disabled = currentPage === Scrapbook.pages.length - 1;
    nextButton.replaceChildren();
    nextButton.append(document.createTextNode(
        currentPage === Scrapbook.pages.length - 1 ? 'Fin del álbum ' : 'Siguiente '
    ));
    const arrow = document.createElement('span');
    arrow.setAttribute('aria-hidden', 'true');
    arrow.textContent = currentPage === Scrapbook.pages.length - 1 ? '✦' : '→';
    nextButton.append(arrow);
}

// Renderiza una sola hoja, prepara sus imágenes y anima sus elementos.
async function showPage(index) {
    if (index < 0 || index >= Scrapbook.pages.length) return;

    currentPage = index;
    paper.innerHTML = Scrapbook.pages[index];
    updateNavigation();

    const page = paper.querySelector('.page-layout');
    Scrapbook.preparePhotos(page);
    Scrapbook.renderGallery(page);
    await AnimationEngine.revealSequence(page);
}

// Desvanece la invitación antes de mostrar la portada.
startButton.addEventListener('click', async () => {
    if (started) return;
    started = true;
    startButton.disabled = true;
    intro.classList.add('intro-exit');

    await AnimationEngine.sleep(800);
    intro.classList.add('hidden');
    scrapbook.classList.remove('hidden');
    await showPage(0);
});

previousButton.addEventListener('click', () => showPage(currentPage - 1));
nextButton.addEventListener('click', () => showPage(currentPage + 1));

// Las flechas permiten avanzar sin ratón; no interceptan teclas de modificador.
document.addEventListener('keydown', event => {
    if (!started || !Scrapbook.modal.classList.contains('hidden')) return;
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    const isEditing = event.target instanceof HTMLElement
        && event.target.closest('input, textarea, select, video, audio, [contenteditable="true"]');
    if (isEditing) return;

    if (event.key === 'ArrowRight') {
        event.preventDefault();
        showPage(currentPage + 1);
    } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        showPage(currentPage - 1);
    }
});

updateNavigation();
