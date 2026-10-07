import type { DetailContent } from "./types";
import education from "./data/industry-education.json";
import healthcare from "./data/industry-healthcare.json";
import finance from "./data/industry-finance.json";
import government from "./data/industry-government.json";
import legal from "./data/industry-legal.json";
import manufacturing from "./data/industry-manufacturing.json";
import retail from "./data/industry-retail.json";
import media from "./data/industry-media.json";
import hospitality from "./data/industry-hospitality.json";
import logistics from "./data/industry-logistics.json";
import technology from "./data/industry-technology.json";
import construction from "./data/industry-construction.json";
import agriculture from "./data/industry-agriculture.json";
import nonprofit from "./data/industry-nonprofit.json";
import consulting from "./data/industry-consulting.json";
import realEstate from "./data/industry-real-estate.json";
import automotive from "./data/industry-automotive.json";
import foodBeverage from "./data/industry-food-beverage.json";
import sportsFitness from "./data/industry-sports-fitness.json";
import entertainment from "./data/industry-entertainment.json";
import fashionBeauty from "./data/industry-fashion-beauty.json";
import cards from "./data/industry-cards.json";

/**
 * Industry pages — 8 restored from the previous secuedge.com + 13 new
 * verticals built from the 2026-07 industry security research.
 */
export const INDUSTRY_CONTENT: Record<string, DetailContent> = {
  education: education as DetailContent,
  healthcare: healthcare as DetailContent,
  finance: finance as DetailContent,
  government: government as DetailContent,
  legal: legal as DetailContent,
  manufacturing: manufacturing as DetailContent,
  retail: retail as DetailContent,
  media: media as DetailContent,
  hospitality: hospitality as DetailContent,
  logistics: logistics as DetailContent,
  technology: technology as DetailContent,
  construction: construction as DetailContent,
  agriculture: agriculture as DetailContent,
  nonprofit: nonprofit as DetailContent,
  consulting: consulting as DetailContent,
  "real-estate": realEstate as DetailContent,
  automotive: automotive as DetailContent,
  "food-beverage": foodBeverage as DetailContent,
  "sports-fitness": sportsFitness as DetailContent,
  entertainment: entertainment as DetailContent,
  "fashion-beauty": fashionBeauty as DetailContent,
};

export type IndustryCard = { industry: string; desc: string; features: string[] };
export const INDUSTRY_CARDS: IndustryCard[] = (cards as { cards: IndustryCard[] }).cards;
