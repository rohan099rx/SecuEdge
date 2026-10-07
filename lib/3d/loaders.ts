import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import type * as THREE from "three";

export function createGLTFLoader() {
  return new GLTFLoader();
}

export async function loadGLTF(url: string) {
  return new Promise<THREE.Object3D>((resolve, reject) => {
    const loader = createGLTFLoader();
    loader.load(
      url,
      (gltf) => resolve(gltf.scene),
      undefined,
      (error) => reject(error),
    );
  });
}

export const productModelPath = "/models/products/frontier.glb";
