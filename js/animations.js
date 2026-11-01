// Utilidades de entrada y revelado progresivo respetando movimiento reducido.
const AnimationEngine = {
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,

    sleep(milliseconds) {
        return new Promise(resolve => {
            window.setTimeout(resolve, this.reducedMotion ? 0 : milliseconds);
        });
    },

    async revealSequence(container) {
        const elements = [...container.querySelectorAll('.reveal')];

        await Promise.all(elements.map(async (element, index) => {
            await this.sleep(Math.min(index * 90, 540));
            element.classList.add('visible');
        }));
    }
};
