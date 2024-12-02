import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import DropdownList from './DropdownList'
import InputField from './InputField'
import NavButton from './NavButton'

import cardBack from '../assets/cards/card_back.png'

import CardList from './CardList'
import DeckList from './DeckList'

const DeckBuilder = () => {
  const navigate = useNavigate()
  const [selectedDeck, setSelectedDeck] = useState('')
  const [selectedImage, setSelectedImage] = useState(cardBack)
  const [deckImages, setDeckImages] = useState<string[]>([])

  const MAX_CARDS = 50
  const CARD_LIMIT = 4

  const options = [
    { label: 'Option 1', value: 'Blue Sukuna' },
    { label: 'Option 2', value: 'Yellow Panda' },
    { label: 'Option 3', value: 'option3' }
  ]

  const handleImageClick = (image: string) => {
    setSelectedImage(image)
  }

  const handleAddToDeck = (card: string) => {
    const cardCount = deckImages.filter((image) => image === card).length
    if (deckImages.length >= MAX_CARDS) {
      alert(`Deck is full. Maximum limit of ${MAX_CARDS} cards reached.`)
      return
    }
    if (cardCount >= CARD_LIMIT) {
      alert(`Card limit reached. You can only have ${CARD_LIMIT} of the same card in a deck.`)
      return
    }
    setDeckImages((prevDeck) => [...prevDeck, card])
  }

  const handleRemoveFromDeck = (index: number) => {
    setDeckImages((prevDeck) => prevDeck.filter((_, i) => i !== index))
  }

  return (
    <div className="flex px-4 bg-black h-screen w-screen">
      <div className="h-auto w-[40%] pr-4">
        <div className="flex justify-around">
          <h1 className="text-4xl font-semibold text-white py-4">Deck Builder</h1>
          <div className="pt-4">
            <NavButton
              text="Back"
              onClick={() => navigate(-1)}
              variant="tertiary"
              size="full"
              widthSize="medium"
            />{' '}
          </div>
        </div>
        <div className="flex flex-col items-center bg-[#131313] h-[92%] w-[100%] bg-grid-pattern bg-grid-size rounded-3xl">
          <div className="py-8 flex items-center">
            <InputField
              placeholder="Deck Name"
              value={undefined}
              onChange={undefined}
              variant="tertiary"
              widthSize="large"
            />
            <div className="pl-8">
              <NavButton
                text="Save"
                onClick={() => navigate(-1)}
                variant="primary"
                size="full"
                widthSize="small"
              />
            </div>
          </div>
          <div className="pb-8 flex items-center">
            <DropdownList
              options={options}
              value={selectedDeck}
              onChange={(e) => setSelectedDeck(e.target.value)}
              placeholder="Choose Deck"
              variant="primary"
              size="large"
              widthSize="large"
            />
            <div className="pl-8">
              <NavButton
                text="Load"
                onClick={() => navigate(-1)}
                variant="primary"
                size="full"
                widthSize="small"
              />
            </div>
          </div>
          <div className=" flex items-center">
            <DropdownList
              options={options}
              value={selectedDeck}
              onChange={(e) => setSelectedDeck(e.target.value)}
              placeholder="Choose Deck"
              variant="primary"
              size="large"
              widthSize="large"
            />
            <div className="pl-8">
              <NavButton
                text="Delete"
                onClick={() => navigate(-1)}
                variant="primary"
                size="full"
                widthSize="small"
              />
            </div>
          </div>
          <div>
          <div className="flex items-center justify-center px-4 pt-6 text-white rounded-3xl">
          <h2 className="text-lg font-semibold">Total Cards in deck: {deckImages.length} / {MAX_CARDS}</h2>
        </div>
            <img src={selectedImage} alt="cardOne" className="px-10 pt-4" />
          </div>
        </div>
      </div>
      <div className="h-auto w-[100%] flex flex-col justify-evenly">
        <div className="flex items-center justify-center flex-wrap gap-4 bg-[#131313] h-[48%] w-[100%] bg-grid-pattern bg-grid-size rounded-3xl">
          <DeckList
            images={deckImages}
            onImageRightClick={handleRemoveFromDeck}
            onDrop={handleAddToDeck}
            isFull={deckImages.length >= MAX_CARDS}
          />
        </div>
        <div className="flex flex-col items-center justify-center bg-[#131313] h-[48%] w-[100%] bg-grid-pattern bg-grid-size rounded-3xl">
          <CardList onImageClick={handleImageClick} onImageDoubleClick={handleAddToDeck} />
        </div>
      </div>
    </div>
  )
}

export default DeckBuilder
