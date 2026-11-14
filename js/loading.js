const loader = document.getElementById('page-loader');
const loaderBar = document.getElementById('loader-bar');
const loaderProgress = document.getElementById('loader-progress');
const loaderPercent = document.getElementById('loader-percent');
const loaderMessage = document.getElementById('loader-message');
const experience = document.getElementById('experience');

const initialAssets = [
    'assets/decorations/Christmas/christmas-garland.webp',
    'assets/decorations/textures/grain.webp',
    'assets/decorations/textures/dust.webp',
    'assets/decorations/paper/paper-old-1.webp',
    'assets/decorations/flowers/Rama-2.webp',
    'assets/decorations/flowers/Rosa.webp',
    'assets/decorations/stickers/Corazo-1.png'
];

async function loadInitialAssets() {
    let completed = 0;
    const failedAssets = [];

    await Promise.all(initialAssets.map(src => new Promise(resolve => {
        const image = new Image();
        image.onload = resolve;
        image.onerror = () => {
            failedAssets.push(src);
            resolve();
        };
        image.src = src;
    }).then(() => {
        completed += 1;
        const progress = Math.round(completed / initialAssets.length * 100);
        loaderBar.style.width = `${progress}%`;
        loaderProgress.setAttribute('aria-valuenow', String(progress));
        loaderPercent.textContent = `${progress}%`;
    })));

    if (failedAssets.length > 0) {
        loaderMessage.textContent = 'Algunas imágenes no se pudieron cargar.';
        console.error('No se pudieron cargar estos recursos:', failedAssets);
        await new Promise(resolve => window.setTimeout(resolve, 1200));
    }

    loader.classList.add('is-hidden');
    await new Promise(resolve => window.setTimeout(resolve, 350));
    experience.removeAttribute('inert');
}

loadInitialAssets();
