import { formatNumber } from '../formatNumber.util';

describe('transformPxToRem', () => {
  test('Correct int value', () => {
    expect(
      formatNumber({
        number: 100
      })
    ).toBe('100');
    expect(
      formatNumber({
        number: 1_000
      })
    ).toBe('1\xA0000');
  });

  test('Correct float value', () => {
    expect(
      formatNumber({
        number: 100.5
      })
    ).toBe('100,5');
    expect(
      formatNumber({
        number: 100.55
      })
    ).toBe('100,55');
  });

  test('Incorrect value', () => {
    expect(
      formatNumber({
        number: NaN
      })
    ).toBe(null);
  });
});
