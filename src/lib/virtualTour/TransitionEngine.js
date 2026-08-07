export class TransitionEngine {
  constructor(sceneManager) {
    this.sceneManager = sceneManager;
    this.isTransitioning = false;
    this.transitionSpeed = 0.05; // ~300ms at 60fps
    this.onComplete = null;
  }

  async transitionTo(texture, onHalfway) {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    
    // Prepare idle sphere with new texture
    this.sceneManager.idleSphere.material.map = texture;
    this.sceneManager.idleSphere.material.needsUpdate = true;
    this.sceneManager.idleSphere.material.opacity = 0;
    
    // Trigger halfway callback (e.g., to update hotspots and data)
    if (onHalfway) onHalfway();
    
    return new Promise(resolve => {
      this.onComplete = resolve;
    });
  }

  update() {
    if (!this.isTransitioning) return;
    
    const active = this.sceneManager.activeSphere.material;
    const idle = this.sceneManager.idleSphere.material;
    
    idle.opacity += this.transitionSpeed;
    active.opacity -= this.transitionSpeed;
    
    if (idle.opacity >= 1) {
      idle.opacity = 1;
      active.opacity = 0;
      this.isTransitioning = false;
      this.sceneManager.swapSpheres();
      
      if (this.onComplete) {
        this.onComplete();
        this.onComplete = null;
      }
    }
  }
}
