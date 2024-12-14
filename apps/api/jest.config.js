const config = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  transform: {
    "^.+.tsx?$": "ts-jest",
  },
};

export default config;
