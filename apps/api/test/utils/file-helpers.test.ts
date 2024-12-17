import * as fs from 'fs/promises'
import { Dirent } from 'fs'
import {
  getDirectories,
  getFile,
  readCardFile,
} from '../../src/utils/file-helpers'
import { join } from 'path'
import { jest, describe, afterEach, it, expect } from '@jest/globals'

jest.mock('fs/promises', () => ({
  readdir: jest.fn(),
  readFile: jest.fn(),
}))

describe('file-helpers', () => {
  const mockDirectoryPath = '../cards'
  const mockFileName = 'card.json'

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('getDirectories', () => {
    it('should return a list of directories', async () => {
      const mockReaddir = fs.readdir as jest.MockedFunction<
        typeof fs.readdir
      >
      mockReaddir.mockResolvedValue([
        {
          name: 'dir1',
          isDirectory: () => true,
        } as unknown as Dirent,
        {
          name: 'dir2',
          isDirectory: () => true,
        } as unknown as Dirent,
        {
          name: 'file1',
          isDirectory: () => false,
        } as unknown as Dirent,
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
      const mockReaddir = fs.readdir as jest.MockedFunction<
        typeof fs.readdir
      > &
        jest.MockedFunction<(path: string) => Promise<string[]>>
      mockReaddir.mockResolvedValue([
        'file1.json',
        'card.json',
        'file3.txt',
      ])

      const filePath = await getFile('/some/path')
      expect(filePath).toBe(join('/some/path', mockFileName))
    })

    it('should return null if the file does not exist', async () => {
      const mockReaddir = fs.readdir as jest.MockedFunction<
        typeof fs.readdir
      >
      mockReaddir.mockResolvedValue([
        {
          name: 'file1.json',
          isFile: () => true,
        } as unknown as Dirent,
        {
          name: 'file3.txt',
          isFile: () => true,
        } as unknown as Dirent,
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
      const mockReadFile = fs.readFile as jest.MockedFunction<
        typeof fs.readFile
      >
      mockReadFile.mockResolvedValue(JSON.stringify(mockCardData))

      const cardData = await readCardFile('/some/path/card.json')
      expect(cardData).toEqual(mockCardData)
    })

    it('should throw an error for invalid JSON', async () => {
      const mockReadFile = fs.readFile as jest.MockedFunction<
        typeof fs.readFile
      >
      mockReadFile.mockResolvedValue('{ invalid json }')

      await expect(
        readCardFile('/some/path/card.json'),
      ).rejects.toThrow()
    })
  })
})
