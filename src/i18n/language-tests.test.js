import 'jest';
import { messages_es } from './es';
import { messages_en } from './en';

const unsortedKeysEn = Object.keys(messages_en);
const unsortedKeysEs = Object.keys(messages_es);
const sortedKeysEn = Object.keys(messages_en).sort();
const sortedKeysEs = Object.keys(messages_es).sort();

describe('language files', () => {
  it('should have the same number of keys', () => {
    expect(messages_en.length).toEqual(messages_es.length);
  });

  it('should have the same keys in any order', () => {
    expect(sortedKeysEn).toEqual(sortedKeysEs);
  });

  describe('en', () => {
    it('should sort the keys alphabetically', () => {
      expect(unsortedKeysEn).toEqual(sortedKeysEn);
    });
  });

  describe('es', () => {
    it('should sort the keys alphabetically', () => {
      expect(unsortedKeysEs).toEqual(sortedKeysEs);
    });
  });
});
