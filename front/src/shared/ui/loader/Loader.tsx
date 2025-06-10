import { FC } from 'react';
import { clsx } from 'clsx';

import s from './Loader.module.scss';

interface LoaderProps {
  className?: string;
}

export const Loader: FC<LoaderProps> = ({ className }) => (
  <div className={clsx(s.loader, className)} />
);
