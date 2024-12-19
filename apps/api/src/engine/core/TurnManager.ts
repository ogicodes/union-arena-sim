import { GameBoard, GameState, Phases, Player } from '../../types'
import { Card } from '../../engine/components/Card'
import {
  getRaidTarget,
  parseEffects,
} from '../../utils/parse-effects'

export class TurnManager {
  public phase: Phases
  private gameState: GameState
  private currentPlayer: Player
  private currentPlayerBoard: GameBoard

  constructor(gamestate: GameState) {
    this.phase = 'Start Phase'
    this.gameState = gamestate
    this.currentPlayer = gamestate.activePlayer

    // Add null check and throw meaningful error if board is not initialized
    const board = gamestate.getBoard(this.currentPlayer.id)
    if (!board) {
      throw new Error(
        `Board not initialized for player ${this.currentPlayer.id}`,
      )
    }
    this.currentPlayerBoard = board
  }

  public nextPhase(): void {
    switch (this.phase) {
      case 'Start Phase':
        this.handleStartPhase()
        console.log('Start phase actions')
        this.phase = 'Main Phase'
        break
      case 'Movement Phase':
        this.handleMovementPhase()
        console.log('Movement phase actions')
        this.phase = 'Movement Phase'
        break
      case 'Main Phase':
        this.handleMainPhase()
        console.log('Main phase actions')
        this.phase = 'Main Phase'
        break
      case 'Attack Phase':
        this.handleAttackPhase()
        console.log('Attack phase actions')
        this.phase = 'Attack Phase'
        break
      case 'End Phase':
        //this.handleEndPhase([0])
        console.log('End phase actions')
        this.phase = 'End Phase'
        break
    }
  }

  /** Start Phase
   * handles events that happen in start phase
   */
  private handleStartPhase(): void {
    /**
     * abilities that state they are active until the start of your next turn, and other similarly phrased abilities, become inactive.
     */
    if (
      this.currentPlayerBoard.frontLine &&
      this.currentPlayerBoard.energyLine
    ) {
      for (
        let i = 0;
        i < this.currentPlayerBoard.frontLine.length;
        i++
      ) {
        const card = this.currentPlayerBoard.frontLine[i]
        if (card) {
          card.deactivateCardEffect()
        }
      }
      for (
        let i = 0;
        i < this.currentPlayerBoard.energyLine.length;
        i++
      ) {
        const card = this.currentPlayerBoard.energyLine[i]
        if (card) {
          card.deactivateCardEffect()
        }
      }
    }
    /**
     * Switch all resting cards to active
     */
    if (
      this.currentPlayerBoard.frontLine &&
      this.currentPlayerBoard.energyLine &&
      this.currentPlayerBoard.actionPointsLine
    ) {
      this.currentPlayerBoard.frontLine.map(card => {
        if (card) {
          card.activateCard()
        }
      })
      this.currentPlayerBoard.energyLine.map(card => {
        if (card) {
          card.activateCard()
        }
      })
      this.currentPlayerBoard.actionPointsLine.map(card => {
        if (card) {
          card.activateCard()
        }
      })
    }

    /**
     * Make sure you have the appropriate number of AP cards in your AP area for the current turn
     */
    switch (this.gameState.turnCount) {
      case 1:
        this.currentPlayerBoard.actionPointsLine[0].flip()
        console.log(`AP count is 1`)
        break
      case 2:
      case 3:
      case 4:
        this.currentPlayerBoard.actionPointsLine[1].flip()
        console.log(`AP count is 2`)
        break
      default:
        this.currentPlayerBoard.actionPointsLine[0].flip()
        this.currentPlayerBoard.actionPointsLine[1].flip()
        this.currentPlayerBoard.actionPointsLine[2].flip()
        console.log(`AP count is 3`)
        break
    }

    /**
     * Draw a card (player 1 does not draw in their first turn)
     */
    if (this.gameState.turnCount > 1) {
      this.gameState.activePlayer.drawCard()
    }
    // Once per turn you may pay 1 AP (by switching an AP card to resting) to draw a card
    if (this.currentPlayer.payApToDraw) {
      this.currentPlayerBoard.actionPointsLine[0].restCard()
      this.currentPlayer.drawCard()
    }
  }

