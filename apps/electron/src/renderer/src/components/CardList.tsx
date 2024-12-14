import type { CardData } from '../types'

interface CardListProps {
  onImageClick: (image: string) => void
  onImageDoubleClick: (image: string) => void
  cards: CardData[]
}

const CardList: React.FC<CardListProps> = ({ onImageClick, onImageDoubleClick, cards }) => {
  // Function to convert asset path to proper URL
  const getImageUrl = (imagePath: string) => {
    return `/src/${imagePath}` // Adjust the prefix based on your setup
  }

  return (
    <div
      className="h-full w-full overflow-y-scroll p-4 rounded-3xl flex flex-wrap gap-4"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {cards.map((card, index) => (
        <img
          key={index}
          src={getImageUrl(card.imagePath)}
          alt={`Image ${index + 1}`}
          className="rounded-md h-36 cursor-pointer"
          onClick={() => onImageClick(card.imagePath)}
          onDoubleClick={() => onImageDoubleClick(card.imagePath)}
          draggable="true"
          onDragStart={(e) => e.dataTransfer.setData('text/plain', card.imagePath)}
        />
      ))}
    </div>
  )
}

export default CardList
