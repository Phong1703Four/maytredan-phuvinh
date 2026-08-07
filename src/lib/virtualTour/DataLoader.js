import { TextureCache } from './TextureCache';
import { PanoramaLoader } from './PanoramaLoader';

export class DataLoader {
  constructor() {
    this.tourData = null;
    this.textureCache = new TextureCache(10);
    this.panoramaLoader = new PanoramaLoader(this.textureCache);
  }

  async loadTourData(jsonUrl) {
    const res = await fetch(jsonUrl);
    if (!res.ok) throw new Error('Failed to load tour data');
    this.tourData = await res.json();
    return this.tourData;
  }

  getNode(nodeId) {
    if (!this.tourData) return null;
    return this.tourData.nodes[nodeId];
  }

  getStartNode() {
    if (!this.tourData) return null;
    return this.tourData.startNode;
  }

  async getTexture(imageUrl) {
    return this.panoramaLoader.loadTexture(imageUrl);
  }
}
