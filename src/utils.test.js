import {
  capitaliseFirstLetter,
  getCurrentDateAsText,
  getCurrentTimeAsText,
} from './utils';

describe('Utilities tests', () => {
  describe('Is it a function', () => {
    it('Is getCurrentDate() a function', () => {
      expect(getCurrentDateAsText).toBeInstanceOf(Function);
    });
    it('Is getCurrentTime() a function', () => {
      expect(getCurrentTimeAsText).toBeInstanceOf(Function);
    });
    it('Is capitaliseFirstLetter() a function', () => {
      expect(capitaliseFirstLetter).toBeInstanceOf(Function);
    });
  });
  describe('Functional tests', () => {
    it('Get date as text returns Day, Month Date, Year', () => {
      const date = new Date('2025-09-01T00:00:00.000Z');
      expect(getCurrentDateAsText(date)).toBe('Monday, September 1, 2025');
    });
    it('Get current time as text', () => {
      const date = new Date('2025-09-01T19:52:00.000Z');
      expect(getCurrentTimeAsText(date)).toBe('21:52');
    });
    it('Get current time as text with leading 0', () => {
      const date = new Date('2025-09-01T05:02:00.000Z');
      expect(getCurrentTimeAsText(date)).toBe('07:02');
    });
    it('Capitalise phrase mamma mia', () => {
      const str = 'mamma mia';
      expect(capitaliseFirstLetter(str)).toBe('Mamma Mia');
    });
  });
});
