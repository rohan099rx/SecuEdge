"use client";

import { useMemo } from "react";

export function Particles({ count = 80 }: { count?: number }) {
  const positions = useMemo(() => {
    const values = new Float32Array(count * 3);

    for (let index = 0; index < count; index += 1) {
      const radius = 2.2 + Math.random() * 2.8;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 3.8;

      values[index * 3] = Math.cos(angle) * radius;
      values[index * 3 + 1] = y;
      values[index * 3 + 2] = Math.sin(angle) * radius;
    }

    return values;
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#7ec5ff" size={0.04} transparent opacity={0.72} depthWrite={false} />
    </points>
  );
}
