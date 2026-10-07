"use client";

import { ContactShadows, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Group, Mesh } from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { getCanvasSettings, getDeviceProfile, prefersReducedMotion, supportsWebGL } from "@/lib/3d/performance";
import { materialPalette } from "@/lib/3d/materials";

gsap.registerPlugin(ScrollTrigger);

type LayerId = "cover" | "cooling" | "interfaces" | "platform" | "engine" | "power" | "chassis";

type Layer = {
  id: LayerId;
  label: string;
  function: string;
  description: string;
  color: string;
  height: number;
};

const LAYERS: Layer[] = [
  { id: "cover", label: "TOP COVER", function: "Protective enclosure", description: "A rigid metal cover protects the internal assemblies while preserving service access and controlled airflow.", color: "#8293a8", height: 0.62 },
  { id: "cooling", label: "COOLING SYSTEM", function: "Thermal control", description: "A guided cooling path moves heat away from the processing and security workloads for continuous operation.", color: "#4e9bd1", height: 0.46 },
  { id: "interfaces", label: "NETWORK INTERFACES", function: "Traffic ingress and egress", description: "Copper and SFP interfaces connect the security boundary to WAN, LAN, segmented networks and uplinks.", color: "#63c7a2", height: 0.42 },
  { id: "platform", label: "PROCESSING PLATFORM", function: "Packet processing", description: "The processing platform handles routing, inspection and policy decisions without obscuring the network path.", color: "#9caeca", height: 0.5 },
  { id: "engine", label: "SECURITY ENGINE", function: "Threat prevention", description: "Inspection engines apply firewall, IPS, content and application policy to traffic crossing the edge.", color: "#75b9f0", height: 0.48 },
  { id: "power", label: "POWER SYSTEM", function: "Stable energy delivery", description: "A dedicated power section conditions and distributes energy to the appliance subsystems.", color: "#c6a76c", height: 0.38 },
  { id: "chassis", label: "CHASSIS", function: "Structural foundation", description: "The chassis provides rack-ready structure, grounding and the mechanical foundation for every layer.", color: "#45586d", height: 0.5 },
];

const OFFSET = [1.45, 1.05, 0.74, 0.45, 0.18, -0.16, -0.38];

function LayerGeometry({ layer, index, groupRef, active, onSelect }: { layer: Layer; index: number; groupRef: React.RefObject<Group>; active: boolean; onSelect: () => void }) {
  const width = index === 2 ? 3.25 : 3.65;
  const depth = index === 2 ? 1.82 : 2.05;
  const accent = active ? "#9ed8ff" : layer.color;

  return (
    <group ref={groupRef} onClick={(event) => { event.stopPropagation(); onSelect(); }} onPointerOver={(event) => { event.stopPropagation(); }}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[width, layer.height, depth]} />
        <meshStandardMaterial color={accent} metalness={index === 0 || index === 6 ? 0.82 : 0.55} roughness={index === 4 ? 0.3 : 0.45} emissive={active ? "#174d76" : "#000000"} emissiveIntensity={active ? 0.45 : 0} />
      </mesh>
      {index === 1 ? (
        <group position={[0, 0, -0.83]}>
          {[-1.05, -0.65, -0.25, 0.15, 0.55, 0.95].map((x) => (
            <mesh key={x} position={[x, 0, 0]}>
              <boxGeometry args={[0.12, 0.08, 0.08]} />
              <meshStandardMaterial color="#0b1722" metalness={0.35} roughness={0.6} />
            </mesh>
          ))}
        </group>
      ) : null}
      {index === 2 ? (
        <group position={[0, 0, 0.94]}>
          {[-1.05, -0.75, -0.45, -0.15, 0.15, 0.45, 0.75, 1.05].map((x) => (
            <mesh key={x} position={[x, 0, 0]}>
              <boxGeometry args={[0.16, 0.2, 0.08]} />
              <meshStandardMaterial color="#071019" metalness={0.68} roughness={0.32} />
            </mesh>
          ))}
        </group>
      ) : null}
      {index === 4 ? (
        <mesh position={[0, layer.height / 2 + 0.025, 0]} castShadow>
          <boxGeometry args={[2.9, 0.04, 1.45]} />
          <meshStandardMaterial color="#0a1928" metalness={0.35} roughness={0.35} emissive="#123c5d" emissiveIntensity={0.3} />
        </mesh>
      ) : null}
      {index === 5 ? (
        <mesh position={[1.25, 0.04, 0.9]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 0.06, 20]} />
          <meshStandardMaterial color="#7fe2ba" emissive="#2b9d70" emissiveIntensity={0.9} />
        </mesh>
      ) : null}
    </group>
  );
}

