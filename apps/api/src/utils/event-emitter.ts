type EventCallback = (payload?: any) => void

export class EventEmitter {
  private events: Record<string, EventCallback[]> = {}

  on(event: string, callback: EventCallback): void {
    if (!this.events[event]) this.events[event] = []
    this.events[event].push(callback)
  }

  emit(event: string, payload?: any): void {
    ;(this.events[event] || []).forEach(callback => callback(payload))
  }
}
