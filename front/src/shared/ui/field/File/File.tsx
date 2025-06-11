'use client';

import { ChangeEvent, FC, useEffect, useState } from 'react';
import { clsx } from 'clsx';

import { TSetState } from '@/shared/model';

import s from './File.module.scss';

interface FileProps {
  accept?: string[];
  className?: string;
  maxSize?: number;
  selectedFile: File | null;
  setSelectedFile: TSetState<File | null>;
}

export const File: FC<FileProps> = ({
  accept,
  className,
  maxSize = 10,
  selectedFile,
  setSelectedFile
}) => {
  const [isActive, setIsActive] = useState(false);

  const defaultSubHint = `${accept ? accept.join(', ') : ''} file${
    maxSize > 0 ? ` up to ${maxSize}MB` : ''
  }`;
  const [subHint, setSubHint] = useState(defaultSubHint);

  useEffect(() => {
    if (selectedFile) {
      const { name } = selectedFile;
      setSubHint(name);
    } else {
      setSubHint(defaultSubHint);
    }
  }, [selectedFile, defaultSubHint]);

  // Handle change file
  interface IHandleChangeFile {
    ({ target }: ChangeEvent<HTMLInputElement>): void;
  }
  const handleChangeFile: IHandleChangeFile = ({ target: { files } }) => {
    const file = files?.[0];

    if (file) {
      const { name, size } = file;

      // Checking the type of file
      if (
        accept &&
        !accept.some(type => name.toLocaleLowerCase().endsWith(type))
      ) {
        alert(`File type must be ${accept.join(', ')}!`);
        setSelectedFile(null);
        return;
      }

      // Checking the size of the file
      if (maxSize > 0 && size > maxSize * 1024 ** 2) {
        alert(`File size should not exceed ${maxSize}MB!`);
        setSelectedFile(null);
        return;
      }

      setSelectedFile(file);
    }
  };

  const handleActivate = () => {
    setIsActive(true);
  };

  const handleDeactivate = () => {
    setIsActive(false);
  };

  return (
    <div className={clsx(s.file, className)}>
      <div
        className={clsx(s.file__body, isActive && s.file__body_active)}
        onDragLeave={handleDeactivate}
        onDragOver={handleActivate}
        onDrop={handleDeactivate}
      >
        <div className={s.file__box}>
          <input
            accept={accept && accept.join(',')}
            className={s.file__input}
            type={'file'}
            onChange={handleChangeFile}
          />
          <p className={s.file__hint}>
            <span>Upload a file</span> or drag and drop
          </p>
          <p className={s.file__subHint}>{subHint}</p>
        </div>
      </div>
    </div>
  );
};
