// Easter eggs estacionales: nada se ejecuta hasta que alguien descubre el adorno.
(() => {
    const ornament = document.getElementById('secret-ornament');
    if (!ornament) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let taps = 0;
    let resetTimer;

    function showSecretNote() {
        if (typeof Scrapbook !== 'undefined') {
            Scrapbook.openModal(
                'Un secreto de diciembre',
                'Encontraste el pequeño secreto navideño. Que nunca falten las sorpresas, las risas y los recuerdos que merecen quedarse.'
            );
        }
    }

    function makeSnowfall() {
        if (reducedMotion) return;
        const layer = document.createElement('div');
        layer.className = 'snowfall-layer';
        layer.setAttribute('aria-hidden', 'true');
        const fragment = document.createDocumentFragment();

        // Un número pequeño y fijo de partículas evita cargar la experiencia.
        for (let index = 0; index < 18; index += 1) {
            const flake = document.createElement('span');
            flake.className = 'snowflake';
            flake.style.setProperty('--snow-left', `${(index * 37 + 11) % 100}%`);
            flake.style.setProperty('--snow-size', `${3 + (index % 4)}px`);
            flake.style.setProperty('--snow-opacity', String(.35 + (index % 5) * .1));
            flake.style.setProperty('--snow-duration', `${4 + (index % 5)}s`);
            flake.style.setProperty('--snow-delay', `${(index % 6) * .16}s`);
            flake.style.setProperty('--snow-drift', `${(index % 2 ? 1 : -1) * (12 + index % 28)}px`);
            fragment.append(flake);
        }

        layer.append(fragment);
        document.body.append(layer);
        window.setTimeout(() => layer.remove(), 9500);
    }

    ornament.addEventListener('click', () => {
        taps += 1;
        ornament.classList.add('is-discovering');
        window.clearTimeout(resetTimer);
        resetTimer = window.setTimeout(() => { taps = 0; }, 1800);

        if (taps < 5) return;
        taps = 0;
        makeSnowfall();
        showSecretNote();
    });
})();
