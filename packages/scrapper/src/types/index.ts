export interface FormattedCard {
  cardNo: string;
  rarity: string | null;
  name: string;
  seriesName: string;
  series: string;
  needEnergyData: number | null;
  color: string | null;
  apData: number;
  categoryData: string;
  bpData: number | null;
  attributeData: string | null;
  generatedEnergyData: number | null;
  effectData: string | null;
  triggerData: string | null;
  getInfoData: string | null;
}

export interface Card {
  cardNo: string;
  rarity: string;
  name: string;
  image: string;
  seriesName: string;
  series: string;
  needEnergyData: string;
  color: string;
  apData: string;
  categoryData: string;
  bpData: string;
  attributeData: string;
  generatedEnergyData: string;
  effectData: string;
  triggerData: string;
  getInfoData: string;
  format: string;
  created_at: string;
  updated_at: string;
}

export interface ParsedImage {
  src: string;
  alt: string;
}

export interface ParserResult {
  images: ParsedImage[];
  text: string[];
  parserResultOrder: ("img" | "text_node")[];
}
