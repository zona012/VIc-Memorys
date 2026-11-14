// Utilidades de entrada y revelado progresivo respetando movimiento reducido.
const AnimationEngine = {
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,

    sleep(milliseconds) {
        return new Promise(resolve => {
            window.setTimeout(resolve, this.reducedMotion ? 0 : milliseconds);
        });
    },

    // Agrupa elementos en siete tandas: como máximo seis esperas por página.
    // Si la página se reemplaza, la secuencia anterior se detiene.
    async revealSequence(container) {
        const elements = [...container.querySelectorAll('.reveal')];

        if (this.reducedMotion) {
            elements.forEach(element => element.classList.add('visible'));
            return;
        }

        for (let batch = 0; batch <= 6; batch += 1) {
            if (!container.isConnected) return;
            elements.forEach((element, index) => {
                if (Math.min(index, 6) === batch) element.classList.add('visible');
            });
            if (batch < 6 && elements.length > 0) await this.sleep(90);
        }
    }
};
