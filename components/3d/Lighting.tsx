"use client";

export type LightingConfig = {
  key?: number;
  rim?: number;
  ambient?: number;
};

export function Lighting({
  reducedMotion = false,
  lighting = {},
}: {
  reducedMotion?: boolean;
  lighting?: LightingConfig;
}) {
  const key = lighting.key ?? 1.9;
  const rim = lighting.rim ?? 1.25;
  const ambient = lighting.ambient ?? 0.42;

  return (
    <>
      <ambientLight intensity={ambient} color="#dfeaff" />
      <directionalLight
        castShadow
        position={[4.5, 5.5, 4.5]}
        intensity={reducedMotion ? key * 0.7 : key}
        color="#edf6ff"
        shadow-mapSize-width={1536}
        shadow-mapSize-height={1536}
        shadow-bias={-0.0001}
      />
      <spotLight
        position={[-4.5, 3.5, 3.6]}
        angle={0.42}
        penumbra={0.9}
        intensity={reducedMotion ? rim * 0.6 : rim}
        color="#6eaaf5"
      />
      <pointLight position={[2.8, 1.6, -2.6]} intensity={reducedMotion ? 0.5 : 0.9} color="#7ec6ff" />
    </>
  );
}
