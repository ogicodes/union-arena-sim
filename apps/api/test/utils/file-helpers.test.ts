import * as fs from 'fs/promises'
import {
  getDirectories,
  getFile,
  readCardFile,
} from '../../src/utils/file-helpers'
import { join } from 'path'

jest.mock('fs/promises')

describe('file-helpers', () => {
  const mockDirectoryPath = '../cards'
  const mockFileName = 'card.json'

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('getDirectories', () => {
    it('should return a list of directories', async () => {
      ;(fs.readdir as jest.Mock).mockResolvedValue([
        { name: 'dir1', isDirectory: () => true },
        { name: 'dir2', isDirectory: () => true },
        { name: 'file1', isDirectory: () => false },
      ])

      const directories = await getDirectories()
      expect(directories).toEqual([
        join(mockDirectoryPath, 'dir1'),
        join(mockDirectoryPath, 'dir2'),
      ])
    })
  })

  describe('getFile', () => {
    it('should return the file path if the file exists', async () => {
      ;(fs.readdir as jest.Mock).mockResolvedValue([
        'file1.json',
        'card.json',
        'file3.txt',
      ])

      const filePath = await getFile('/some/path')
      expect(filePath).toBe(join('/some/path', mockFileName))
    })

    it('should return null if the file does not exist', async () => {
      ;(fs.readdir as jest.Mock).mockResolvedValue([
        'file1.json',
        'file3.txt',
      ])

      const filePath = await getFile('/some/path')
      expect(filePath).toBeNull()
    })
  })

  describe('readCardFile', () => {
    it('should return parsed JSON data', async () => {
      const mockCardData = {
        name: 'Test Card',
        effectData: 'Test Effect',
      }
      ;(fs.readFile as jest.Mock).mockResolvedValue(
        JSON.stringify(mockCardData),
      )

      const cardData = await readCardFile('/some/path/card.json')
      expect(cardData).toEqual(mockCardData)
    })

    it('should throw an error for invalid JSON', async () => {
      ;(fs.readFile as jest.Mock).mockResolvedValue(
        '{ invalid json }',
      )

      await expect(
        readCardFile('/some/path/card.json'),
      ).rejects.toThrow()
    })
  })
})
