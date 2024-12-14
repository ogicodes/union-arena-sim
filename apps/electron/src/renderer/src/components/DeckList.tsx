import { motion, AnimatePresence } from 'framer-motion'

interface DeckListProps {
  images: string[]
  apImages: string[]
  onImageRightClick: (index: number) => void
  onDrop: (image: string) => void
  isFull: boolean
}

const DeckList: React.FC<DeckListProps> = ({
  images,
  apImages,
  onImageRightClick,
  onDrop,
  isFull
}) => {
  // Function to convert asset path to proper URL
  const getImageUrl = (imagePath: string) => {
    return `/src/${imagePath}`
  }

  // Group all cards (both regular and AP)
  const allImages = [...apImages, ...images]
  const groupedCards = allImages.reduce<{ [key: string]: string[] }>((acc, image) => {
    acc[image] = acc[image] ? [...acc[image], image] : [image]
    return acc
  }, {})

  return (
    <div
      className="h-full w-full overflow-y-scroll p-4 rounded-3xl flex flex-wrap gap-4"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      onDragOver={(e) => {
        if (!isFull) e.preventDefault()
      }}
      onDrop={(e) => {
        if (!isFull) {
          e.preventDefault()
          const image = e.dataTransfer.getData('text/plain')
          onDrop(image)
        } else {
          alert('Deck is full! Remove a card to add more.')
        }
      }}
    >
      {Object.entries(groupedCards).map(([image, cards], groupIndex) => (
        <motion.div
          key={groupIndex}
          className="relative w-36 h-36"
          layout // Enable smooth reordering
        >
          <AnimatePresence>
            {cards.map((_card, cardIndex) => (
              <motion.div
                key={cardIndex}
                initial={{ opacity: 0, scale: 0.9, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3 }}
                layout // Smoothly animate reordering
                style={{
                  position: 'absolute',
                  top: `${cardIndex * 12}px`, // Offset down by 4px per card
                  left: `${cardIndex * 12}px`, // Offset right by 4px per card
                  zIndex: cardIndex // Ensure proper stacking
                }}
                className="w-full h-full cursor-pointer"
                onContextMenu={(e) => {
                  e.preventDefault()
                  const removeIndex = images.findIndex((img, i) => img === image && i >= groupIndex)
                  onImageRightClick(removeIndex) // Remove the card
                }}
              >
                <img
                  src={getImageUrl(image)}
                  alt={`Deck Card ${groupIndex}`}
                  className="w-full h-full object-contain rounded-md"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  )
}

export default DeckList
