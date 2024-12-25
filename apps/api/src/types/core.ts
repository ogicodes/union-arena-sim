import { GameState as GameStateClass } from '../engine/core/GameState'
import { GameEngine as GameEngineClass } from '../engine/core/GameEngine'
import { TurnManager as TurnManagerClass } from '../engine/core/TurnManager'
import { Phase as PhaseClass } from '../engine/phases/Phase'

export type GameState = InstanceType<typeof GameStateClass>
export type GameEngine = InstanceType<typeof GameEngineClass>
export type TurnManager = InstanceType<typeof TurnManagerClass>
export type Phase = InstanceType<typeof PhaseClass>

export type Phases =
  | 'Start Phase'
  | 'Movement Phase'
  | 'Main Phase'
  | 'Attack Phase'
  | 'End Phase'

export type MovementPhaseMovement =
  | 'FRONTLINE_TO_ENERGYLINE'
  | 'ENERGYLINE_TO_FRONTLINE'

export type MainPhaseMovement = ''