  /** Movement Phase
   * handles events that happen in movement phase
   */
  private handleMovementPhase(cardIdx?: number): void {
    /**
     * You may move any number of characters from your Energy line to your Front line.
     * if you do not have enough space on your Front line for all characters,
     * you must move characters from your Front line to your removal area first
     */
    // Count available space in front line
    let frontLineSpace = 0
    for (
      let i = 0;
      i < this.currentPlayerBoard.frontLine.length;
      i++
    ) {
      if (!this.currentPlayerBoard.frontLine[i]) {
        frontLineSpace++
      }
    }

    // If user selected a card to remove and front line is full
    if (cardIdx !== undefined && frontLineSpace === 0) {
      const selectedCard = this.currentPlayerBoard.frontLine[cardIdx]
      if (selectedCard) {
        //this.currentPlayer.sendToRemovalArea(selectedCard)
        this.currentPlayerBoard.frontLine[cardIdx] = null
      }
    }

    // Now handle moving cards from energy line to front line
    // Move selected cards from energy line to front line if space available
    // This would likely be handled by a separate method call from the frontend
    // when the user selects which energy cards to move
    // Move selected cards from energy line to front line if space available
    if (cardIdx !== undefined) {
      const selectedCard = this.currentPlayerBoard.energyLine[cardIdx]
      if (selectedCard) {
        // Find first empty slot in front line
        const emptySlotIdx =
          this.currentPlayerBoard.frontLine.findIndex(
            slot => slot === null,
          )

        if (emptySlotIdx !== -1) {
          // Move card from energy to front line
          this.currentPlayerBoard.frontLine[emptySlotIdx] =
            selectedCard
          this.currentPlayerBoard.energyLine[cardIdx] = null
        }
      }
    }
  }

