export interface FormattedCard {
  cardNo: string;
  rarity: string;
  name: string;
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
}
