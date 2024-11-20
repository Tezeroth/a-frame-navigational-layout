AFRAME.registerComponent('navigate-on-click', {
    schema: {
        target: { type: 'string' }, // Target URL
        hoverColor: { type: 'color', default: 'yellow' } // Hover color
    },
    init: function () {
        let originalColors = [];

        // Store original material colors
        this.el.addEventListener('model-loaded', () => {
            const mesh = this.el.getObject3D('mesh');
            if (mesh) {
                mesh.traverse((node) => {
                    if (node.isMesh) {
                        if (node.material.color) {
                            originalColors.push(node.material.color.clone());
                        }
                    }
                });
            }
        });

        // Change material color on hover
        this.el.addEventListener('mouseenter', () => {
            const mesh = this.el.getObject3D('mesh');
            if (mesh) {
                let i = 0;
                mesh.traverse((node) => {
                    if (node.isMesh && node.material.color) {
                        node.material.color.set(this.data.hoverColor);
                    }
                });
            }
        });

        // Revert material color on mouse leave
        this.el.addEventListener('mouseleave', () => {
            const mesh = this.el.getObject3D('mesh');
            if (mesh) {
                let i = 0;
                mesh.traverse((node) => {
                    if (node.isMesh && node.material.color) {
                        node.material.color.copy(originalColors[i]);
                        i++;
                    }
                });
            }
        });

        // Handle navigation on click
        this.el.addEventListener('click', () => {
            if (this.data.target) {
                console.log(`Navigating to: ${this.data.target}`);
                window.location.href = this.data.target;
            } else {
                console.warn('No target URL specified for navigation.');
            }
        });
    }
});
