import { getDateAsText, getTimeAsText } from './text-utility';

describe('Text formatting utility', () => {
  describe('API shape', () => {
    it('getDateAsText() should be a function', () => {
      expect(getDateAsText).toBeInstanceOf(Function);
    });
    it('getTimeAsText() should be a function', () => {
      expect(getTimeAsText).toBeInstanceOf(Function);
    });
  });

  describe('getTimeAsText()', () => {
    it('returns local time (HH:MM) — no leading zero needed', () => {
      const date = new Date('2000-09-28T11:11:37.827'); // local time path
      expect(getTimeAsText(date, false)).toBe('11:11');
    });

    it('returns local time (HH:MM) — with leading zeros', () => {
      const date = new Date('2000-09-28T07:07:07.827'); // local time path
      expect(getTimeAsText(date, false)).toBe('07:07');
    });

    it('returns UTC time (HH:MM) when useUTC = true', () => {
      const date = new Date('2000-09-28T11:11:37.827Z'); // UTC path
      expect(getTimeAsText(date, true)).toBe('11:11');
    });

    it('pads midnight correctly (local)', () => {
      const date = new Date('2000-09-28T00:00:00.000');
      expect(getTimeAsText(date, false)).toBe('00:00');
    });

    it('uses UTC branch even if local time differs', () => {
      const date = new Date('2000-09-28T23:59:00.000Z');
      expect(getTimeAsText(date, true)).toBe('23:59');
    });
  });

  describe('getDateAsText()', () => {
    it('returns date formatted as "Weekday, Month Day, Year" (en-US)', () => {
      const date = new Date('2000-09-28T07:11:37.827Z');
      expect(getDateAsText(date)).toBe('Thursday, September 28, 2000');
    });

    it('formats a different date consistently', () => {
      const date = new Date('1999-01-01T12:00:00.000Z');
      expect(getDateAsText(date)).toBe('Friday, January 1, 1999');
    });
  });
});
