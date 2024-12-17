import { Card as CardClass } from "../engine/components/Card";
import { Player as PlayerClass } from "../engine/components/Player";
import { GameState as GameStateClass } from "../engine/core/GameState";
//import { TurnManager as TurnManagerClass } from "../engine/core/TurnManager";
import { GameEngine as GameEngineClass } from "../engine/core/GameEngine";
import { ActionPointCard as ActionPointCardClass } from "../engine/components/ActionPointCard";

export type Card = InstanceType<typeof CardClass>;
export type Player = InstanceType<typeof PlayerClass>;
export type GameState = InstanceType<typeof GameStateClass>;
//export type TurnManager = InstanceType<typeof TurnManagerClass>;
export type GameEngine = InstanceType<typeof GameEngineClass>;
export type ActionPointCard = InstanceType<typeof ActionPointCardClass>;

export type Phases =
  | "Start Phase"
  | "Movement Phase"
  | "Main Phase"
  | "Attack Phase"
  | "End Phase";

export type CardType = "character" | "event" | "site" | "action point";

export type Trigger =
  | "Raid"
  | "Color"
  | "Special"
  | "Final"
  | "Draw"
  | "Get"
  | "Active"
  | "None";

export type TriggerEffect =
  | "Add this card to your hand, or if you have the required energy, perform Raid with it."
  | "Choose one character with 3500 or less BP on your opponent's front line and return it to their hand."
  | "Choose one character on your oponents field and sideline it."
  | "If you have zero life, place the top card of your deck into your life area."
  | "Draw 1 Card."
  | "Add this card to your hand."
  | "Choose one character on your field and switch it to active. It Gains 3000 BP until the end of the turn"
  | "None";

export type Keyword =
  | "Step"
  | "Snipe"
  | "Double Attack"
  | "Double Block"
  | "Impact 1"
  | "Impact +1"
  | "Damage 2"
  | "Damage +1"
  | "Nullify Impact"
  | "None";

export type KeywordAbility =
  | "During your movement phase, you may move this card from your front line to your energy line."
  | "You may target a character on your opponents front line and attack it with this character. If you do your opponent can not block."
  | "When this character attacks for the first time this turn, switch it to active."
  | "When this character blocks for the first time this turn, switch it to active."
  | "When this character attacks and wins a battle, deal 1 damage to your opponent."
  | "increase impact damage by 1. If the card does not have impact, it gains impact 1."
  | "When this card attacks and deals direct damage, deal 2 damage to your opponent."
  | "when this character attacks and deals direct damage, deal 1 additional damage to your opponent."
  | "the character battling this card looses impact for the duration of this battle."
  | "None";

export type ActivationTimingAbility =
  | "When Played"
  | "When Sidelined"
  | "When Attacking"
  | "When Blocking"
  | "During Your Turn"
  | "During Opponent's Turn"
  | "Activate: Main"
  | "Raid"
  | "None";

export type ActivationCondition =
  | "If on the Front Line"
  | "If on the Energy Line"
  | "Switch to Resting"
  | "Place 1 Card From Hand Into Sideline"
  | "Pay 1 AP"
  | "SideLine This Card"
  | "Once Per Turn"
  | "None";

export interface FormattedCard {
  cardNo: string;
  rarity: string | null;
  name: string;
  seriesName: string;
  series: string;
  needEnergyData: number | null;
  color: string | null;
  apData: number;
  categoryData: string;
  bpData: number | null;
  attributeData: string | null;
  generatedEnergyData: number;
  effectData: string | null;
  triggerData: string | null;
  getInfoData: string | null;
}

export interface GameBoard {
  frontLine: (Card | null)[];
  energyLine: (Card | null)[];
  actionPointsLine: ActionPointCard[];
}

export interface PlayerState {
  player: Player;
}

export type CardColor = "red" | "blue" | "green" | "yellow" | "purple";

export type ApData = 1 | 2;

export type BpData =
  | 500
  | 1000
  | 1500
  | 2000
  | 2500
  | 3000
  | 3500
  | 4000
  | 4500
  | 5000
  | null;

export type AttributeData =
  | "Ashford Academy"
  | "Ashford Academy / KMF"
  | "Cursed Spirit"
  | "Holy Britannian Empire"
  | "Holy Britannian Empire / KGF"
  | "Holy Britannian Empire / KMF"
  | "Holy Britannian Empire / Pureblood Faction"
  | "Holy Britannian Empire / Royal Guards"
  | "Kyoto Jujutsu High"
  | "Order of the Black Knights"
  | "Order of the Black Knights / Four Holy Swords"
  | "Order of the Black Knights / KMF"
  | "Order of the Black Knights / KMF / Four Holy Swords"
  | "Phantom Troupe"
  | "Pizza"
  | "Shikigami"
  | "Specified Slot"
  | "Squad Zero"
  | "Stern Ritters"
  | "The Bomber"
  | "Thirteen Court Guard Squads"
  | "Transfigured Human"
  | "Zoldyck Family"
  | "None";

export type GeneratedEnergyData = 1 | 2 | 3;
