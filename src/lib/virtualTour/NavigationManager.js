import * as THREE from 'three';

export class NavigationManager {
  constructor(camera, domElement) {
    this.camera = camera;
    this.domElement = domElement;
    
    this.isUserInteracting = false;
    this.lastPointerX = 0;
    this.lastPointerY = 0;
    this.lon = 0;
    this.lat = 0;
    this.phi = 0;
    this.theta = 0;

    // Zoom
    this.fov = camera.fov;
    this.minFov = 20;
    this.maxFov = 100;

    // Bind event listeners
    this.onPointerDown = this.onPointerDown.bind(this);
    this.onPointerMove = this.onPointerMove.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);
    this.onDocumentMouseWheel = this.onDocumentMouseWheel.bind(this);
    
    // Use passive: false so we can preventDefault for scrolling on mobile
    this.domElement.addEventListener('pointerdown', this.onPointerDown, { passive: false });
    this.domElement.addEventListener('pointermove', this.onPointerMove, { passive: false });
    this.domElement.addEventListener('pointerup', this.onPointerUp, { passive: false });
    this.domElement.addEventListener('pointercancel', this.onPointerUp, { passive: false });
    this.domElement.addEventListener('pointerleave', this.onPointerUp, { passive: false });
    this.domElement.addEventListener('wheel', this.onDocumentMouseWheel, { passive: false });

    // Initial camera target
    this.update();
  }

  setCameraView(yaw, pitch, fov) {
    this.lon = yaw;
    this.lat = pitch;
    if (fov) this.setFov(fov);
    this.update();
  }
  
  setFov(newFov) {
    this.fov = Math.max(this.minFov, Math.min(this.maxFov, newFov));
    this.camera.fov = this.fov;
    this.camera.updateProjectionMatrix();
  }

  onPointerDown(event) {
    if (!event.isPrimary) return;
    this.isUserInteracting = true;
    this.lastPointerX = event.clientX;
    this.lastPointerY = event.clientY;
    try {
      this.domElement.setPointerCapture(event.pointerId);
    } catch (e) {}
  }

  onPointerMove(event) {
    if (!event.isPrimary || !this.isUserInteracting) return;
    event.preventDefault(); // Prevent touch scrolling on mobile
    
    const factor = this.fov / 75; // Adjust sensitivity based on zoom
    
    const deltaX = event.clientX - this.lastPointerX;
    const deltaY = event.clientY - this.lastPointerY;
    
    // Drag left (deltaX < 0) -> turn left (lon decreases) -> world moves left (relative to mouse)
    this.lon += deltaX * 0.1 * factor;
    // Drag up (deltaY < 0) -> look up (lat increases) -> world moves up (relative to mouse)
    this.lat -= deltaY * 0.1 * factor;
    
    this.lastPointerX = event.clientX;
    this.lastPointerY = event.clientY;
  }

  onPointerUp(event) {
    if (!event.isPrimary) return;
    this.isUserInteracting = false;
    try {
      this.domElement.releasePointerCapture(event.pointerId);
    } catch (e) {}
  }

  onDocumentMouseWheel(event) {
    event.preventDefault(); // Prevent page scrolling while zooming
    this.setFov(this.fov + event.deltaY * 0.05);
  }

  update() {
    // Clamp pitch (lat) to avoid flipping the camera
    this.lat = Math.max(-85, Math.min(85, this.lat));
    
    // Normalize yaw (lon) to avoid huge floating point values over time
    this.lon = this.lon % 360;
    if (this.lon < 0) this.lon += 360;

    this.phi = THREE.MathUtils.degToRad(90 - this.lat);
    this.theta = THREE.MathUtils.degToRad(this.lon);

    const x = 500 * Math.sin(this.phi) * Math.cos(this.theta);
    const y = 500 * Math.cos(this.phi);
    const z = 500 * Math.sin(this.phi) * Math.sin(this.theta);

    this.camera.lookAt(x, y, z);
  }

  dispose() {
    this.domElement.removeEventListener('pointerdown', this.onPointerDown);
    this.domElement.removeEventListener('pointermove', this.onPointerMove);
    this.domElement.removeEventListener('pointerup', this.onPointerUp);
    this.domElement.removeEventListener('pointercancel', this.onPointerUp);
    this.domElement.removeEventListener('pointerleave', this.onPointerUp);
    this.domElement.removeEventListener('wheel', this.onDocumentMouseWheel);
  }
}
