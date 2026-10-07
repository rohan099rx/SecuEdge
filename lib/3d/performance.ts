export type DeviceProfile = "desktop" | "mobile" | "tablet" | "low-power";

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  return Boolean(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches);
}

export function supportsWebGL(): boolean {
  if (typeof window === "undefined") {
    return true;
  }

  try {
    const canvas = document.createElement("canvas");
    return !!window.WebGLRenderingContext && !!(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
  } catch {
    return false;
  }
}

export function getDeviceProfile(): DeviceProfile {
  if (typeof navigator === "undefined") {
    return "desktop";
  }

  const isMobile = /Mobi|Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
  const isTablet = /iPad|Tablet/i.test(navigator.userAgent);
  const lowCpu = navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency <= 4;

  if (isMobile && !isTablet) {
    return "mobile";
  }

  if (isTablet) {
    return "tablet";
  }

  if (lowCpu) {
    return "low-power";
  }

  return "desktop";
}

export function getCanvasSettings() {
  if (typeof window === "undefined") {
    return {
      dpr: [1, 1.5] as [number, number],
      shadows: true,
      antialias: true,
      powerPreference: "high-performance" as const,
    };
  }

  const profile = getDeviceProfile();
  const dpr = profile === "mobile" ? 1 : profile === "low-power" ? ([1, 1.5] as [number, number]) : ([1, 2] as [number, number]);

  return {
    dpr,
    shadows: profile !== "mobile",
    antialias: profile !== "mobile",
    powerPreference: profile === "mobile" ? ("low-power" as const) : ("high-performance" as const),
  };
}
