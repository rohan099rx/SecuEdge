"use client";

import { Line } from "@react-three/drei";
import { useMemo } from "react";

const nodePositions: Array<[number, number, number]> = [
  [0.9, 0.9, 0.9],
  [-1.2, 0.2, 1.6],
  [1.5, -0.5, 1.2],
  [-1.4, -0.4, -0.8],
  [0.2, 1.1, -1.1],
];

export function NetworkScene() {
  const lines = useMemo(
    () =>
      [
        [nodePositions[0], nodePositions[1]],
        [nodePositions[0], nodePositions[2]],
        [nodePositions[0], nodePositions[3]],
        [nodePositions[1], nodePositions[4]],
        [nodePositions[2], nodePositions[4]],
        [nodePositions[3], nodePositions[4]],
      ] as Array<[[number, number, number], [number, number, number]]>,
    [],
  );

  return (
    <group position={[0, 0.2, 0]}>
      {nodePositions.map((position, index) => (
        <mesh key={`${position.join("-")}-${index}`} position={position as [number, number, number]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial
            color={index % 2 === 0 ? "#6bb7ff" : "#7fe5c9"}
            emissive={index % 2 === 0 ? "#6bb7ff" : "#7fe5c9"}
            emissiveIntensity={0.7}
          />
        </mesh>
      ))}

      {lines.map(([start, end], index) => (
        <Line
          key={`${start.join("-")}-${end.join("-")}-${index}`}
          points={[start, end]}
          color="#7db6ff"
          transparent
          opacity={0.5}
          lineWidth={0.8}
        />
      ))}
    </group>
  );
}
