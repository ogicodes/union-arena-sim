export interface IElectronAPI {
  loadCards: () => Promise<CardData[]>
}

declare global {
  interface Window {
    electron: IElectronAPI
  }
}
