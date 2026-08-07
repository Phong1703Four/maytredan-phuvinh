export class PerformanceManager {
  constructor(renderer) {
    this.renderer = renderer;
    this.devicePixelRatio = window.devicePixelRatio || 1;
    this.setAdaptivePixelRatio();
  }

  setAdaptivePixelRatio() {
    // If mobile or low power, cap pixel ratio to 1
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const pixelRatio = isMobile ? Math.min(this.devicePixelRatio, 1.5) : Math.min(this.devicePixelRatio, 2);
    this.renderer.setPixelRatio(pixelRatio);
  }
}
