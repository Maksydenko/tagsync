'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Pathname } from '@/shared/config';
import { Time } from '@/shared/model';

const SECONDS_TO_REDIRECT = 10;

export const useRedirectToHomepage = (): {
  time: number;
} => {
  const [time, setTime] = useState(SECONDS_TO_REDIRECT);
  const { push } = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (time > 0) {
        setTime(time - 1);
      } else {
        push(Pathname.Home);
      }
    }, Time.MillisecondsInSecond);

    return () => {
      clearTimeout(timer);
    };
  }, [time, push]);

  return { time };
};
