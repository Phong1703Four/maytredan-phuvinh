import * as THREE from 'three';

export class SceneManager {
  constructor(scene) {
    this.scene = scene;
    
    // Create dual spheres for crossfading
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    // Invert geometry so we see inside
    geometry.scale(-1, 1, 1);
    
    this.sphere1 = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ transparent: true, opacity: 1 }));
    this.sphere2 = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 }));
    
    this.scene.add(this.sphere1);
    this.scene.add(this.sphere2);
    
    this.activeSphere = this.sphere1;
    this.idleSphere = this.sphere2;
  }

  swapSpheres() {
    const temp = this.activeSphere;
    this.activeSphere = this.idleSphere;
    this.idleSphere = temp;
  }

  dispose() {
    this.sphere1.geometry.dispose();
    this.sphere1.material.dispose();
    this.sphere2.material.dispose();
    this.scene.remove(this.sphere1, this.sphere2);
  }
}
