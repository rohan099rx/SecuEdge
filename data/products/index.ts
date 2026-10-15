import { se20 } from "./se20";
import { se50 } from "./se50";
import { se100p } from "./se100p";
import { se250p } from "./se250p";
import { se500p } from "./se500p";
import { se750p } from "./se750p";
import { se1000p } from "./se1000p";

/** The approved SE-series lineup (copy deck §1.3).
 *  Retired and unapproved model files were deleted. */
export const products = [se20, se50, se100p, se250p, se500p, se750p, se1000p] as const;
export type { Product } from "./types";
