# SecuEdge product models

The Frontier experience accepts an optional `model` prop pointing to a web-ready
`.glb` or `.gltf` asset. The current `/frontier` experience intentionally uses
the procedural SE-series chassis because no approved product model is present
in the repository.

When the official asset is available:

1. Add the optimized file under `public/models/products/`.
2. Pass its public URL to `SecuEdgeScene` through the `model` prop.
3. Keep the asset under 100,000 triangles and ideally below 5 MB.
4. Preserve named meshes for the front panel, ports, status LEDs, ventilation,
   and power area if component-level hover states are required.
