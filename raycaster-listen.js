AFRAME.registerComponent('navigate-on-click', {
    schema: {
        target: { type: 'string' }, // Target scene URL
        hoverColor: { type: 'color', default: 'yellow' } // Color when hovered
    },
    init: function () {
        const originalColor = this.el.getAttribute('material')?.color || ''; // Save the original color

        // Change color on hover
        this.el.addEventListener('mouseenter', () => {
            this.el.setAttribute('material', 'color', this.data.hoverColor);
        });

        // Revert to original color when not hovered
        this.el.addEventListener('mouseleave', () => {
            this.el.setAttribute('material', 'color', originalColor);
        });

        // Handle click to navigate
        this.el.addEventListener('click', () => {
            const targetUrl = this.data.target;
            if (targetUrl) {
                console.log(`Navigating to: ${targetUrl}`);
                window.location.href = targetUrl;
            } else {
                console.warn('No target URL specified for navigation.');
            }
        });
    }
});