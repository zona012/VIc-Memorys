// Utilidades de entrada y revelado progresivo respetando movimiento reducido.
const AnimationEngine = {
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,

    sleep(milliseconds) {
        return new Promise(resolve => {
            window.setTimeout(resolve, this.reducedMotion ? 0 : milliseconds);
        });
    },

    // Un solo temporizador activo evita crear una espera por cada elemento.
    // Si la página se reemplaza durante la secuencia, el revelado se detiene.
    async revealSequence(container) {
        const elements = [...container.querySelectorAll('.reveal')];

        if (this.reducedMotion) {
            elements.forEach(element => element.classList.add('visible'));
            return;
        }

        for (const [index, element] of elements.entries()) {
            if (!container.isConnected || !element.isConnected) return;
            if (index > 0) await this.sleep(90);
            if (!container.isConnected || !element.isConnected) return;
            element.classList.add('visible');
        }
    }
};
