"use client";

import { Html, Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import * as THREE from "three";

type TopologyNode = {
  label: string;
  position: [number, number, number];
  tone: "blue" | "green" | "neutral";
};

const NODES: TopologyNode[] = [
  { label: "Internet", position: [0, 2.35, -0.9], tone: "blue" },
  { label: "SecuEdge", position: [0, 0.42, 0.1], tone: "blue" },
  { label: "Network", position: [0, -0.78, -0.7], tone: "green" },
  { label: "Servers", position: [0, -1.65, -0.45], tone: "neutral" },
  { label: "Cloud", position: [0, -2.42, -0.2], tone: "blue" },
];

const PATH: [number, number, number][] = NODES.map((node) => node.position);

// Distributed edge points add depth without labels or dashboard clutter.
const EDGE_NODES: [number, number, number][] = Array.from({ length: 24 }, (_, index) => {
  const angle = (index / 24) * Math.PI * 2;
  const x = Math.cos(angle) * (2.05 + (index % 3) * 0.22);
  const y = Math.sin(angle) * (1.35 + (index % 4) * 0.12);
  const z = -0.5 - (index % 5) * 0.24;
  return [x, y, z];
});

function edgeAnchor(position: [number, number, number]) {
  if (position[1] > 0.68) return NODES[0].position;
  if (position[1] < -0.8) return NODES[4].position;
  return NODES[2].position;
}

function packetPosition(progress: number) {
  const scaled = Math.min(progress, 0.999) * (PATH.length - 1);
  const index = Math.floor(scaled);
  const local = scaled - index;
  const start = PATH[index];
  const end = PATH[index + 1];
  return new THREE.Vector3().lerpVectors(
    new THREE.Vector3(...start),
    new THREE.Vector3(...end),
    local,
  );
}

export function NetworkTopology({ simplified = false }: { simplified?: boolean }) {
  const normalPacket = useRef<THREE.Mesh>(null);
  const secondPacket = useRef<THREE.Mesh>(null);
  const threatPacket = useRef<THREE.Mesh>(null);
  const normalProgress = useRef(0);
  const secondProgress = useRef(0.36);
  const threatProgress = useRef(0.48);
  const threatOpacity = useRef(1);

  const timeline = useMemo(() => {
    const sequence = gsap.timeline({ repeat: -1, repeatDelay: 0.65 });
    sequence
      .to(normalProgress, { current: 1, duration: 3.4, ease: "none" }, 0)
      .to(secondProgress, { current: 1, duration: 3.4, ease: "none" }, 0.8)
      .to(threatProgress, { current: 0.55, duration: 1.25, ease: "power2.in" }, 1.6)
      .to(threatOpacity, { current: 0, duration: 0.28, ease: "power1.out" }, 2.72);
    return sequence;
  }, []);

  useEffect(() => {
    if (simplified) timeline.timeScale(0.72);
    return () => {
      timeline.kill();
    };
  }, [simplified, timeline]);

  useFrame(() => {
    if (normalPacket.current) normalPacket.current.position.copy(packetPosition(normalProgress.current));
    if (secondPacket.current) secondPacket.current.position.copy(packetPosition(secondProgress.current));
    if (threatPacket.current) {
      threatPacket.current.position.copy(packetPosition(threatProgress.current));
      threatPacket.current.visible = threatOpacity.current > 0.1;
    }
  });

  const visibleNodes = simplified ? NODES.filter((_, index) => index !== 3) : NODES;
  const visiblePath = simplified ? PATH.filter((_, index) => index !== 3) : PATH;
  const edgeNodes = simplified ? EDGE_NODES.filter((_, index) => index % 3 === 0) : EDGE_NODES;

  return (
    <group position={[0, 0, -0.4]}>
      {visiblePath.slice(0, -1).map((position, index) => (
        <Line
          key={`path-${index}`}
          points={[position, visiblePath[index + 1]]}
          color={index === 1 ? "#71d9ad" : "#5f9fe0"}
          transparent
          opacity={0.42}
          lineWidth={0.75}
        />
      ))}
      {edgeNodes.map((position, index) => (
        <group key={`edge-${index}`} position={position}>
          <Line points={[[0, 0, 0], [edgeAnchor(position)[0] - position[0], edgeAnchor(position)[1] - position[1], edgeAnchor(position)[2] - position[2]]]} color={index % 5 === 0 ? "#86d9c0" : "#66b8e8"} transparent opacity={0.12} lineWidth={0.55} />
          <mesh>
            <sphereGeometry args={[index % 6 === 0 ? 0.042 : 0.03, 8, 8]} />
            <meshBasicMaterial color={index % 5 === 0 ? "#9be2c9" : "#83c7eb"} transparent opacity={0.68} />
          </mesh>
        </group>
      ))}
      {visibleNodes.map((node) => (
        <group key={node.label} position={node.position}>
          <mesh>
            <sphereGeometry args={[node.label === "SecuEdge" ? 0.1 : 0.055, 12, 12]} />
            <meshStandardMaterial
              color={node.tone === "green" ? "#7fe2ba" : node.tone === "neutral" ? "#bac9da" : "#6dbbff"}
              emissive={node.tone === "green" ? "#2b9d70" : "#286e9e"}
              emissiveIntensity={0.7}
            />
          </mesh>
          <Html center distanceFactor={7} position={[0.17, 0, 0]} style={{ pointerEvents: "none" }}>
            <span className="topology-label">{node.label}</span>
          </Html>
        </group>
      ))}
      <mesh ref={normalPacket} position={PATH[0]}>
        <sphereGeometry args={[0.035, 10, 10]} />
        <meshBasicMaterial color="#b9e5ff" />
      </mesh>
      <mesh ref={secondPacket} position={PATH[1]}>
        <sphereGeometry args={[0.028, 10, 10]} />
        <meshBasicMaterial color="#8fe0c1" />
      </mesh>
      <mesh ref={threatPacket} position={PATH[1]}>
        <sphereGeometry args={[0.045, 10, 10]} />
        <meshBasicMaterial color="#ff8794" />
      </mesh>
    </group>
  );
}
