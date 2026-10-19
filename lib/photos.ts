/**
 * Licensed stock photography (Pexels License — free for commercial use,
 * attribution not required). Every file's source page, subject note and
 * licence is recorded in `public/photos/credits.json`.
 *
 * None of these photographs show a SecuEdge product, office, engineer or
 * customer site. They are context imagery: each one is rendered with an
 * "illustrative" tag (see `PhotoTile`), none is captioned as our own
 * installation, and substituting real photography of your own hardware,
 * offices and deployments is a straight file swap in `public/photos/`.
 */

export type Photo = {
  /** Public path of the file. */
  src: string;
  /** Honest description of what the photograph shows. */
  alt: string;
  /** Short kicker shown over the frame; defaults to "Illustrative". */
  tag?: string | null;
};

/** One photograph per product family, used as the deep-dive panel header. */
export const PRODUCT_PHOTOS: Record<string, Photo> = {
  frontier: {
    src: "/photos/p-frontier.jpg",
    alt: "Close-up of network hardware mounted in a data-centre rack",
    tag: "Edge hardware",
  },
  watchtower: {
    src: "/photos/p-watchtower.jpg",
    alt: "Engineer watching a wall of monitoring screens",
    tag: "Monitoring",
  },
  secuweb: {
    src: "/photos/p-secuweb.jpg",
    alt: "Illuminated row of network equipment in a rack",
    tag: "Connectivity",
  },
  grid: {
    src: "/photos/p-grid.jpg",
    alt: "Control room with several monitoring displays",
    tag: "Correlation",
  },
  secudefend: {
    src: "/photos/p-secudefend.jpg",
    alt: "Bundles of patch cables connected to a switch panel",
    tag: "Interception",
  },
  muster: {
    src: "/photos/p-muster.jpg",
    alt: "Analyst at a desk reading charts on two screens",
    tag: "Log analysis",
  },
};

/** Sector context for the industries band, keyed by industry card name. */
export const SECTOR_PHOTOS: Record<string, Photo> = {
  Education: { src: "/photos/i-education.jpg", alt: "Students working at computers in a school lab" },
  Healthcare: { src: "/photos/i-healthcare.jpg", alt: "Clinician adjusting a patient-monitoring device" },
  Government: { src: "/photos/i-government.jpg", alt: "Facade of a large public administrative building" },
  Finance: { src: "/photos/i-finance.jpg", alt: "Glass facade of a financial-district office tower" },
  Manufacturing: { src: "/photos/i-manufacturing.jpg", alt: "Automated production line on a factory floor" },
  Retail: { src: "/photos/i-retail.jpg", alt: "Point-of-sale terminal at a shop counter" },
  Hospitality: { src: "/photos/i-hospitality.jpg", alt: "Dining room of a hotel restaurant" },
  Technology: { src: "/photos/i-technology.jpg", alt: "Open-plan office with people working at desks" },
};

/** Statement band: a data-centre photograph with the fact ticker across it. */
export const PHOTO_BAND: Photo & { kicker: string } = {
  src: "/photos/band-datacenter.jpg",
  alt: "Row of lit server racks in a data centre",
  tag: "Illustrative",
  kicker: "SecuEdge · one portfolio",
};

/** Support band — engineers working in a data centre. */
export const PHOTO_SUPPORT: Photo = {
  src: "/photos/s-support.jpg",
  alt: "Two engineers with laptops working between server racks",
};

/** Company band — a small team working together. */
export const PHOTO_COMPANY: Photo = {
  src: "/photos/c-company.jpg",
  alt: "Two colleagues working together at a desk",
};

/** India band — Indian skyline. */
export const PHOTO_INDIA: Photo = {
  src: "/photos/m-india.jpg",
  alt: "Indian city skyline at dusk",
  tag: "India",
};
