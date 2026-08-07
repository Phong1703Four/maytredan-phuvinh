import * as THREE from 'three';

export class HotspotManager {
  constructor(camera, container, onClick) {
    this.camera = camera;
    this.container = container;
    this.onClick = onClick;
    
    this.hotspotsData = [];
    this.domElements = [];
  }

  setHotspots(hotspots) {
    // Clear old dom elements
    this.domElements.forEach(el => {
      if (el.parentNode) el.parentNode.removeChild(el);
    });
    this.domElements = [];
    this.hotspotsData = hotspots || [];

    // Create new DOM elements for each hotspot
    this.hotspotsData.forEach((hotspot, index) => {
      const el = document.createElement('div');
      el.className = `vr-hotspot vr-hotspot-${hotspot.type}`;
      el.dataset.index = index;
      
      // Icon depending on type
      let icon = '';
      if (hotspot.type === 'move') icon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m12 16 4-4-4-4"/><path d="M8 12h8"/></svg>`;
      else if (hotspot.type === 'info') icon = `i`;
      else if (hotspot.type === 'video') icon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><circle cx="12" cy="12" r="10"/></svg>`;
      else if (hotspot.type === 'product') icon = `🛒`;
      else icon = `•`;

      el.innerHTML = `
        <div class="vr-hotspot-icon">${icon}</div>
        <div class="vr-hotspot-tooltip">${hotspot.title}</div>
      `;

      el.addEventListener('pointerdown', (e) => {
        // Prevent map dragging when clicking hotspot
        e.stopPropagation();
      });

      el.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.onClick) this.onClick(hotspot);
      });

      this.container.appendChild(el);
      this.domElements.push(el);
    });
  }

  update() {
    if (this.hotspotsData.length === 0) return;

    const widthHalf = 0.5 * this.container.clientWidth;
    const heightHalf = 0.5 * this.container.clientHeight;

    this.hotspotsData.forEach((hotspot, i) => {
      const el = this.domElements[i];
      if (!el) return;

      // Convert yaw/pitch to 3D vector
      const phi = THREE.MathUtils.degToRad(90 - hotspot.pitch);
      const theta = THREE.MathUtils.degToRad(hotspot.yaw);
      
      const vector = new THREE.Vector3();
      vector.setFromSphericalCoords(500, phi, theta);
      
      // Project to 2D screen space
      vector.project(this.camera);

      // Check if behind camera
      if (vector.z > 1) {
        el.style.display = 'none';
        return;
      }

      const x = (vector.x * widthHalf) + widthHalf;
      const y = -(vector.y * heightHalf) + heightHalf;

      el.style.display = 'flex';
      el.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
    });
  }

  dispose() {
    this.domElements.forEach(el => {
      if (el.parentNode) el.parentNode.removeChild(el);
    });
    this.domElements = [];
    this.hotspotsData = [];
  }
}
