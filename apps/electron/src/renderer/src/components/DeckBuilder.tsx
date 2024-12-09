import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import loadAllCards from '../utils/load-cards'
import type { CardData } from '../types'

import DropdownList from './DropdownList'
import InputField from './InputField'
import NavButton from './NavButton'

import cardBack from '../assets/card_back.png'

import CardList from './CardList'
import DeckList from './DeckList'

const DeckBuilder = () => {
  const navigate = useNavigate()
  const [selectedDeck, setSelectedDeck] = useState('')
  const [selectedImage, setSelectedImage] = useState(cardBack)
  const [deckImages, setDeckImages] = useState<string[]>([])
  const [apDeckImages, setApDeckImages] = useState<string[]>([])
  const [cards, setCards] = useState<CardData[]>([])
  const MAX_CARDS = 50
  const MAX_AP_CARDS = 3
  const CARD_LIMIT = 4
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [seriesFilter, setSeriesFilter] = useState<string>('all')
  const [colorFilter, setColorFilter] = useState<string>('all')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [apFilter, setApFilter] = useState<string>('all')
  const [needEnergyFilter, setNeedEnergyFilter] = useState<string>('all')
  const [generatedEnergyFilter, setGeneratedEnergyFilter] = useState<string>('all')
  const [deckName, setDeckName] = useState('')
  const [savedDecks, setSavedDecks] = useState<
    Array<{ name: string; mainDeck: string[]; apDeck: string[] }>
  >([])
  const [reloadTrigger, setReloadTrigger] = useState(0)

  const handleImageClick = (image: string) => {
    console.log('Clicked image path:', image)
    setSelectedImage(image)
  }

  const handleAddToDeck = (card: string) => {
    // Find the card data to check if it's an AP card
    const cardData = cards.find((c) => c.imagePath === card)
    const isAPCard = cardData?.cardInfo.categoryData.toLowerCase() === 'action point'

    if (isAPCard) {
      if (apDeckImages.length >= MAX_AP_CARDS) {
        alert(`AP Deck is full. Maximum limit of ${MAX_AP_CARDS} AP cards reached.`)
        return
      }
      setApDeckImages((prevDeck) => [...prevDeck, card])
    } else {
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
  }

  const handleRemoveFromDeck = (index: number) => {
    // Check if the card is in the AP deck
    if (index < apDeckImages.length) {
      setApDeckImages((prevDeck) => prevDeck.filter((_, i) => i !== index))
    } else {
      setDeckImages((prevDeck) => prevDeck.filter((_, i) => i !== index))
    }
  }

  useEffect(() => {
    const loadCards = async () => {
      try {
        setIsLoading(true)
        const loadedCards = await loadAllCards()
        if (!loadedCards) {
          throw new Error('No cards were loaded')
        }
        setCards(loadedCards)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load cards')
        console.error('Error loading cards:', err)
      } finally {
        setIsLoading(false)
      }
    }
    loadCards()
  }, [])

  useEffect(() => {
    loadSavedDecks()
  }, [reloadTrigger])

  const loadSavedDecks = async () => {
    try {
      const decks = await window.electron.loadDecks()
      setSavedDecks(decks)
    } catch (error) {
      console.error('Error loading decks:', error)
    }
  }

  const handleLoadDeck = (deckName: string) => {
    const deck = savedDecks.find((d) => d.name === deckName)
    if (deck) {
      // Clear the new deck name field first
      setDeckName('')
      setDeckImages(deck.mainDeck)
      setApDeckImages(deck.apDeck)
      setSelectedDeck(deckName)
      setReloadTrigger((prev) => prev + 1)
    }
  }

  // Add a clear function for when starting a new deck
  const handleNewDeck = () => {
    setDeckName('')
    setDeckImages([])
    setApDeckImages([])
    setSelectedDeck('')
    setReloadTrigger((prev) => prev + 1)
  }

  const handleDeleteDeck = async (deckName: string) => {
    if (!deckName) return

    if (window.confirm(`Are you sure you want to delete deck "${deckName}"?`)) {
      try {
        await window.electron.deleteDeck(deckName)
        if (selectedDeck === deckName) {
          setSelectedDeck('')
          setDeckImages([])
          setApDeckImages([])
          setDeckName('')
        }
        setReloadTrigger((prev) => prev + 1)
        alert('Deck deleted successfully')
      } catch (error) {
        console.error('Error deleting deck:', error)
        alert('Failed to delete deck')
      }
    }
  }

  // Filter the cards based on all criteria
  const filteredCards = cards.filter((card) => {
    if (seriesFilter !== 'all' && card.cardInfo.series !== seriesFilter) return false
    if (colorFilter !== 'all' && card.cardInfo.color !== colorFilter) return false
    if (categoryFilter !== 'all' && card.cardInfo.categoryData !== categoryFilter) return false
    if (apFilter !== 'all' && card.cardInfo.apData.toString() !== apFilter) return false
    if (needEnergyFilter !== 'all' && card.cardInfo.needEnergyData.toString() !== needEnergyFilter)
      return false
    if (
      generatedEnergyFilter !== 'all' &&
      card.cardInfo.generatedEnergyData.toString() !== generatedEnergyFilter
    )
      return false
    return true
  })

  // Get unique values for each filter
  const getUniqueValues = (field: keyof (typeof cards)[0]['cardInfo']) => {
    const values = new Set(cards.map((card) => card.cardInfo[field]))
    return ['all', ...Array.from(values)].filter(Boolean)
  }

  const validateDeck = (): { isValid: boolean; error?: string } => {
    // Check deck size
    if (deckImages.length !== 50) {
      return {
        isValid: false,
        error: `Deck must contain exactly 50 cards. Current count: ${deckImages.length}`
      }
    }

    // Get the first card's data to compare against
    const firstCard = cards.find((card) => card.imagePath === deckImages[0])
    if (!firstCard) {
      return { isValid: false, error: 'Could not validate first card in deck' }
    }

    const baseColor = firstCard.cardInfo.color
    const baseSeries = firstCard.cardInfo.series

    // Check each card in the deck
    for (const imagePath of deckImages) {
      const cardData = cards.find((card) => card.imagePath === imagePath)
      if (!cardData) {
        return {
          isValid: false,
          error: `Could not find data for card: ${imagePath}`
        }
      }

      // Check color
      if (cardData.cardInfo.color !== baseColor) {
        return {
          isValid: false,
          error: `All cards must be ${baseColor}. Found ${cardData.cardInfo.color} card: ${cardData.cardInfo.name}`
        }
      }

      // Check series
      if (cardData.cardInfo.series !== baseSeries) {
        return {
          isValid: false,
          error: `All cards must be from ${baseSeries}. Found ${cardData.cardInfo.series} card: ${cardData.cardInfo.name}`
        }
      }
    }

    return { isValid: true }
  }

  const handleSaveDeck = async () => {
    if (!deckName.trim()) {
      alert('Please enter a deck name')
      return
    }

    // Validate deck before saving
    const validation = validateDeck()
    if (!validation.isValid) {
      alert(`Invalid deck: ${validation.error}`)
      return
    }

    try {
      await window.electron.saveDeck({
        deckName: deckName.trim(),
        deckImages,
        apDeckImages
      })
      setReloadTrigger((prev) => prev + 1)
      alert('Deck saved successfully!')
    } catch (error) {
      console.error('Error saving deck:', error)
      alert('Failed to save deck: ' + (error instanceof Error ? error.message : 'Unknown error'))
    }
  }

  if (error) {
    return <div className="text-red-500">Error loading cards: {error}</div>
  }

  if (isLoading) {
    return <div className="text-white">Loading cards...</div>
  }

  console.log('Current selectedImage:', selectedImage)

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
          <div className="py-8 flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <InputField
                placeholder="New Deck Name"
                value={deckName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDeckName(e.target.value)}
                variant="tertiary"
                widthSize="large"
              />
              <div className="flex gap-2">
                <NavButton
                  text="Save"
                  onClick={handleSaveDeck}
                  variant="primary"
                  size="full"
                  widthSize="small"
                />
                <NavButton
                  text="New"
                  onClick={handleNewDeck}
                  variant="secondary"
                  size="full"
                  widthSize="small"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <DropdownList
                options={savedDecks.map((deck) => ({ label: deck.name, value: deck.name }))}
                value={selectedDeck}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setSelectedDeck(e.target.value)
                }
                placeholder="Select Deck"
                variant="primary"
                size="small"
                widthSize="large"
              />
              <div className="flex gap-2">
                <NavButton
                  text="Load"
                  onClick={() => handleLoadDeck(selectedDeck)}
                  variant="secondary"
                  size="full"
                  widthSize="small"
                  disabled={!selectedDeck}
                />
                <NavButton
                  text="Delete"
                  onClick={() => handleDeleteDeck(selectedDeck)}
                  variant="danger"
                  size="full"
                  widthSize="small"
                  disabled={!selectedDeck}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 pl-16 pt-4">
            <DropdownList
              options={getUniqueValues('series').map((value) => ({ label: value, value }))}
              value={seriesFilter}
              onChange={(e) => setSeriesFilter(e.target.value)}
              placeholder="Series"
              variant="primary"
              size="small"
              widthSize="medium"
            />
            <DropdownList
              options={getUniqueValues('color').map((value) => ({ label: value, value }))}
              value={colorFilter}
              onChange={(e) => setColorFilter(e.target.value)}
              placeholder="Color"
              variant="primary"
              size="small"
              widthSize="medium"
            />
            <DropdownList
              options={getUniqueValues('categoryData').map((value) => ({ label: value, value }))}
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              placeholder="Category"
              variant="primary"
              size="small"
              widthSize="medium"
            />
            <DropdownList
              options={getUniqueValues('apData').map((value) => ({
                label: value.toString(),
                value: value.toString()
              }))}
              value={apFilter}
              onChange={(e) => setApFilter(e.target.value)}
              placeholder="AP"
              variant="primary"
              size="small"
              widthSize="medium"
            />
            <DropdownList
              options={getUniqueValues('needEnergyData').map((value) => ({
                label: value.toString(),
                value: value.toString()
              }))}
              value={needEnergyFilter}
              onChange={(e) => setNeedEnergyFilter(e.target.value)}
              placeholder="Need Energy"
              variant="primary"
              size="small"
              widthSize="medium"
            />
            <DropdownList
              options={getUniqueValues('generatedEnergyData').map((value) => ({
                label: value.toString(),
                value: value.toString()
              }))}
              value={generatedEnergyFilter}
              onChange={(e) => setGeneratedEnergyFilter(e.target.value)}
              placeholder="Generated Energy"
              variant="primary"
              size="small"
              widthSize="medium"
            />
          </div>
          <div>
            <div className="flex items-center justify-center px-4 pt-6 text-white rounded-3xl">
              <div className="flex flex-col justify-center items-center">
                <h2 className="text-lg font-semibold">
                  Total Cards in deck: {deckImages.length} / {MAX_CARDS}
                </h2>
                <h2 className="text-lg font-semibold">
                  Total Cards in AP Deck: {apDeckImages.length} / {MAX_AP_CARDS}
                </h2>
              </div>
            </div>
            <img
              src={selectedImage === cardBack ? cardBack : `/src/${selectedImage}`}
              alt="Selected Card"
              className="px-10 pt-4 h-[500px]"
              onError={(e) => console.error('Image failed to load:', e.currentTarget.src)}
            />
          </div>
        </div>
      </div>
      <div className="h-auto w-[100%] flex flex-col justify-evenly">
        <div className="flex items-center justify-center flex-wrap gap-4 bg-[#131313] h-[48%] w-[100%] bg-grid-pattern bg-grid-size rounded-3xl">
          <DeckList
            images={deckImages}
            apImages={apDeckImages}
            onImageRightClick={handleRemoveFromDeck}
            onDrop={handleAddToDeck}
            isFull={deckImages.length >= MAX_CARDS}
          />
        </div>
        <div className="flex flex-col items-center justify-center bg-[#131313] h-[48%] w-[100%] bg-grid-pattern bg-grid-size rounded-3xl">
          <CardList
            onImageClick={handleImageClick}
            onImageDoubleClick={handleAddToDeck}
            cards={filteredCards}
          />
        </div>
      </div>
    </div>
  )
}

export default DeckBuilder
