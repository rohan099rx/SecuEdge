"use client";

import dynamic from "next/dynamic";
import { ContactShadows } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { materialPalette } from "@/lib/3d/materials";
import {
  getCanvasSettings,
  getDeviceProfile,
  prefersReducedMotion,
  supportsWebGL,
} from "@/lib/3d/performance";
import type { CameraConfig } from "./CameraController";
import type { LightingConfig } from "./Lighting";
import { FEATURE_COPY, type ProductFeature } from "./ProductModel";

gsap.registerPlugin(ScrollTrigger);

const CameraController = dynamic(
  () => import("./CameraController").then((module) => module.CameraController),
  { ssr: false, loading: () => null },
);
const Lighting = dynamic(
  () => import("./Lighting").then((module) => module.Lighting),
  { ssr: false, loading: () => null },
);
const EnvironmentRig = dynamic(
  () => import("./Environment").then((module) => module.EnvironmentRig),
  { ssr: false, loading: () => null },
);
const ProductModel = dynamic(
  () => import("./ProductModel").then((module) => module.ProductModel),
  { ssr: false, loading: () => null },
);
const NetworkTopology = dynamic(
  () => import("./NetworkTopology").then((module) => module.NetworkTopology),
  { ssr: false, loading: () => null },
);

export type ProductExperienceProps = {
  model?: string;
  position?: [number, number, number];
  scale?: number | [number, number, number];
  rotation?: [number, number, number];
  camera?: CameraConfig;
  interaction?: boolean;
  lighting?: LightingConfig;
  topology?: boolean;
  transparent?: boolean;
  className?: string;
};

function SceneFallback() {
  return (
    <div className="product-experience__loading" role="status">
      <span className="status-mark" />
      Loading Frontier hardware
    </div>
  );
}

function WebGLFallback({ className }: { className?: string }) {
  return (
    <div className={`product-experience__fallback ${className ?? ""}`}>
      <span className="tech-label">Interactive hardware view</span>
      <strong>3D preview unavailable on this device.</strong>
      <p>Product specifications remain available below.</p>
    </div>
  );
}

export function SecuEdgeScene({
  model,
  position = [0, -0.18, 0],
  scale = 1,
  rotation = [0, 0, 0],
  camera = {},
  interaction = true,
  lighting = {},
  topology = false,
  transparent = false,
  className = "",
}: ProductExperienceProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const deviceProfile = useMemo(() => getDeviceProfile(), []);
  const settings = useMemo(() => getCanvasSettings(), []);
  const reducedMotion = useMemo(() => prefersReducedMotion(), []);
  const [selectedFeature, setSelectedFeature] = useState<ProductFeature | null>(null);

  useEffect(() => {
    if (!containerRef.current || reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0.7, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  if (!supportsWebGL()) {
    return <WebGLFallback className={className} />;
  }

  return (
    <div ref={containerRef} className={`product-experience ${className}`}>
      <div className="product-experience__hud" aria-hidden="true">
        <span><i className="status-mark" /> Hardware interface / SE-series</span>
        <span>FRONTIER · 01</span>
      </div>
      <div className="product-experience__canvas">
        <Canvas
          shadows={settings.shadows}
          dpr={settings.dpr}
          gl={{ antialias: settings.antialias, powerPreference: settings.powerPreference, alpha: transparent }}
          camera={{
            position: camera.position ?? [0, 0.45, 5.4],
            fov: camera.fov ?? 34,
            near: 0.1,
            far: 30,
          }}
        >
          {transparent ? null : <color attach="background" args={[materialPalette.background]} />}
          <fog attach="fog" args={[materialPalette.background, 6.5, 18]} />
          <Suspense fallback={<SceneFallback />}>
            <CameraController camera={camera} interaction={interaction} />
            <Lighting reducedMotion={reducedMotion} lighting={lighting} />
            <EnvironmentRig />
            {topology ? (
              <NetworkTopology simplified={deviceProfile === "mobile" || deviceProfile === "low-power"} />
            ) : null}
            <ProductModel
              model={model}
              position={position}
              scale={scale}
              rotation={rotation}
              isMobile={deviceProfile === "mobile" || deviceProfile === "low-power"}
              onFeatureSelect={setSelectedFeature}
            />
            <ContactShadows
              position={[0, -0.58, 0]}
              opacity={0.48}
              blur={2.2}
              far={4.5}
              scale={6.5}
              color="#02060b"
            />
          </Suspense>
        </Canvas>
      </div>
      <div className="product-experience__hint">
        <span>Drag to rotate</span>
        <span>Scroll to zoom</span>
        <span>Click a component</span>
      </div>
      {selectedFeature ? (
        <button
          type="button"
          className="product-experience__info"
          onClick={() => setSelectedFeature(null)}
          aria-label={`Close ${selectedFeature} information`}
        >
          <span className="tech-label">{selectedFeature.replace("-", " ")}</span>
          <strong>{FEATURE_COPY[selectedFeature]}</strong>
          <small>Click to dismiss</small>
        </button>
      ) : null}
    </div>
  );
}

export default SecuEdgeScene;
