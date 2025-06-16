import { formatPrice } from '../formatPrice.util';

describe('formatPrice', () => {
  it('correct int value', () => {
    expect(
      formatPrice({
        price: 0
      })
    ).toBe('0 ₴');
    expect(
      formatPrice({
        price: 100
      })
    ).toBe('100 ₴');
    expect(
      formatPrice({
        price: 1_000
      })
    ).toBe('1\xA0000 ₴');
  });

  it('correct float value', () => {
    expect(
      formatPrice({
        minimumFractionDigits: 2,
        price: 100.5
      })
    ).toBe('100,50 ₴');
    expect(
      formatPrice({
        minimumFractionDigits: 2,
        price: 100.55
      })
    ).toBe('100,55 ₴');
    expect(
      formatPrice({
        minimumFractionDigits: 2,
        price: 100.551
      })
    ).toBe('100,56 ₴');
  });

  it('incorrect value', () => {
    expect(
      formatPrice({
        price: -100
      })
    ).toBe(null);
    expect(
      formatPrice({
        price: NaN
      })
    ).toBe(null);
  });
});