function ExplodedModel({ activeId, onSelect, mobile, layerRefs }: { activeId: LayerId; onSelect: (id: LayerId) => void; mobile: boolean; layerRefs: React.MutableRefObject<Group | null>[] }) {
  const root = useRef<Group>(null);

  useEffect(() => {
    LAYERS.forEach((layer, index) => {
      const group = layerRefs[index].current;
      if (!group) return;
      group.position.y = 0;
    });
  }, [layerRefs]);

  useFrame((state) => {
    if (!root.current) return;
    root.current.rotation.y += (state.pointer.x * 0.08 - root.current.rotation.y) * 0.035;
    root.current.rotation.x += (-state.pointer.y * 0.035 - root.current.rotation.x) * 0.035;
  });

  return (
    <group ref={root} position={[0, -0.15, 0]} scale={mobile ? 0.82 : 1}>
      {LAYERS.map((layer, index) => (
        <LayerGeometry
          key={layer.id}
          layer={layer}
          index={index}
          groupRef={layerRefs[index]}
          active={activeId === layer.id}
          onSelect={() => onSelect(layer.id)}
        />
      ))}
    </group>
  );
}

function StaticFallback({ onSelect, activeId }: { onSelect: (id: LayerId) => void; activeId: LayerId }) {
  return (
    <div className="exploded-firewall__static">
      {LAYERS.map((layer, index) => (
        <button type="button" key={layer.id} className={`exploded-firewall__static-layer ${activeId === layer.id ? "is-active" : ""}`} onClick={() => onSelect(layer.id)} style={{ transform: `translateY(${(index - 3) * 10}px)` }}>
          <span style={{ backgroundColor: layer.color }} />
          {layer.label}
        </button>
      ))}
    </div>
  );
}

export function ExplodedFirewall() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const layerRefs = useMemo(() => LAYERS.map(() => ({ current: null } as React.MutableRefObject<Group | null>)), []);
  const [activeId, setActiveId] = useState<LayerId>("engine");
  const activeLayer = LAYERS.find((layer) => layer.id === activeId) ?? LAYERS[4];
  const reducedMotion = useMemo(() => prefersReducedMotion(), []);
  const mobile = useMemo(() => getDeviceProfile() === "mobile" || getDeviceProfile() === "low-power", []);
  const settings = useMemo(() => getCanvasSettings(), []);

  useEffect(() => {
    if (!stageRef.current || reducedMotion) {
      layerRefs.forEach((ref, index) => { if (ref.current) ref.current.position.y = OFFSET[index] * (mobile ? 0.72 : 1); });
      return;
    }
    const ctx = gsap.context(() => {
      const targets = layerRefs.map((ref) => ref.current).filter(Boolean);
      gsap.set(targets, { y: 0 });
      gsap.to(targets, {
        y: (index) => OFFSET[index] * (mobile ? 0.72 : 1),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [layerRefs, mobile, reducedMotion]);

  const selectLayer = (id: LayerId) => setActiveId(id);

  return (
    <section ref={sectionRef} className="exploded-firewall" aria-labelledby="engineered-inside-title">
      <div ref={stageRef} className="exploded-firewall__stage">
        <div className="exploded-firewall__intro">
          <span className="tech-label">Frontier / engineering view</span>
          <h2 id="engineered-inside-title">ENGINEERED INSIDE.</h2>
          <p>Scroll to separate the security boundary layer by layer. Every part has a job.</p>
        </div>
        <div className="exploded-firewall__canvas">
          {supportsWebGL() ? (
            <Canvas shadows={settings.shadows} dpr={settings.dpr} gl={{ antialias: settings.antialias, powerPreference: settings.powerPreference }} camera={{ position: [4.8, 2.2, 6.8], fov: 34 }}>
              <color attach="background" args={[materialPalette.background]} />
              <fog attach="fog" args={[materialPalette.background, 7, 16]} />
              <ambientLight intensity={0.55} />
              <directionalLight position={[4, 6, 5]} intensity={2.1} castShadow />
              <directionalLight position={[-4, 2, -3]} intensity={1.1} color="#4c8ec2" />
              <ExplodedModel activeId={activeId} onSelect={selectLayer} mobile={mobile} layerRefs={layerRefs} />
              <ContactShadows position={[0, -2, 0]} opacity={0.4} blur={2.5} far={5} scale={6} color="#02060b" />
              <OrbitControls enablePan={false} enableDamping dampingFactor={0.08} minDistance={4.6} maxDistance={8.5} />
            </Canvas>
          ) : <StaticFallback onSelect={selectLayer} activeId={activeId} />}
        </div>
        <svg className="exploded-firewall__lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {LAYERS.map((layer, index) => <path key={layer.id} className={activeId === layer.id ? "is-active" : ""} d={`M ${54 + index * 1.3} ${22 + index * 8} H ${74 + (index % 2) * 5}`} />)}
        </svg>
        <div className="exploded-firewall__labels" aria-label="Firewall component layers">
          {LAYERS.map((layer) => (
            <button type="button" key={layer.id} className={activeId === layer.id ? "is-active" : ""} onClick={() => selectLayer(layer.id)}>
              <span>{layer.label}</span>
              <small>{layer.function}</small>
            </button>
          ))}
        </div>
        <aside className="exploded-firewall__detail" aria-live="polite">
          <span className="tech-label">Selected layer</span>
          <h3>{activeLayer.label}</h3>
          <strong>{activeLayer.function}</strong>
          <p>{activeLayer.description}</p>
          <span className="exploded-firewall__hint">Scroll to explore · click any layer</span>
        </aside>
      </div>
    </section>
  );
}

export default ExplodedFirewall;
