import { ipcMain, app } from 'electron'
import { promises as fs } from 'fs'
import { join, sep } from 'path'

async function getAllCardFiles(
  dirPath: string
): Promise<{ imagePath: string; jsonPath: string }[]> {
  const cardFiles: { imagePath: string; jsonPath: string }[] = []

  const items = await fs.readdir(dirPath, { withFileTypes: true })

  for (const item of items) {
    const fullPath = join(dirPath, item.name)

    if (item.isDirectory()) {
      // Look for card-image.webp and card.json in each card folder
      try {
        const imagePath = join(fullPath, 'card-image.webp')
        const jsonPath = join(fullPath, 'card.json')

        // Check if both files exist
        await fs.access(imagePath)
        await fs.access(jsonPath)

        cardFiles.push({ imagePath, jsonPath })
      } catch (error) {
        console.log(`Skipping folder ${item.name}: missing required files`)
      }
    }
  }

  return cardFiles
}

export function setupIPC(): void {
  console.log('Setting up IPC handlers...')

  ipcMain.handle('load-cards', async () => {
    try {
      const cardsPath = app.isPackaged
        ? join(process.resourcesPath, 'assets/cards')
        : join(__dirname, '../../src/renderer/src/assets/cards')

      console.log('Looking for cards in:', cardsPath)

      // Get all card files
      const cardFiles = await getAllCardFiles(cardsPath)
      console.log(`Found ${cardFiles.length} card folders`)

      const cards = await Promise.all(
        cardFiles.map(async ({ imagePath, jsonPath }) => {
          try {
            // Read the card.json file
            const cardData = JSON.parse(await fs.readFile(jsonPath, 'utf-8'))

            // Get the folder name (card ID) from the path
            const cardFolder = imagePath.split('cards' + sep)[1].split(sep)[0]

            return {
              imagePath: `assets/cards/${cardFolder}/card-image.webp`,
              cardInfo: {
                ...cardData, // Use data from card.json
                // Fallback values for any missing properties
                rarity: cardData.rarity || 'Common',
                name: cardData.name || cardFolder,
                seriesName: cardData.seriesName || 'Default Series',
                series: cardData.series || 'Default',
                needEnergyData: cardData.needEnergyData || 0,
                color: cardData.color || 'None',
                apData: cardData.apData || 0,
                categoryData: cardData.categoryData || 'None',
                bpData: cardData.bpData || 0,
                attributeData: cardData.attributeData || null,
                generatedEnergyData: cardData.generatedEnergyData || 0,
                effectData: cardData.effectData || null,
                triggerData: cardData.triggerData || null,
                getInfoData: cardData.getInfoData || null
              }
            }
          } catch (err) {
            console.error(`Error processing card at ${imagePath}:`, err)
            console.error('Full error details:', err)
            return null
          }
        })
      )

      const validCards = cards.filter(Boolean)
      console.log(`Successfully loaded ${validCards.length} cards`)
      return validCards
    } catch (error) {
      console.error('Error in load-cards handler:', error)
      throw error
    }
  })

  console.log('Registering save-deck handler...')
  ipcMain.handle('save-deck', async (_, { deckName, deckImages, apDeckImages }) => {
    console.log('Save deck called with:', { deckName, deckImages, apDeckImages })
    try {
      const decksPath = app.isPackaged
        ? join(process.resourcesPath, 'assets/decks')
        : join(__dirname, '../../src/renderer/src/assets/decks')

      // Create decks directory if it doesn't exist
      await fs.mkdir(decksPath, { recursive: true })

      const deckFolderPath = join(decksPath, deckName)
      await fs.mkdir(deckFolderPath, { recursive: true })

      // Save deck data as JSON
      const deckData = {
        name: deckName,
        mainDeck: deckImages,
        apDeck: apDeckImages
      }

      await fs.writeFile(join(deckFolderPath, 'deck.json'), JSON.stringify(deckData, null, 2))

      return { success: true }
    } catch (error) {
      console.error('Error saving deck:', error)
      throw error
    }
  })

  ipcMain.handle('load-decks', async () => {
    try {
      const decksPath = app.isPackaged
        ? join(process.resourcesPath, 'assets/decks')
        : join(__dirname, '../../src/renderer/src/assets/decks')

      console.log('Looking for decks in:', decksPath)

      // Create decks directory if it doesn't exist
      await fs.mkdir(decksPath, { recursive: true })

      const deckFolders = await fs.readdir(decksPath)
      console.log('Found deck folders:', deckFolders)

      const decks = await Promise.all(
        deckFolders.map(async (folder) => {
          try {
            const deckFile = join(decksPath, folder, 'deck.json')
            console.log('Reading deck file:', deckFile)
            const deckData = JSON.parse(await fs.readFile(deckFile, 'utf-8'))
            console.log('Loaded deck data:', deckData)
            return {
              name: folder,
              ...deckData
            }
          } catch (err) {
            console.error(`Error loading deck ${folder}:`, err)
            return null
          }
        })
      )

      const validDecks = decks.filter(Boolean)
      console.log('Returning decks:', validDecks)
      return validDecks
    } catch (error) {
      console.error('Error loading decks:', error)
      throw error
    }
  })

  ipcMain.handle('delete-deck', async (_, deckName: string) => {
    try {
      const decksPath = app.isPackaged
        ? join(process.resourcesPath, 'assets/decks')
        : join(__dirname, '../../src/renderer/src/assets/decks')

      const deckPath = join(decksPath, deckName)
      await fs.rm(deckPath, { recursive: true })
      return { success: true }
    } catch (error) {
      console.error('Error deleting deck:', error)
      throw error
    }
  })

  console.log('IPC handlers setup complete')
}
