// Easter eggs estacionales: cada secreto se descubre con una interacción distinta.
(() => {
    const ornament = document.getElementById('secret-ornament');
    const form = document.getElementById('secret-form');
    const input = document.getElementById('secret-word');
    const feedback = document.getElementById('secret-feedback');
    if (!ornament || !form || !input || !feedback) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const secretPhrases = {
        comadres: {
            title: 'Código de comadres',
            message: 'Hay amistades que empiezan sin química y terminan convirtiéndose en una historia propia. Esta es una de esas.'
        },
        ranita: {
            title: 'El archivo anfibio',
            message: 'Una ranita, un recuerdo y un lugar asegurado en el museo de incidentes. Algunas leyendas nunca desaparecen.'
        }
    };
    let taps = 0;
    let resetTimer;

    function showSecretNote(title, message) {
        if (typeof Scrapbook !== 'undefined' && Scrapbook.modal.classList.contains('hidden')) {
            Scrapbook.openModal(title, message);
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

    // El formulario funciona tanto con el botón como con Enter en el teclado móvil.
    form.addEventListener('submit', event => {
        event.preventDefault();
        const phrase = input.value.trim().toLocaleLowerCase('es');

        if (!phrase) {
            feedback.textContent = 'Escribe una palabra para probar.';
            input.focus();
            return;
        }

        const secret = secretPhrases[phrase];
        if (!secret) {
            feedback.textContent = 'Esa palabra no abrió ningún secreto. Prueba otra.';
            input.select();
            return;
        }

        feedback.textContent = 'Encontraste algo escondido.';
        input.value = '';
        showSecretNote(secret.title, secret.message);
    });

    // Secreto navideño: cinco pulsaciones rápidas sobre el adorno.
    ornament.addEventListener('click', () => {
        taps += 1;
        ornament.classList.add('is-discovering');
        window.clearTimeout(resetTimer);
        resetTimer = window.setTimeout(() => { taps = 0; }, 1800);

        if (taps < 5) return;
        taps = 0;
        makeSnowfall();
        showSecretNote(
            'Un secreto de diciembre',
            'Encontraste el pequeño secreto navideño. Que nunca falten las sorpresas, las risas y los recuerdos que merecen quedarse.'
        );
    });
})();
