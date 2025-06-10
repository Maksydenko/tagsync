import { FontSize } from '@/shared/config';

import { transformPxToRem } from '../transformPxToRem.util';

describe('transformPxToRem', () => {
  test('Correct value', () => {
    expect(transformPxToRem(10)).toBe(`${10 / FontSize.Default}rem`);
  });

  test('Incorrect value', () => {
    expect(transformPxToRem(NaN)).toBe(null);
  });
});
