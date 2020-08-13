module.exports = {
  preset: 'react-native',
  setupFiles: [
    './jest/setupFile.js',
    './node_modules/react-native-gesture-handler/jestSetup.js',
  ],
  rootDir: '../',
  testPathIgnorePatterns: [
    'e2e',
    'node_modules',
    'node_modules/(?!(@react-native-community|react-native)/)',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|react-native-button|native-base-.*|native-base|react-native-.*)/)',
  ],
};
