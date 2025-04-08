module.exports = {
  preset: 'jest-preset-angular',

  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.html$',
      astTransformers: [
        'jest-preset-angular/build/InlineFilesTransformer',
        'jest-preset-angular/build/StripStylesTransformer',
      ],
      isolatedModules: true, // mandatory for a boost of perfomance
    },
  },
  setupFilesAfterEnv: ['jest-extended'],
  roots: ['<rootDir>'],
};
