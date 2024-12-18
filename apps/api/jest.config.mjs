const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['./test'],
  transform: {
    '^.+.tsx?$': 'ts-jest',
  },
}

export default config
