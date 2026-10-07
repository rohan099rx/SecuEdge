"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const GATE_X = [-2.2, 0, 2.2];
const GATE_LABELS = ["INSPECT", "POLICY", "DECIDE"];

/** Three inspection gates — navy torus frames joined by a blue path line. */
function Gates() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.12) * 0.12;
  });

  return (
    <group ref={group}>
      {/* path line through all gates */}
      <mesh rotation={[0, 0, Math.PI / 2]} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 5.6, 8]} />
        <meshBasicMaterial color="#016FED" transparent opacity={0.5} />
      </mesh>
      {GATE_X.map((x, i) => (
        <group key={GATE_LABELS[i]} position={[x, 0, 0]}>
          <mesh>
            <torusGeometry args={[0.85, 0.035, 12, 64]} />
            <meshStandardMaterial color="#0b2239" metalness={0.35} roughness={0.5} />
          </mesh>
          <mesh>
            <torusGeometry args={[0.85, 0.012, 8, 64]} />
            <meshBasicMaterial color="#016FED" transparent opacity={0.7} />
          </mesh>
          {/* gate tick marks */}
          {[0, 1, 2, 3].map((t) => {
            const a = (t / 4) * Math.PI * 2 + Math.PI / 4;
            return (
              <mesh key={t} position={[Math.cos(a) * 0.85, Math.sin(a) * 0.85, 0]}>
                <sphereGeometry args={[0.045, 10, 10]} />
                <meshBasicMaterial color={i === 2 ? "#16a34a" : "#016FED"} />
              </mesh>
            );
          })}
        </group>
      ))}
    </group>
  );
}

/** Deterministic packets travelling left → right through the gates. */
function Packets({ count = 9 }: { count?: number }) {
  const group = useRef<THREE.Group>(null);
  const offsets = useMemo(() => Array.from({ length: count }, (_, i) => i / count), [count]);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime * 0.22;
    group.current.children.forEach((child, i) => {
      const p = (t + offsets[i]) % 1;
      child.position.set(-2.8 + p * 5.6, Math.sin(p * Math.PI * 2 + i) * 0.12, 0);
      const near = Math.min(...GATE_X.map((gx) => Math.abs(child.position.x - gx)));
      const s = near < 0.25 ? 1.5 : 1;
      child.scale.setScalar(s);
    });
  });

  return (
    <group ref={group}>
      {offsets.map((o) => (
        <mesh key={o} position={[-2.8 + o * 5.6, 0, 0]}>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshBasicMaterial color="#016FED" transparent opacity={0.9} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}

/**
 * PremiumFlow3D — traffic → inspection → policy → decision on cream.
 * Transparent background; the section band shows through.
 * One canvas, DPR capped, pauses offscreen via `active`.
 */
export function PremiumFlow3D({ active = true }: { active?: boolean }) {
  return (
    <div className="relative h-[300px] w-full md:h-[340px]" aria-hidden>
      <Canvas
        frameloop={active ? "always" : "never"}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0.4, 6.4], fov: 40, near: 0.1, far: 30 }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[4, 5, 4]} intensity={1} color="#ffffff" />
        <Gates />
        <Packets />
      </Canvas>
      <div className="pointer-events-none absolute inset-x-0 bottom-1 flex justify-between px-2 font-mono text-[9px] uppercase tracking-[0.2em] text-[#64748b]">
        <span>Internet / WAN</span>
        <span>Frontier NGFW</span>
        <span>Network zones</span>
      </div>
    </div>
  );
}
