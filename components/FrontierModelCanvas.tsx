"use client";

import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { ProductModel } from "@/components/3d/ProductModel";

export function FrontierModelCanvas({ active, reducedMotion, rotating, viewCommand, zoomCommand }: {
  active: boolean;
  reducedMotion: boolean;
  rotating: boolean;
  viewCommand: "front" | "rear" | null;
  zoomCommand: number;
}) {
  const controls = useRef<OrbitControlsImpl>(null);
  const mobile = useMemo(() => typeof window !== "undefined" && window.matchMedia("(max-width: 700px)").matches, []);

  useEffect(() => {
    if (!controls.current || !viewCommand) return;
    controls.current.setAzimuthalAngle(viewCommand === "front" ? 0 : Math.PI);
    controls.current.setPolarAngle(Math.PI / 2.35);
    controls.current.update();
  }, [viewCommand]);

  useEffect(() => {
    if (!controls.current || zoomCommand === 0) return;
    if (zoomCommand < 0) controls.current.dollyIn(1.18);
    else controls.current.dollyOut(1.18);
    controls.current.update();
  }, [zoomCommand]);

  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      shadows={!mobile}
      dpr={mobile ? [1, 1.25] : [1, 1.65]}
      gl={{ alpha: true, antialias: !mobile, powerPreference: mobile ? "low-power" : "high-performance" }}
      camera={{ position: [0, 0.42, 5.5], fov: mobile ? 39 : 35, near: 0.1, far: 24 }}
    >
      <ambientLight intensity={0.66} color="#e8f4ff" />
      <directionalLight castShadow={!mobile} position={[4.2, 5, 4]} intensity={1.35} color="#f4faff" />
      <directionalLight position={[-4, 1.6, -3]} intensity={0.9} color="#7ebfe9" />
      <Environment preset="city" background={false} />
      <ProductModel isMobile={mobile} />
      {!mobile ? <ContactShadows position={[0, -0.82, 0]} opacity={0.28} blur={2} far={4} scale={6} color="#51758a" /> : null}
      <OrbitControls
        ref={controls}
        enablePan={false}
        enableZoom
        enableRotate
        enableDamping
        dampingFactor={0.08}
        autoRotate={rotating && !reducedMotion}
        autoRotateSpeed={0.62}
        minDistance={3.6}
        maxDistance={7.8}
        minPolarAngle={Math.PI / 2.7}
        maxPolarAngle={Math.PI / 1.65}
      />
    </Canvas>
  );
}
