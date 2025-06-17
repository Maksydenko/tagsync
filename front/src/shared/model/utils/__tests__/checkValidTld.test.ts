import { checkValidTld } from '../checkValidTld.util';

describe('checkValidTld', () => {
  it('correct value', () => {
    expect(checkValidTld('test@gmail.com')).toBe(true);
    expect(checkValidTld('test@gmail.com.uk')).toBe(true);
  });

  it('incorrect value', () => {
    expect(checkValidTld('test@gmail.comm')).toBe(false);
    expect(checkValidTld('test@gmail.com.ukk')).toBe(false);
    expect(checkValidTld('test@com')).toBe(false);
    expect(checkValidTld('com')).toBe(false);
    expect(checkValidTld('')).toBe(false);
  });
});
