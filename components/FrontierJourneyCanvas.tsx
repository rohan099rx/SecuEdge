"use client";

import { ContactShadows, Environment } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { ProductModel } from "@/components/3d/ProductModel";

function angleAt(progress: number) {
  const points: Array<[number, number]> = [[0, -0.24], [0.2, 0.05], [0.43, 0.92], [0.68, 1.7], [0.86, 2.45], [1, 2.82]];
  const next = points.findIndex(([at]) => at >= progress);
  if (next <= 0) return points[0][1];
  const [from, fromAngle] = points[next - 1];
  const [to, toAngle] = points[next];
  const local = THREE.MathUtils.clamp((progress - from) / (to - from), 0, 1);
  return THREE.MathUtils.lerp(fromAngle, toAngle, local);
}

function Hardware({ progressRef, reducedMotion }: { progressRef: React.MutableRefObject<number>; reducedMotion: boolean }) {
  const product = useRef<THREE.Group>(null);
  const { pointer } = useThree();
  const pointerTarget = useMemo(() => new THREE.Vector2(), []);

  useFrame((state, delta) => {
    if (!product.current) return;
    const progress = progressRef.current;
    pointerTarget.set(pointer.x * 0.16, pointer.y * 0.1);
    const scrollAngle = angleAt(progress);
    const idleAngle = reducedMotion ? 0 : Math.sin(state.clock.elapsedTime * 0.32) * 0.035;
    product.current.rotation.y = THREE.MathUtils.damp(product.current.rotation.y, scrollAngle + idleAngle + pointerTarget.x, 3.2, delta);
    product.current.rotation.x = THREE.MathUtils.damp(product.current.rotation.x, 0.055 + pointerTarget.y, 3.2, delta);
    const zoom = 0.92 + Math.sin(progress * Math.PI) * 0.045;
    const scale = THREE.MathUtils.damp(product.current.scale.x, zoom, 3.2, delta);
    product.current.scale.setScalar(scale);
    product.current.position.y = THREE.MathUtils.damp(product.current.position.y, -0.12 + progress * 0.12, 3.2, delta);
  });

  return <group ref={product} position={[0, -0.12, 0]} rotation={[0.055, -0.24, 0]} scale={0.92}>
    <ProductModel isMobile={false} />
  </group>;
}

export function FrontierJourneyCanvas({ progressRef, reducedMotion, active }: { progressRef: React.MutableRefObject<number>; reducedMotion: boolean; active: boolean }) {
  const mobile = useMemo(() => typeof window !== "undefined" && window.matchMedia("(max-width: 700px)").matches, []);
  const lowPower = useMemo(() => typeof navigator !== "undefined" && navigator.hardwareConcurrency <= 4, []);
  const dpr: [number, number] = mobile || lowPower ? [1, 1.25] : [1, 1.65];

  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      shadows={!mobile && !lowPower}
      dpr={dpr}
      gl={{ alpha: true, antialias: !mobile, powerPreference: mobile || lowPower ? "low-power" : "high-performance" }}
      camera={{ position: [0, 0.52, mobile ? 7.05 : 6.05], fov: mobile ? 39 : 34, near: 0.1, far: 30 }}
    >
      <ambientLight intensity={0.68} color="#e8f4ff" />
      <directionalLight castShadow={!mobile && !lowPower} position={[4.6, 5.2, 4]} intensity={1.45} color="#f5fbff" />
      <directionalLight position={[-4, 1.8, -3]} intensity={0.95} color="#79bce8" />
      <pointLight position={[1.5, 2.4, 2.7]} intensity={0.38} color="#d9efff" />
      <Environment preset="city" background={false} />
      <Hardware progressRef={progressRef} reducedMotion={reducedMotion} />
      {!mobile && !lowPower ? <ContactShadows position={[0, -0.9, 0]} opacity={0.3} blur={2.2} far={4.2} scale={6.3} color="#51758a" /> : null}
    </Canvas>
  );
}