  /** Main Phase
   * handles events that happen in main phase
   */
  public handleMainPhase(cardIdx?: number): void {
    // Play a card from hand to energy line
    if (cardIdx !== undefined) {
      const selectedCard = this.currentPlayer.hand[cardIdx]
      if (selectedCard) {
        // Check if we have enough energy for the card
        const requiredEnergy = selectedCard.needEnergyData || 0
        const availableEnergy =
          this.currentPlayerBoard.energyLine.reduce((total, card) => {
            return total + (card?.generatedEnergyData || 0)
          }, 0)

        // Check if we have enough action points
        const requiredAP = selectedCard.apCost || 0
        const availableAP =
          this.currentPlayerBoard.actionPointsLine.reduce(
            (total, ap) => {
              return total + (!ap.isRested ? 1 : 0)
            },
            0,
          )

        if (
          availableEnergy >= requiredEnergy &&
          availableAP >= requiredAP
        ) {
          // Find first empty slot in energy line
          const emptyEnergySlot =
            this.currentPlayerBoard.energyLine.findIndex(
              slot => slot === null,
            )

          if (emptyEnergySlot !== -1) {
            // Move card from hand to energy line
            this.currentPlayerBoard.energyLine[emptyEnergySlot] =
              selectedCard
            this.currentPlayer.hand.splice(cardIdx, 1)

            // Use up required action points
            let apUsed = 0
            this.currentPlayerBoard.actionPointsLine.forEach(ap => {
              if (apUsed < requiredAP && !ap.isRested) {
                ap.isRested = true
                apUsed++
              }
            })
          }
        }
      }
    }

    // Play a card from hand to front line
    if (cardIdx !== undefined) {
      const selectedCard = this.currentPlayer.hand[cardIdx]
      if (selectedCard) {
        // Check if we have enough energy for the card
        const requiredEnergy = selectedCard.needEnergyData || 0
        const availableEnergy =
          this.currentPlayerBoard.energyLine.reduce((total, card) => {
            return total + (card?.generatedEnergyData || 0)
          }, 0)

        if (availableEnergy >= requiredEnergy) {
          // Find first empty slot in front line
          const emptyFrontSlot =
            this.currentPlayerBoard.frontLine.findIndex(
              slot => slot === null,
            )

          if (emptyFrontSlot !== -1) {
            // Move card from hand to front line
            this.currentPlayerBoard.frontLine[emptyFrontSlot] =
              selectedCard
            this.currentPlayer.hand.splice(cardIdx, 1)
          }
        }
      }
    }

    // Check for "When Played" activation timing ability on the newly played card
    const checkForWhenPlayedAbility = (card: Card) => {
      if (card.activationTimingAbility.includes('When Played')) {
        card.activateCardEffect()
      }
    }

    // Check both front line and energy line for newly played cards
    const lastPlayedFrontCard =
      this.currentPlayerBoard.frontLine.find(card => card !== null)
    const lastPlayedEnergyCard =
      this.currentPlayerBoard.energyLine.find(card => card !== null)

    if (lastPlayedFrontCard) {
      checkForWhenPlayedAbility(lastPlayedFrontCard)
    }

    if (lastPlayedEnergyCard) {
      checkForWhenPlayedAbility(lastPlayedEnergyCard)
    }

    // perform Raid on a card
    if (cardIdx !== undefined) {
      const selectedCard = this.currentPlayer.hand[cardIdx]
      if (selectedCard) {
        if (selectedCard.activationTimingAbility.includes('Raid')) {
          // Check front line and energy line for matching raid target
          const parsedEffect = parseEffects(selectedCard.effectData)
          const raidTarget = getRaidTarget(parsedEffect)
          const frontLineMatch =
            this.currentPlayerBoard.frontLine.some(
              card => card?.name === raidTarget,
            )
          const energyLineMatch =
            this.currentPlayerBoard.energyLine.some(
              card => card?.name === raidTarget,
            )

          if (frontLineMatch && energyLineMatch) {
            // Find the raid target card position
            const frontLineTargetIdx =
              this.currentPlayerBoard.frontLine.findIndex(
                card => card?.name === raidTarget,
              )
            const energyLineTargetIdx =
              this.currentPlayerBoard.energyLine.findIndex(
                card => card?.name === raidTarget,
              )

            // If target is in energy line, move both cards to front line
            if (energyLineTargetIdx !== -1) {
              const emptyFrontSlot =
                this.currentPlayerBoard.frontLine.findIndex(
                  card => card === null,
                )

              if (emptyFrontSlot !== -1) {
                // Move raid target from energy to front
                const targetCard =
                  this.currentPlayerBoard.energyLine[
                    energyLineTargetIdx
                  ]
                this.currentPlayerBoard.frontLine[emptyFrontSlot] =
                  targetCard
                this.currentPlayerBoard.energyLine[
                  energyLineTargetIdx
                ] = null

                // Play raiding card on top of target
                if (targetCard) {
                  targetCard.raidCard()
                  this.currentPlayerBoard.frontLine[emptyFrontSlot] =
                    selectedCard
                  this.currentPlayer.hand.splice(cardIdx, 1)
                }
              }
            }
            // If target is in front line, play raiding card on top of it
            else if (frontLineTargetIdx !== -1) {
              const targetCard =
                this.currentPlayerBoard.frontLine[frontLineTargetIdx]
              if (targetCard) {
                targetCard.raidCard()
                this.currentPlayerBoard.frontLine[
                  frontLineTargetIdx
                ] = selectedCard
                this.currentPlayer.hand.splice(cardIdx, 1)
              }
            }
          }
        }
      }
    }

    // use the Activate: Main ability of a card on the front line or energy line
    // check the frontline and energyline for cards with the Activate: Main ability
    const frontLineCard = this.currentPlayerBoard.frontLine.find(
      card =>
        card?.activationTimingAbility.includes('Activate: Main'),
    )
    const energyLineCard = this.currentPlayerBoard.energyLine.find(
      card =>
        card?.activationTimingAbility.includes('Activate: Main'),
    )

    if (frontLineCard) {
      frontLineCard.activateCardEffect()
    }
    if (energyLineCard) {
      energyLineCard.activateCardEffect()
    }
  }

