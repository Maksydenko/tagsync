'use client';

import { ChangeEvent, ReactNode, useState } from 'react';
import { useTranslations } from 'next-intl';
import { clsx } from 'clsx';
import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormReturn
} from 'react-hook-form';

import { Translation } from '@/shared/config';
import { FileSize, getExtensionFromPath, IField } from '@/shared/model';

import { ILocalFile } from './localFile.interface';

import { Img } from '../../img/Img';

import s from './File.module.scss';

interface FileProps<T extends FieldValues> extends IField<T> {
  className?: string;
  formReturn: UseFormReturn<T>;
  name: Path<T>;
  options?: RegisterOptions<T>;
  placeholder?: string;
}

export const File = <T extends FieldValues>({
  accept,
  className,
  formReturn,
  name,
  options,
  placeholder,
  ...props
}: FileProps<T>): ReactNode => {
  const [localFiles, setLocalFiles] = useState<ILocalFile[]>([]);
  const [isActive, setIsActive] = useState(false);

  const tShared = useTranslations(Translation.Shared);

  const { clearErrors, formState, register, setError } = formReturn;
  const {
    onBlur,
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    onChange,
    ...restRegister
  } = register(name, options);

  const error = formState.errors[name];
  const splittedAccept = accept?.replace(/\s+/g, '').split(',');
  const pattern = options?.pattern;
  const { multiple } = props;

  const maxLength = options?.maxLength;
  const maxCount =
    typeof maxLength === 'number'
      ? maxLength
      : typeof maxLength === 'object' && 'value' in maxLength
        ? maxLength.value
        : null;

  const max = options?.max;
  const maxSize =
    typeof max === 'number'
      ? max
      : typeof max === 'object' && 'value' in max
        ? +max.value
        : 0;

  const handleChangeFile = ({
    target: { files }
  }: ChangeEvent<HTMLInputElement>) => {
    const filesArray = files ? Array.from(files) : [];

    filesArray?.map(file => {
      const { name: fileName, size: fileSize } = file;

      // Clear error
      if (error) {
        clearErrors(name as Path<T>);
      }

      // Check type of file
      if (
        accept &&
        splittedAccept?.length &&
        !splittedAccept.some(type =>
          fileName.toLocaleLowerCase().endsWith(type)
        )
      ) {
        setError(name as Path<T>, {
          message:
            typeof pattern === 'object' && 'message' in pattern
              ? pattern.message
              : tShared('form.file.pattern', {
                  value: accept
                }),
          type: 'manual'
        });

        return;
      }

      // Check size of the file
      if (maxSize && fileSize > maxSize * FileSize.BytesInMB) {
        setError(name as Path<T>, {
          message:
            typeof max === 'object' && 'message' in max
              ? max.message
              : tShared('form.file.max'),
          type: 'manual'
        });
        return;
      }

      // Check number of files
      if (maxCount && localFiles.length >= maxCount) {
        setError(name as Path<T>, {
          message:
            typeof maxLength === 'object' && 'message' in maxLength
              ? maxLength.message
              : tShared('form.file.maxLength'),
          type: 'manual'
        });
        return;
      }

      setLocalFiles(prev => [
        ...(multiple ? prev : []),
        {
          file,
          id: crypto.randomUUID()
        }
      ]);
    });
  };

  const handleDragOver = () => {
    setIsActive(true);
  };

  const handleDragLeave = () => {
    setIsActive(false);
  };

  return (
    <div className={clsx(s.file, className)}>
      <div className={s.file__body}>
        <div
          className={clsx(
            s.file__content,
            error && s.file__content_error,
            isActive && s.file__content_active
          )}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDragLeave}
        >
          <div className={s.file__box}>
            <p className={s.file__hint}>{placeholder}</p>
            <input
              accept={accept}
              className={s.file__input}
              id={name}
              type="file"
              onBlur={e => {
                handleDragLeave();
                onBlur(e);
              }}
              onChange={handleChangeFile}
              onFocus={handleDragOver}
              {...props}
              {...restRegister}
            />
          </div>
        </div>
        {!!localFiles.length && (
          <ul className={s.file__list}>
            {localFiles.map(({ file, id }) => {
              const isImg = file.type.startsWith('image');
              const previewUrl = isImg ? URL.createObjectURL(file) : '';
              const fileExtension =
                getExtensionFromPath(file.name) || file.type.split('/')[1];

              return (
                <li key={id} className={s.file__item}>
                  {isImg ? (
                    <Img
                      alt={file.name}
                      className={s.file__img}
                      height={60}
                      src={previewUrl}
                      width={60}
                    />
                  ) : (
                    <p className={s.file__img}>{fileExtension}</p>
                  )}
                  <button
                    aria-label="Remove file"
                    className={s.file__btn}
                    type="button"
                    onClick={() =>
                      setLocalFiles(prev =>
                        prev.filter(localFile => localFile.id !== id)
                      )
                    }
                  />
                  <span className={s.file__remove}>
                    <span />
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};
