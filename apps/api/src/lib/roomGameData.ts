import { RoomData } from '../types'

/**
 * roomGameData
 *
 * The singleton used to store the roomGameData
 * used in controllers throughout the socket implementation.
 * */
export const roomGameData = new Map<string, RoomData>()
