const MOCKS_PATH = '<rootDir>/src/shared/config/__mocks__';

module.exports = {
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**'
  ],

  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  transform: {
    // Use babel-jest to transpile tests with the next/babel preset
    // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
    '^.+\\.(js|jsx|ts|tsx|mjs)$': [
      'babel-jest',
      {
        presets: ['next/babel']
      }
    ]
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(next-intl|use-intl|swiper|ssr-window|dom7)/)',
    '^.+\\.module\\.(css|sass|scss|less)$'
  ],
  /* eslint-disable perfectionist/sort-objects */
  moduleNameMapper: {
    // Handle CSS imports (without CSS modules)
    '^.+\\.(css|sass|scss|less)$': `${MOCKS_PATH}/style.mock.ts`,
    '^swiper/(css|sass|scss|less)/*': `${MOCKS_PATH}/style.mock.ts`,

    // Handle image imports
    // https://jestjs.io/docs/webpack#handling-static-assets
    '^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$': `${MOCKS_PATH}/file.mock.ts`,

    // Handle CSS imports (with CSS modules)
    // https://jestjs.io/docs/webpack#mocking-css-modules
    '^.+\\.module\\.(css|sass|scss|less)$': 'identity-obj-proxy',

    // Handle module aliases
    '^@/(.*)$': '<rootDir>/src/$1',

    // Handle Next.js specific imports
    '^next/font/google$': `${MOCKS_PATH}/nextFontGoogle.mock.ts`
  }
};
