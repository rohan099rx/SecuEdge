"use client";

import { OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo } from "react";
import * as THREE from "three";

export type CameraConfig = {
  position?: [number, number, number];
  target?: [number, number, number];
  fov?: number;
  minDistance?: number;
  maxDistance?: number;
};

export function CameraController({
  camera = {},
  interaction = true,
}: {
  camera?: CameraConfig;
  interaction?: boolean;
}) {
  const { camera: activeCamera, pointer } = useThree();
  const target = useMemo(
    () => new THREE.Vector3(...(camera.target ?? [0, 0, 0])),
    [camera.target],
  );
  const basePosition = camera.position ?? [0, 0.45, 5.4];

  useFrame((_state, delta) => {
    const parallaxX = interaction ? pointer.x * 0.14 : 0;
    const parallaxY = interaction ? pointer.y * 0.08 : 0;
    const nextPosition = new THREE.Vector3(
      basePosition[0] + parallaxX,
      basePosition[1] + parallaxY,
      basePosition[2],
    );
    activeCamera.position.lerp(nextPosition, 1 - Math.exp(-delta * 2.2));
    activeCamera.lookAt(target);
  });

  return (
    <OrbitControls
      enablePan={false}
      enableZoom={interaction}
      enableRotate={interaction}
      enableDamping
      dampingFactor={0.075}
      minDistance={camera.minDistance ?? 3.8}
      maxDistance={camera.maxDistance ?? 7.5}
      minPolarAngle={Math.PI / 2.65}
      maxPolarAngle={Math.PI / 1.7}
      rotateSpeed={0.48}
      zoomSpeed={0.55}
    />
  );
}
