import * as THREE from 'three';
import { SceneManager } from './SceneManager';
import { NavigationManager } from './NavigationManager';
import { TransitionEngine } from './TransitionEngine';
import { PerformanceManager } from './PerformanceManager';
import { HotspotManager } from './HotspotManager';

export class VREngine {
  constructor(container, dataLoader, callbacks = {}) {
    this.container = container;
    this.dataLoader = dataLoader;
    this.callbacks = callbacks; // onNodeChanged, onHotspotClick, etc.
    
    // Core Three.js setup
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });
    
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(this.renderer.domElement);

    // Initialize Subsystems
    this.performanceManager = new PerformanceManager(this.renderer);
    this.sceneManager = new SceneManager(this.scene);
    this.transitionEngine = new TransitionEngine(this.sceneManager);
    this.navigationManager = new NavigationManager(this.camera, container);
    this.hotspotManager = new HotspotManager(this.camera, container, callbacks.onHotspotClick);

    this.currentNode = null;
    this.isRunning = false;

    // Bind methods
    this.animate = this.animate.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);

    window.addEventListener('resize', this.onWindowResize);
  }

  async loadNode(nodeId) {
    if (this.currentNode === nodeId) return;
    
    const node = this.dataLoader.getNode(nodeId);
    if (!node) return;
    
    this.callbacks.onLoading?.(true);
    
    // Preload texture
    const texture = await this.dataLoader.getTexture(node.image);
    
    // Transition to new node
    await this.transitionEngine.transitionTo(texture, () => {
      this.currentNode = nodeId;
      this.callbacks.onNodeChanged?.(node);
      
      // Update hotspots
      this.hotspotManager.setHotspots(node.hotspots);
      
      // Set initial view if available
      if (node.initialView) {
        this.navigationManager.setCameraView(node.initialView.yaw, node.initialView.pitch, node.initialView.fov);
      }
    });

    this.callbacks.onLoading?.(false);
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.animate();
  }

  stop() {
    this.isRunning = false;
  }

  animate(time) {
    if (!this.isRunning) return;
    requestAnimationFrame(this.animate);
    
    this.navigationManager.update();
    this.transitionEngine.update();
    this.hotspotManager.update();
    
    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    if (!this.container) return;
    this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
  }

  dispose() {
    this.stop();
    window.removeEventListener('resize', this.onWindowResize);
    this.sceneManager.dispose();
    this.navigationManager.dispose();
    this.hotspotManager.dispose();
    if (this.container && this.renderer.domElement.parentNode) {
      this.container.removeChild(this.renderer.domElement);
    }
    this.renderer.dispose();
  }
}
