import { roomGameData } from '../lib/roomGameData'
import type { RoomData } from '../types'

/**
 * getEngine
 *
 * Returns either the RoomData object or throws an error if it doesn't exist.
 *
 * @param roomName string - The room name
 * @returns RoomData
 * @throws Error - If the room doesnt exist
 */
export const getEngine = (roomName: string): RoomData => {
  const data = roomGameData.get(roomName)
  if (!data) {
    throw new Error("Game engine doesn't exist")
  }
  return data
}

/**
 * getRoomName
 *
 * Returns a formatted room name
 *
 * @param playerName string
 * @param opponentName string
 * @returns string
 */
export const getRoomName = (
  playerName: string,
  opponentName: string,
): string => {
  return [playerName, opponentName].sort().join('-')
}
