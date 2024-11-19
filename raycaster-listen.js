AFRAME.registerComponent('navigate-on-click', {
    schema: {
        target: { type: 'string' } // Define a `target` attribute for the component
    },
    init: function () {
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
