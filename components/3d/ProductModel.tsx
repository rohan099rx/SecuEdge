"use client";

import { useGLTF } from "@react-three/drei";
import { useMemo, useState } from "react";

import { materialPalette } from "@/lib/3d/materials";

export type ProductFeature =
  | "front-panel"
  | "ethernet"
  | "sfp"
  | "status"
  | "ventilation"
  | "power";

export type ProductModelProps = {
  model?: string;
  position?: [number, number, number];
  scale?: number | [number, number, number];
  rotation?: [number, number, number];
  isMobile?: boolean;
  onFeatureSelect?: (feature: ProductFeature) => void;
};

const FEATURE_COPY: Record<ProductFeature, string> = {
  "front-panel": "Front control panel with a restrained status display and SecuEdge Frontier identification.",
  ethernet: "Copper Ethernet interfaces for LAN, WAN and segmented network deployments. Official port count pending.",
  sfp: "SFP uplinks for fiber connectivity and edge aggregation. Official port count pending.",
  status: "Per-port link and activity indicators make the operating state visible at a glance.",
  ventilation: "Front-to-back ventilation keeps the appliance ready for continuous edge operation.",
  power: "Dedicated power input area with a system status indicator.",
};

function InteractiveGroup({
  feature,
  children,
  activeFeature,
  onFeatureSelect,
}: {
  feature: ProductFeature;
  children: React.ReactNode;
  activeFeature: ProductFeature | null;
  onFeatureSelect?: (feature: ProductFeature) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const active = hovered || activeFeature === feature;

  return (
    <group
      onPointerOver={(event) => {
        event.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={(event) => {
        event.stopPropagation();
        setHovered(false);
      }}
      onClick={(event) => {
        event.stopPropagation();
        onFeatureSelect?.(feature);
      }}
      onPointerDown={(event) => {
        event.stopPropagation();
        onFeatureSelect?.(feature);
      }}
      scale={active ? 1.025 : 1}
    >
      {children}
    </group>
  );
}

function FeatureMaterial({
  color,
  active,
  metalness = 0.2,
  roughness = 0.45,
  emissive,
}: {
  color: string;
  active?: boolean;
  metalness?: number;
  roughness?: number;
  emissive?: string;
}) {
  return (
    <meshStandardMaterial
      color={active ? "#6fbeff" : color}
      metalness={metalness}
      roughness={roughness}
      emissive={emissive ?? (active ? "#143f6e" : "#000000")}
      emissiveIntensity={active ? 0.6 : 0}
    />
  );
}

function ProceduralFrontierModel({
  position = [0, 0, 0],
  scale = 1,
  rotation = [0, 0, 0],
  onFeatureSelect,
}: Omit<ProductModelProps, "model">) {
  const [activeFeature, setActiveFeature] = useState<ProductFeature | null>(null);
  const frontZ = 1.05;
  const portCount = 8;
  const portXs = useMemo(
    () => Array.from({ length: portCount }, (_, index) => (index - (portCount - 1) / 2) * 0.2),
    [portCount],
  );

  const selectFeature = (feature: ProductFeature) => {
    setActiveFeature(feature);
    onFeatureSelect?.(feature);
  };

  return (
    <group position={position} scale={scale} rotation={rotation} dispose={null}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[3.8, 0.58, 2.2]} />
        <FeatureMaterial color={materialPalette.panel} metalness={0.88} roughness={0.28} active={activeFeature === "front-panel"} />
      </mesh>

      <mesh position={[0, 0.34, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.72, 0.1, 2.12]} />
        <FeatureMaterial color="#2a3442" metalness={0.9} roughness={0.34} />
      </mesh>

      <mesh position={[0, -0.34, 0]} receiveShadow>
        <boxGeometry args={[3.7, 0.08, 2.08]} />
        <FeatureMaterial color="#121b27" metalness={0.82} roughness={0.4} />
      </mesh>

      <InteractiveGroup feature="front-panel" activeFeature={activeFeature} onFeatureSelect={selectFeature}>
        <mesh position={[0, 0, frontZ + 0.035]} castShadow>
          <boxGeometry args={[3.58, 0.42, 0.08]} />
          <FeatureMaterial color="#1b2633" metalness={0.62} roughness={0.38} />
        </mesh>
        <mesh position={[-1.43, 0.02, frontZ + 0.085]}>
          <boxGeometry args={[0.54, 0.23, 0.018]} />
          <meshStandardMaterial color="#07101b" metalness={0.2} roughness={0.34} />
        </mesh>
        <mesh position={[-1.43, 0.02, frontZ + 0.1]}>
          <planeGeometry args={[0.42, 0.03]} />
          <meshStandardMaterial color="#7dcfff" emissive="#286e9e" emissiveIntensity={0.45} />
        </mesh>
        <mesh position={[-1.43, -0.08, frontZ + 0.1]}>
          <planeGeometry args={[0.28, 0.012]} />
          <meshStandardMaterial color="#8090a4" />
        </mesh>
        <mesh position={[1.18, 0.03, frontZ + 0.1]}>
          <boxGeometry args={[0.78, 0.08, 0.02]} />
          <meshStandardMaterial color="#d9e7f5" metalness={0.1} roughness={0.28} />
        </mesh>
        <mesh position={[1.18, -0.08, frontZ + 0.1]}>
          <boxGeometry args={[0.5, 0.018, 0.02]} />
          <meshStandardMaterial color="#718197" />
        </mesh>
      </InteractiveGroup>

      <InteractiveGroup feature="ethernet" activeFeature={activeFeature} onFeatureSelect={selectFeature}>
        {portXs.map((x) => (
          <group key={x} position={[x + 0.32, -0.04, frontZ + 0.11]}>
            <mesh>
              <boxGeometry args={[0.15, 0.16, 0.07]} />
              <FeatureMaterial color="#070c12" metalness={0.55} roughness={0.35} active={activeFeature === "ethernet"} />
            </mesh>
            <mesh position={[0, 0.07, 0.045]}>
              <boxGeometry args={[0.025, 0.018, 0.012]} />
              <meshStandardMaterial color="#71d9ad" emissive="#2b9d70" emissiveIntensity={0.7} />
            </mesh>
          </group>
        ))}
      </InteractiveGroup>

      <InteractiveGroup feature="sfp" activeFeature={activeFeature} onFeatureSelect={selectFeature}>
        {[-0.77, -0.57].map((x) => (
          <mesh key={x} position={[x, -0.04, frontZ + 0.12]}>
            <boxGeometry args={[0.16, 0.18, 0.08]} />
            <FeatureMaterial color="#070c12" metalness={0.6} roughness={0.3} active={activeFeature === "sfp"} />
          </mesh>
        ))}
      </InteractiveGroup>

      <InteractiveGroup feature="status" activeFeature={activeFeature} onFeatureSelect={selectFeature}>
        {[1.47, 1.6].map((x, index) => (
          <mesh key={x} position={[x, 0.1, frontZ + 0.12]}>
            <sphereGeometry args={[0.035, 12, 8]} />
            <meshStandardMaterial color={index === 0 ? "#7fe2ba" : "#75baff"} emissive={index === 0 ? "#2b9d70" : "#286e9e"} emissiveIntensity={0.85} />
          </mesh>
        ))}
      </InteractiveGroup>

      <InteractiveGroup feature="ventilation" activeFeature={activeFeature} onFeatureSelect={selectFeature}>
        <group position={[0, 0.16, -1.04]} rotation={[Math.PI / 2, 0, 0]}>
          {Array.from({ length: 11 }, (_, index) => (
            <mesh key={index} position={[(index - 5) * 0.18, 0, 0]}>
              <boxGeometry args={[0.07, 0.32, 0.025]} />
              <FeatureMaterial color="#090f17" metalness={0.35} roughness={0.6} active={activeFeature === "ventilation"} />
            </mesh>
          ))}
        </group>
      </InteractiveGroup>

      <InteractiveGroup feature="power" activeFeature={activeFeature} onFeatureSelect={selectFeature}>
        <mesh position={[1.56, -0.02, 0.08]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.12, 0.12, 0.05, 24]} />
          <FeatureMaterial color="#080d14" metalness={0.68} roughness={0.3} active={activeFeature === "power"} />
        </mesh>
        <mesh position={[1.56, -0.02, 0.12]}>
          <sphereGeometry args={[0.035, 12, 8]} />
          <meshStandardMaterial color="#7fe2ba" emissive="#2b9d70" emissiveIntensity={0.9} />
        </mesh>
      </InteractiveGroup>

      <mesh position={[-1.72, -0.03, frontZ + 0.09]}>
        <boxGeometry args={[0.08, 0.3, 0.06]} />
        <meshStandardMaterial color="#5e6d7d" metalness={0.8} roughness={0.35} />
      </mesh>
      <mesh position={[1.72, -0.03, frontZ + 0.09]}>
        <boxGeometry args={[0.08, 0.3, 0.06]} />
        <meshStandardMaterial color="#5e6d7d" metalness={0.8} roughness={0.35} />
      </mesh>
    </group>
  );
}

function GLTFProductModel({
  model,
  position,
  scale,
  rotation,
}: Required<Pick<ProductModelProps, "model" | "position" | "scale" | "rotation">>) {
  const { scene } = useGLTF(model);
  const cloned = useMemo(() => scene.clone(true), [scene]);

  return <primitive object={cloned} position={position} scale={scale} rotation={rotation} castShadow receiveShadow />;
}

export function ProductModel({ model, ...props }: ProductModelProps) {
  if (model) {
    return (
      <GLTFProductModel
        model={model}
        position={props.position ?? [0, 0, 0]}
        scale={props.scale ?? 1}
        rotation={props.rotation ?? [0, 0, 0]}
      />
    );
  }

  return <ProceduralFrontierModel {...props} />;
}

export { FEATURE_COPY };
