import {
  Hand,
  Life,
  ActionPoints,
  EnergyArea,
  FrontLine,
  Deck,
  DiscardPile,
  Graveyard,
  Preview,
  Rules
} from './PlayArea'
import cardBack from '../assets/cards/card_back.png'
import cardFront from '../assets/cards/UE03ST_JJK-1-036.png'
import rules from '../assets/abilities.png'
import { useState } from 'react'

const GameLobby = () => {
  const playAreaCards = [cardBack, cardBack, cardBack, cardBack, cardBack, cardBack, cardBack]
  const [selectedImage, setSelectedImage] = useState(cardBack)

  const handleImageClick = (image: string) => {
    setSelectedImage(image)
  }

  return (
    <div className="h-screen w-screen bg-black flex justify-center items-center overflow-hidden">
      <div className="relative w-[98%] h-[95%] bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-lg p-4 shadow-lg">
        {/* Player One  */}

        <Hand
          cardBack={cardBack}
          cardFront={cardFront}
          groupOffsetY={410}
          groupOffsetX={100}
          cards={playAreaCards}
          onImageClick={handleImageClick}
        />
        <Life
          cardBack={cardBack}
          cardFront={cardFront}
          groupOffsetY={515}
          groupOffsetX={140}
          cards={playAreaCards}
          onImageClick={handleImageClick}
        />
        <ActionPoints
          cardBack={cardBack}
          cardFront={cardFront}
          groupOffsetY={430}
          groupOffsetX={518}
          cards={playAreaCards}
          onImageClick={handleImageClick}
        />
        <EnergyArea
          cardBack={cardBack}
          cardFront={cardFront}
          groupOffsetY={275}
          groupOffsetX={440}
          cards={playAreaCards}
          onImageClick={handleImageClick}
        />
        <FrontLine
          cardBack={cardBack}
          cardFront={cardFront}
          groupOffsetY={120}
          groupOffsetX={440}
          cards={playAreaCards}
          onImageClick={handleImageClick}
        />
        <Deck
          cardBack={cardBack}
          cardFront={cardFront}
          groupOffsetY={125}
          groupOffsetX={1100}
          cards={playAreaCards}
          onImageClick={handleImageClick}
        />
        <DiscardPile
          cardBack={cardBack}
          cardFront={cardFront}
          groupOffsetY={280}
          groupOffsetX={1100}
          cards={playAreaCards}
          onImageClick={handleImageClick}
        />
        <Graveyard
          cardBack={cardBack}
          cardFront={cardFront}
          groupOffsetY={450}
          groupOffsetX={1100}
          cards={playAreaCards}
          onImageClick={handleImageClick}
        />

        {/* Player Two  */}

        <Hand
          cardBack={cardBack}
          cardFront={cardFront}
          groupOffsetY={-400}
          groupOffsetX={1300}
          cards={playAreaCards}
          onImageClick={handleImageClick}
        />
        <Life
          cardBack={cardBack}
          cardFront={cardFront}
          groupOffsetY={200}
          groupOffsetX={1340}
          cards={playAreaCards}
          onImageClick={handleImageClick}
        />
        <ActionPoints
          cardBack={cardBack}
          cardFront={cardFront}
          groupOffsetY={-400}
          groupOffsetX={518}
          cards={playAreaCards}
          onImageClick={handleImageClick}
        />
        <EnergyArea
          cardBack={cardBack}
          cardFront={cardFront}
          groupOffsetY={-240}
          groupOffsetX={440}
          cards={playAreaCards}
          onImageClick={handleImageClick}
        />
        <FrontLine
          cardBack={cardBack}
          cardFront={cardFront}
          groupOffsetY={-90}
          groupOffsetX={440}
          cards={playAreaCards}
          onImageClick={handleImageClick}
        />
        <Deck
          cardBack={cardBack}
          cardFront={cardFront}
          groupOffsetY={-90}
          groupOffsetX={1100}
          cards={playAreaCards}
          onImageClick={handleImageClick}
        />
        <DiscardPile
          cardBack={cardBack}
          cardFront={cardFront}
          groupOffsetY={-240}
          groupOffsetX={1100}
          cards={playAreaCards}
          onImageClick={handleImageClick}
        />
        <Graveyard
          cardBack={cardBack}
          cardFront={cardFront}
          groupOffsetY={-410}
          groupOffsetX={1100}
          cards={playAreaCards}
          onImageClick={handleImageClick}
        />

        <Preview
          cardBack={cardBack}
          cardFront={selectedImage}
          groupOffsetY={-85}
          groupOffsetX={0}
        />
        <Rules cardBack={rules} cardFront={rules} groupOffsetY={450} groupOffsetX={1300} />
      </div>
    </div>
  )
}

export default GameLobby
