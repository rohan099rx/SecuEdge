"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/** Deterministic PRNG — no Math.random during render, stable across mounts. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Lightweight particle shell — cheap, no postprocessing, respects reduced motion via frameloop control from parent. */
function ParticleShell({ count = 520 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const rand = mulberry32(42);
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3.2 + rand() * 4.5;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = (r * Math.cos(phi)) * 0.6;
      arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.08;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.028} color="#016FED" transparent opacity={0.4} sizeAttenuation depthWrite={false} />
    </points>
  );
}

/**
 * PacketFlow — 8 deterministic packets travelling the inner orbit ring.
 * Communicates NETWORK → SECURITY without dominating the scene.
 * Single draw call, transform-only animation.
 */
function PacketFlow() {
  const group = useRef<THREE.Group>(null);
  const offsets = useMemo(() => [0, 0.13, 0.26, 0.38, 0.51, 0.63, 0.76, 0.88], []);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime * 0.12;
    group.current.children.forEach((child, i) => {
      const a = (t + offsets[i]) * Math.PI * 2;
      child.position.set(Math.cos(a) * 2.1, Math.sin(a * 0.9) * 0.35, Math.sin(a) * 2.1);
      const s = 1 + Math.sin(t * 6 + i) * 0.15;
      child.scale.setScalar(s);
    });
  });

  return (
    <group ref={group} rotation={[Math.PI / 2.4, 0, 0]}>
      {offsets.map((o) => (
        <mesh key={o} position={[Math.cos(o * Math.PI * 2) * 2.1, 0, Math.sin(o * Math.PI * 2) * 2.1]}>
          <sphereGeometry args={[0.035, 12, 12]} />
          <meshBasicMaterial color="#016FED" transparent opacity={0.85} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}

/** Static network nodes — depth markers on the outer ring. */
function NodeMarkers() {
  const nodes = useMemo(() => {
    const rand = mulberry32(7);
    return Array.from({ length: 10 }, (_, i) => {
      const a = (i / 10) * Math.PI * 2 + rand() * 0.2;
      return { key: i, x: Math.cos(a) * 2.7, z: Math.sin(a) * 2.7, y: (rand() - 0.5) * 0.5 };
    });
  }, []);

  return (
    <group rotation={[Math.PI / 1.9, 0, 0]}>
      {nodes.map((n) => (
        <mesh key={n.key} position={[n.x, n.y, n.z]}>
          <sphereGeometry args={[0.025, 10, 10]} />
          <meshBasicMaterial color="#0b2239" transparent opacity={0.6} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}

function ShieldCore() {
  const core = useRef<THREE.Mesh>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  // Narrow viewports: push the structure right and shrink it so copy stays clear.
  const narrow = useThree((s) => s.size.width / s.size.height < 0.85);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (core.current) {
      core.current.rotation.y = t * 0.15;
      core.current.rotation.x = Math.sin(t * 0.2) * 0.15;
      const s = 1 + Math.sin(t * 1.2) * 0.02;
      core.current.scale.setScalar(s);
    }
    if (ringA.current) {
      ringA.current.rotation.z = t * 0.1;
      ringA.current.rotation.x = Math.PI / 2.4 + Math.sin(t * 0.15) * 0.06;
    }
    if (ringB.current) {
      ringB.current.rotation.z = -t * 0.07;
      ringB.current.rotation.x = Math.PI / 1.9 + Math.cos(t * 0.12) * 0.06;
    }
  });

  return (
    <group position={[narrow ? 2.3 : 1.35, narrow ? 0.5 : 0, 0]} scale={narrow ? 0.68 : 0.85}>
      {/* steel-blue core — engineered structure, never a black mass */}
      <mesh ref={core}>
        <icosahedronGeometry args={[1.15, 1]} />
        <meshStandardMaterial color="#2c5f9e" metalness={0.3} roughness={0.55} flatShading transparent opacity={0.97} />
      </mesh>
      {/* technical wireframe shell */}
      <mesh scale={1.18}>
        <icosahedronGeometry args={[1.15, 1]} />
        <meshBasicMaterial color="#016FED" wireframe transparent opacity={0.4} />
      </mesh>
      {/* network path rings */}
      <mesh ref={ringA} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[2.1, 0.012, 12, 128]} />
        <meshBasicMaterial color="#016FED" transparent opacity={0.55} />
      </mesh>
      <mesh ref={ringB} rotation={[Math.PI / 1.9, 0, 0]}>
        <torusGeometry args={[2.7, 0.01, 12, 128]} />
        <meshBasicMaterial color="#0e7490" transparent opacity={0.4} />
      </mesh>
      {/* faint depth halo */}
      <mesh>
        <sphereGeometry args={[1.6, 32, 32]} />
        <meshBasicMaterial color="#016FED" transparent opacity={0.05} depthWrite={false} />
      </mesh>
    </group>
  );
}

/** Premium hero 3D — technical architectural model on cream.
 * Navy structures, blue network paths, subtle cyan packets.
 * DPR capped, pauses offscreen via parent. */
export function PremiumHero3D({ active = true }: { active?: boolean }) {
  return (
    <div className="absolute inset-0" aria-hidden>
      <Canvas
        frameloop={active ? "always" : "never"}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0.6, 6.2], fov: 42, near: 0.1, far: 30 }}
      >
        <ambientLight intensity={1.15} />
        <directionalLight position={[4, 5, 4]} intensity={1.1} color="#ffffff" />
        <directionalLight position={[-4, 1, -3]} intensity={0.5} color="#016FED" />
        <pointLight position={[0, 0, 2.5]} intensity={6} color="#016FED" distance={9} />
        <ParticleShell />
        <ShieldCore />
        <PacketFlow />
        <NodeMarkers />
      </Canvas>
      {/* vignette + grid overlay handled in CSS */}
    </div>
  );
}
