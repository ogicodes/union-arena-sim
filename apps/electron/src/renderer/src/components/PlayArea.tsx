import { motion } from 'framer-motion'
import { useState } from 'react'

type PlayerProps = {
  cards?: string[]

  cardBack: string

  cardFront: string

  groupOffsetY?: number

  groupOffsetX?: number

  onImageClick?: (image: string) => void
}

export const Life = ({ cardBack, cardFront, groupOffsetY, groupOffsetX }: PlayerProps) => {
  return (
    <div className="relative">
      {Array.from({ length: 7 }).map((_, i) => (
        <Card
          key={i}
          cardBack={cardBack}
          cardFront={cardFront}
          tilt={90}
          offsetY={i}
          offsetX={1}
          groupOffsetY={groupOffsetY}
          groupOffsetX={groupOffsetX}
        />
      ))}
    </div>
  )
}

export const Hand = ({ cardBack, cardFront, groupOffsetY, groupOffsetX }: PlayerProps) => {
  return (
    <div className="relative">
      {Array.from({ length: 7 }).map((_, i) => (
        <Card
          key={i}
          cardBack={cardBack}
          cardFront={cardFront}
          tilt={0}
          offsetX={i}
          offsetY={18}
          groupOffsetY={groupOffsetY}
          groupOffsetX={groupOffsetX}
          className="h-52 w-auto"
        />
      ))}
    </div>
  )
}

export const ActionPoints = ({ cardBack, cardFront, groupOffsetY, groupOffsetX }: PlayerProps) => {
  return (
    <div className="relative">
      {Array.from({ length: 3 }).map((_, i) => (
        <Card
          key={i}
          cardBack={cardBack}
          cardFront={cardFront}
          tilt={0}
          offsetX={i * 8}
          offsetY={20}
          groupOffsetY={groupOffsetY}
          groupOffsetX={groupOffsetX}
        />
      ))}
    </div>
  )
}

export const EnergyArea = ({ cardBack, cardFront, groupOffsetY, groupOffsetX }: PlayerProps) => {
  return (
    <div className="relative">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card
          key={i}
          cardBack={cardBack}
          cardFront={cardFront}
          tilt={0}
          offsetX={i * 8}
          offsetY={20}
          groupOffsetY={groupOffsetY}
          groupOffsetX={groupOffsetX}
        />
      ))}
    </div>
  )
}

export const FrontLine = ({ cardBack, cardFront, groupOffsetY, groupOffsetX }: PlayerProps) => {
  return (
    <div className="relative">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card
          key={i}
          cardBack={cardBack}
          cardFront={cardFront}
          tilt={0}
          offsetX={i * 8}
          offsetY={20}
          groupOffsetY={groupOffsetY}
          groupOffsetX={groupOffsetX}
        />
      ))}
    </div>
  )
}

export const Deck = ({ cardBack, cardFront, groupOffsetY, groupOffsetX }: PlayerProps) => {
  return (
    <div className="relative">
      <Card
        cardBack={cardBack}
        cardFront={cardFront}
        tilt={0}
        offsetX={0}
        offsetY={20}
        groupOffsetY={groupOffsetY}
        groupOffsetX={groupOffsetX}
      />
    </div>
  )
}

export const DiscardPile = ({ cardBack, cardFront, groupOffsetY, groupOffsetX }: PlayerProps) => {
  return (
    <div className="relative">
      <Card
        cardBack={cardBack}
        cardFront={cardFront}
        tilt={0}
        offsetX={0}
        offsetY={20}
        groupOffsetY={groupOffsetY}
        groupOffsetX={groupOffsetX}
      />
    </div>
  )
}

export const Graveyard = ({ cardBack, cardFront, groupOffsetY, groupOffsetX }: PlayerProps) => {
  return (
    <div className="relative">
      <Card
        cardBack={cardBack}
        cardFront={cardFront}
        tilt={90}
        offsetX={0}
        offsetY={20}
        groupOffsetY={groupOffsetY}
        groupOffsetX={groupOffsetX}
      />
    </div>
  )
}

export const Preview = ({ cardBack, cardFront, groupOffsetY, groupOffsetX }: PlayerProps) => {
  return (
    <div className="relative">
      <Card
        cardBack={cardBack}
        cardFront={cardFront}
        tilt={0}
        offsetX={2}
        offsetY={4}
        groupOffsetY={groupOffsetY}
        groupOffsetX={groupOffsetX}
        className="h-96 w-auto"
      />
    </div>
  )
}

export const Rules = ({ cardBack, cardFront, groupOffsetY, groupOffsetX }: PlayerProps) => {
  return (
    <div className="relative">
      <Card
        cardBack={cardBack}
        cardFront={cardFront}
        tilt={0}
        offsetX={2}
        offsetY={4}
        groupOffsetY={groupOffsetY}
        groupOffsetX={groupOffsetX}
        className="h-96 w-auto"
      />
    </div>
  )
}

export const Card = ({
  cardBack,
  cardFront,
  tilt = 0,
  offsetY = 0,
  offsetX = 0,
  groupOffsetY = 0,
  groupOffsetX = 0,
  className = ''
}: {
  cardBack: string
  cardFront: string
  tilt?: number
  offsetY?: number
  offsetX?: number
  groupOffsetY?: number
  groupOffsetX?: number
  className?: string
}) => {
  const [isFlipped, setIsFlipped] = useState(false)

  const variants = {
    hover: { scale: 1.1, boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.5)' },
    tap: { scale: 0.95 },
    click: { rotateY: isFlipped ? 180 : 0 }
  }

  return (
    <motion.div
      variants={variants}
      className={`absolute h-36 w-[100px] rounded-lg shadow-md ${className}`}
      whileHover="hover"
      whileTap="tap"
      onTap={() => setIsFlipped(!isFlipped)}
      style={{
        rotate: `${tilt}deg`,
        zIndex: isFlipped ? 10 : 0,
        y: groupOffsetY + offsetY * 20,
        x: groupOffsetX + offsetX * 20
      }}
    >
      <img src={!isFlipped ? cardBack : cardFront} alt="Card" className={`h-36 ${className}`} />
    </motion.div>
  )
}
