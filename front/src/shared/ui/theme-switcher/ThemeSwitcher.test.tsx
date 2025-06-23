import userEvent from '@testing-library/user-event';

import { renderWithIntl } from '@/shared/lib';

import { ThemeSwitcher } from './ThemeSwitcher';

import shared from '@/application/translations/en/shared.json';

beforeAll(() => {
  const style = document.createElement('style');
  style.textContent = `
    [data-testid="light-theme-input"],
    [data-testid="system-theme-input"],
    [data-testid="dark-theme-input"] {
      display: none;
    }
  `;

  document.head.appendChild(style);
});

afterAll(() => {
  const style = document.querySelector('style');
  if (!style) {
    return;
  }

  style.remove();
});

describe('ThemeSwitcher', () => {
  it('should correctly theme navigation on arrow keys', async () => {
    const { getByTestId } = renderWithIntl(<ThemeSwitcher />, {
      messages: shared
    });

    await userEvent.click(getByTestId('system-theme-input'));
    expect(getByTestId('system-theme-input')).toHaveFocus();

    await userEvent.keyboard('{ArrowLeft}');
    expect(getByTestId('light-theme-input')).toHaveFocus();
    await userEvent.keyboard('{Enter}');

    await userEvent.keyboard('{ArrowRight}');
    await userEvent.keyboard('{ArrowRight}');
    expect(getByTestId('dark-theme-input')).toHaveFocus();

    await userEvent.keyboard('{ArrowLeft}');
    expect(getByTestId('system-theme-input')).toHaveFocus();
  });
});
