import {Config} from 'jest';

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '../src',
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  }, testRegex: '.e2e-spec.ts$',
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: '<rootDir>/../src/database/typeOrmTestEnvironment',
};

export default config;

