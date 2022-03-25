/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: {
    "\\.(css|scss)$": "<rootDir>/src/__tests__/__mocks__/styleMock.js",
    "\\.svg": "<rootDir>/src/__tests__/__mocks__/svgMock.tsx",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/src/__tests__/__mocks__/fileMock.js",
  },
  modulePathIgnorePatterns: [
    "<rootDir>/src/__tests__/__mocks__/*.(js|jsx|ts|tsx|)",
  ],
};
