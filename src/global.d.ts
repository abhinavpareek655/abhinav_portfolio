export {};

import { ReactThreeFiber } from "@react-three/fiber";
import * as THREE from "three";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";

declare module "meshline" {
  export class MeshLineGeometry extends THREE.BufferGeometry {
    setPoints(points: Iterable<THREE.Vector3> | Float32Array): this;
  }
  export class MeshLineMaterial extends THREE.Material {
    lineWidth: number;
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: ReactThreeFiber.Object3DNode<
        MeshLineGeometry,
        typeof MeshLineGeometry
      >;
      meshLineMaterial: ReactThreeFiber.Object3DNode<
        MeshLineMaterial,
        typeof MeshLineMaterial
      >;
    }
  }
}