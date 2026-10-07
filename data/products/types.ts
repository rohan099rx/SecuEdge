export type Product = {
  id: string;
  name: string;
  description: string;
  category: "Desktop" | "Rack-mount";
  firewallThroughput: string | null;
  vpnThroughput: string | null;
  ipsThroughput: string | null;
  concurrentSessions: string | null;
  newSessionsPerSecond: string | null;
  interfaces: string | null;
  recommendedUsers: string | null;
  recommendedBandwidth: string | null;
  dimensions: string | null;
  weight: string | null;
  power: string | null;
  formFactor: "Desktop" | "Rack-mount";
  model3D: string | null;
};
