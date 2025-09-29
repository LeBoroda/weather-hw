import { getDateAsText, getTimeAsText } from './text-utility';

describe('Test text fomtatting unitliity', () => {
  describe('Is it a function', () => {
    it('getDateAsText() should be function', () => {
      expect(getDateAsText).toBeInstanceOf(Function);
    });
    it('getTimeAsText()) should be function', () => {
      expect(getTimeAsText).toBeInstanceOf(Function);
    });
  });
  describe('Functional tests', () => {
    it('getTimeAsText() should return given UTC time', () => {
      const date = new Date('2000-09-28T11:11:37.827');
      console.log(date);
      expect(getTimeAsText(date, false)).toBe('11:11');
    });
    it('getTimeAsText() should return given UTC time with leading zero', () => {
      const date = new Date('2000-09-28T07:07:07.827');
      console.log(date);
      expect(getTimeAsText(date, false)).toBe('07:07');
    });
    it('getTimeAsText() should return given local time', () => {
      const date = new Date('2000-09-28T11:11:37.827Z');
      console.log(date);
      expect(getTimeAsText(date, true)).toBe('11:11');
    });
    it('getDateAsText() should return current date  as Day, date Month, YEAR', () => {
      const date = new Date('2000-09-28T07:11:37.827Z');
      expect(getDateAsText(date)).toBe('Thursday, September 28, 2000');
    });
  });
});
