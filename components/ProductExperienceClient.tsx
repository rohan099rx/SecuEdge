"use client";

import dynamic from "next/dynamic";

const ProductExperience = dynamic(
  () => import("@/components/3d/Scene").then((module) => module.SecuEdgeScene),
  {
    ssr: false,
    loading: () => <div className="product-experience__loading">Loading Frontier hardware</div>,
  },
);

export { ProductExperience };
