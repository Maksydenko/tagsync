import { formatDate } from '../formatDate.util';

describe('formatDate', () => {
  it('correct value', () => {
    expect(formatDate({ date: new Date('2021-01-01T12:00:00Z') })).toBe(
      '01.01.2021'
    );
  });
});
