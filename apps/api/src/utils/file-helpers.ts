import fs from 'fs/promises'
import { join } from 'path'

const directoryPath = '../cards'
const fileName = 'card.json'

export const getDirectories = async (): Promise<string[]> => {
  const entries = await fs.readdir(directoryPath, {
    withFileTypes: true,
  })

  return entries
    .filter(entry => entry.isDirectory())
    .map(entry => join(directoryPath, entry.name))
}

export const getFile = async (
  path: string,
): Promise<string | null> => {
  const files = await fs.readdir(path)

  for (const file of files) {
    if (file === fileName) {
      return join(path, file)
    }
  }
  return null
}

export const readCardFile = async (
  filePath: string,
): Promise<Record<string, unknown>> => {
  const data = await fs.readFile(filePath, 'utf-8')
  return JSON.parse(data)
}
