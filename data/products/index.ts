import { se20 } from "./se20";
import { se50 } from "./se50";
import { se50p } from "./se50p";
import { se100p } from "./se100p";
import { se250p } from "./se250p";
import { se500p } from "./se500p";
import { se1000p } from "./se1000p";

export const products = [se20, se50, se50p, se100p, se250p, se500p, se1000p] as const;
export type { Product } from "./types";
