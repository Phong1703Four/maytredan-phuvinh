export class TextureCache {
  constructor(maxSize = 10) {
    this.maxSize = maxSize;
    this.cache = new Map(); // key -> { texture, timestamp }
  }

  get(key) {
    if (this.cache.has(key)) {
      const item = this.cache.get(key);
      item.timestamp = Date.now(); // update access time
      return item.texture;
    }
    return null;
  }

  set(key, texture) {
    if (this.cache.size >= this.maxSize) {
      this._evictOldest();
    }
    this.cache.set(key, { texture, timestamp: Date.now() });
  }

  _evictOldest() {
    let oldestKey = null;
    let oldestTime = Infinity;
    
    for (const [key, item] of this.cache.entries()) {
      if (item.timestamp < oldestTime) {
        oldestTime = item.timestamp;
        oldestKey = key;
      }
    }
    
    if (oldestKey) {
      const item = this.cache.get(oldestKey);
      item.texture.dispose(); // Free GPU memory
      this.cache.delete(oldestKey);
    }
  }

  clear() {
    for (const item of this.cache.values()) {
      item.texture.dispose();
    }
    this.cache.clear();
  }
}
