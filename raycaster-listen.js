AFRAME.registerComponent('navigate-on-click', {
    schema: {
        target: { type: 'string' }, // Target URL
        hoverColor: { type: 'color', default: 'yellow' } // Hover color
    },
    init: function () {
        this.originalColors = new Map(); // Store original material colors or textures

        // Handle primitive geometries or models
        this.storeOriginalProperties();

        // Change material color on hover
        this.el.addEventListener('mouseenter', () => {
            const mesh = this.el.getObject3D('mesh');
            if (mesh) {
                mesh.traverse((node) => {
                    if (node.isMesh) {
                        // Store the original color if not already stored
                        if (!this.originalColors.has(node)) {
                            this.originalColors.set(
                                node,
                                node.material.color ? node.material.color.clone() : null
                            );
                        }
                        // Change color to hover color
                        if (node.material.color) {
                            node.material.color.set(this.data.hoverColor);
                        }
                    }
                });
            }
        });

        // Revert material color on mouse leave
        this.el.addEventListener('mouseleave', () => {
            const mesh = this.el.getObject3D('mesh');
            if (mesh) {
                mesh.traverse((node) => {
                    if (node.isMesh) {
                        const originalColor = this.originalColors.get(node);
                        if (originalColor) {
                            // Restore original color
                            node.material.color.copy(originalColor);
                        }
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
    },
    storeOriginalProperties: function () {
        // For primitives, the mesh is immediately available
        const mesh = this.el.getObject3D('mesh');
        if (mesh) {
            mesh.traverse((node) => {
                if (node.isMesh && node.material.color) {
                    this.originalColors.set(node, node.material.color.clone());
                }
            });
        }

        // For models, wait for the `model-loaded` event
        this.el.addEventListener('model-loaded', () => {
            const mesh = this.el.getObject3D('mesh');
            if (mesh) {
                mesh.traverse((node) => {
                    if (node.isMesh && node.material.color) {
                        this.originalColors.set(node, node.material.color.clone());
                    }
                });
            }
        });
    }
});
