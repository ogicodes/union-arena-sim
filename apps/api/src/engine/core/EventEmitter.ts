import type { EventCB, Listener } from '../../types'

class EventEmitter {
  private listeners: Listener = {}

  on(event: string, callback: EventCB): void {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }
    this.listeners[event].push(callback)
  }

  off(event: string, callback: EventCB): void {
    if (!this.listeners[event]) return
    this.listeners[event] = this.listeners[event].filter(
      cb => cb !== callback,
    )
  }

  // eslint-disable-next-line
  emit(event: string, payload?: any): void {
    if (!this.listeners[event]) return
    this.listeners[event].forEach(cb => cb(payload))
  }
}

export { EventEmitter }
