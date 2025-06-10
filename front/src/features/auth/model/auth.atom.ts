import { atom } from 'jotai';

import { isBrowser } from '@/shared/model';

export const authAtom = atom(() => {
  if (!isBrowser) {
    return {
      accessToken: null,
      errorCode: null,
      refreshToken: null
    };
  }

  const hashParams = new URLSearchParams(window.location.hash.substring(1));

  return {
    accessToken: hashParams.get('access_token'),
    errorCode: hashParams.get('error_code'),
    refreshToken: hashParams.get('refresh_token')
  };
});
