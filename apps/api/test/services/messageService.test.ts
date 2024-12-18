import { test, describe } from '@jest/globals'
import { processMessage } from '../../src/services/messageService'

describe('processMessage', () => {
  test('should correctly process the message', () => {
    const inputMessage = 'Hello'
    const expectedOutput = 'Processed: Hello'

    const result = processMessage(inputMessage)

    expect(result).toBe(expectedOutput)
  })
})
