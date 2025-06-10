import { removeLocalePrefix } from '../removeLocalePrefix.util';

describe('removeLocalePrefix', () => {
  test('Correct value', () => {
    expect(removeLocalePrefix('/en')).toBe('/en');
    expect(removeLocalePrefix('/en/category')).toBe('/category');
    expect(removeLocalePrefix('/en/category/product')).toBe(
      '/category/product'
    );
  });
});
