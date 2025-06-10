import { sortSearchParams } from '../sortSearchParams.util';

describe('sortSearchParams', () => {});
test('Correct value', () => {
  expect(sortSearchParams(new URLSearchParams('c=3&b=2&a=1'))).toBe(
    'a=1&b=2&c=3'
  );
});
