import tlds from 'tlds';

export const checkValidTld = (email: string): boolean => {
  const [, domain] = email.split('@');

  if (!domain?.includes('.')) {
    return false;
  }

  const tld = domain.split('.').pop();

  return tlds.includes(tld || '');
};
