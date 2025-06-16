import { removeLocalePrefix } from '../removeLocalePrefix.util';

describe('removeLocalePrefix', () => {
  it('correct value', () => {
    expect(removeLocalePrefix('/en')).toBe('/en');
    expect(removeLocalePrefix('/en/category')).toBe('/category');
    expect(removeLocalePrefix('/en/category/product')).toBe(
      '/category/product'
    );
  });
});
