import { Card as CardClass } from "../engine/components/Card";
import { Player as PlayerClass } from "../engine/components/Player";
import { GameState as GameStateClass } from "../engine/core/GameState";
//import { TurnManager as TurnManagerClass } from "../engine/core/TurnManager";
import { GameEngine as GameEngineClass } from "../engine/core/GameEngine";

export type Card = InstanceType<typeof CardClass>;
export type Player = InstanceType<typeof PlayerClass>;
export type GameState = InstanceType<typeof GameStateClass>;
//export type TurnManager = InstanceType<typeof TurnManagerClass>;
export type GameEngine = InstanceType<typeof GameEngineClass>;

export type Phases = "Draw" | "Main";
export type CardType = "Spell" | "Trap";
