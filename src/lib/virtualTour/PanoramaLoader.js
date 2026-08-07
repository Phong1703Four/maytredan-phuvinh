import * as THREE from 'three';

export class PanoramaLoader {
  constructor(textureCache) {
    this.loader = new THREE.TextureLoader();
    this.loader.setCrossOrigin('anonymous');
    this.cache = textureCache;
  }

  async loadTexture(url) {
    const cached = this.cache.get(url);
    if (cached) return cached;

    return new Promise((resolve, reject) => {
      this.loader.load(
        url,
        (texture) => {
          texture.colorSpace = THREE.SRGBColorSpace;
          texture.minFilter = THREE.LinearFilter;
          texture.generateMipmaps = false;
          
          this.cache.set(url, texture);
          resolve(texture);
        },
        undefined,
        (error) => reject(error)
      );
    });
  }
}
