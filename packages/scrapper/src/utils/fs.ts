import { writeFile as fsWriteFile } from 'fs/promises'
import fs from 'fs/promises'

/**
 * Handles directory creation
 * */
export const createDir = async (dirPath: string): Promise<void> => {
  try {
    await fs.mkdir(dirPath, { recursive: true })
  } catch (e) {
    throw new Error(`Unable to create directory at ${dirPath}: ${e}`)
  }
}

/**
 * Handles file writing
 * */
export const writeFile = async (
  data: any,
  filePath: string,
): Promise<boolean> => {
  try {
    await fsWriteFile(filePath, JSON.stringify(data, null, 2), 'utf8')
    return true
  } catch (e) {
    throw new Error(`Unable to write file for card ${data}: ${e}`)
  }
}

/**
 * Handles image writing
 * */
export const writeImage = async (
  url: string,
  dirPath: string,
): Promise<void> => {
  try {
    // targets the hd endpoint for images
    const updatedUrl = url.replace('/sd/', '/hd/')

    const response = await fetch(updatedUrl, { method: 'GET' })

    if (response.status === 404) {
      console.warn(`Skipping: ${url} (404)`)
      return
    }

    if (!response.ok) {
      throw new Error(
        `Failed to fetch image. Status: ${response.status}`,
      )
    }

    const arrBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrBuffer)

    await fsWriteFile(dirPath, buffer)
  } catch (e) {
    throw new Error(`Unable to write image ${url}: ${e}`)
  }
}