  /** Attack Phase
   * handles events that happen in attack phase
   */
  public handleAttackPhase(attackingCardIdx?: number): void {
    if (attackingCardIdx === undefined) return

    const attackingCard =
      this.currentPlayerBoard.frontLine[attackingCardIdx]
    if (!attackingCard || attackingCard.isRested) return

    //const opponent = this.gameState.inactivePlayer
    const effects = parseEffects(attackingCard.effectData)
    //const hasSnipe = effects.some(effect => effect.includes('Snipe'))
    const hasDamage2 = effects.some(effect =>
      effect.includes('Damage 2'),
    )
    const damage = hasDamage2 ? 2 : 1
    console.log('damage', damage)

    //if (!hasSnipe && opponent.lifePoints.length > 0) {
    //  console.log('Before attack:', opponent.lifePoints.length)
    //  const removedCard = opponent.lifePoints.pop()
    //  console.log('After attack:', opponent.lifePoints.length)
    //
    //  if (removedCard) {
    //    // Check for trigger
    //    if (removedCard.trigger === 'Draw') {
    //      const activePlayer = this.gameState.getActivePlayer()
    //      activePlayer.hand.push(removedCard)
    //    }
    //
    //    // Add to removal area
    //    const removalArea =
    //      this.gameState.RemovalArea.get(opponent.id) || []
    //    this.gameState.RemovalArea.set(opponent.id, [
    //      ...removalArea,
    //      removedCard,
    //    ])
    //  }
    //}

    attackingCard.restCard()
  }

  /** End Phase
   * handles events that happen in end phase
   */
  //private handleEndPhase(cardIdxs: number[]): void {
  //  // if there are any abilities that activate at the start of the end phase, activate and resolve them now.
  //
  //  /**
  //   * Switch all resting cards to active
  //   */
  //  if (
  //    this.currentPlayerBoard.frontLine &&
  //    this.currentPlayerBoard.energyLine &&
  //    this.currentPlayerBoard.actionPointsLine
  //  ) {
  //    this.currentPlayerBoard.frontLine.map(card =>
  //      card?.activateCard(),
  //    )
  //    this.currentPlayerBoard.energyLine.map(card =>
  //      card?.activateCard(),
  //    )
  //    this.currentPlayerBoard.actionPointsLine.map(card =>
  //      card?.activateCard(),
  //    )
  //  }
  //
  //  /**
  //   * if you have more than 8 cards in your hand, chose cards to discard until you have 8 cards in your hand
  //   */
  //  if (this.currentPlayer.hand.length > 8) {
  //    // discard cards
  //    for (let i = 0; i < this.currentPlayer.hand.length - 8; i++) {
  //      //const [card] = this.currentPlayer.hand.splice(cardIdxs[i], 1)
  //      //this.currentPlayer.sendToRemovalArea(card)
  //    }
  //  }
  //
  //  /**
  //   * any abilities that state that they are active until the end of the turn now become inactive
  //   */
  //  if (
  //    this.currentPlayerBoard.frontLine &&
  //    this.currentPlayerBoard.energyLine
  //  ) {
  //    this.currentPlayerBoard.frontLine.map(card =>
  //      card?.deactivateCardEffect(),
  //    )
  //    this.currentPlayerBoard.energyLine.map(card =>
  //      card?.deactivateCardEffect(),
  //    )
  //  }
  //}
}
