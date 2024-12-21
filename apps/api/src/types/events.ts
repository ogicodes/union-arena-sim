export type EventCB = (payload?: any) => void // eslint-disable-line
export type Listener = Record<string, EventCB[]>
