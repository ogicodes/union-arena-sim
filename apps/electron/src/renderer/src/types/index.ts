export interface CardData {
  imagePath: string
  cardInfo: {
    cardNo: string
    rarity: string
    name: string
    seriesName: string
    series: string
    needEnergyData: number
    color: string
    apData: number
    categoryData: string
    bpData: number
    attributeData: string | null
    generatedEnergyData: number
    effectData: string | null
    triggerData: string | null
    getInfoData: string | null
  }
}
