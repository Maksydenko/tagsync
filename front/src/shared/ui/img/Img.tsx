'use client';

import { FC, ReactNode, useRef, useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { clsx } from 'clsx';

import s from './Img.module.scss';

interface ImgProps extends Omit<ImageProps, 'alt'> {
  alt?: string;
  className?: string;
  customLoader?: ReactNode;
  isSvg?: boolean;
  quality?: number;
}

export const Img: FC<ImgProps> = ({
  alt = '',
  className,
  customLoader,
  fill = true,
  height,
  isSvg,
  quality = 75,
  sizes = '(min-width: 0) 100vw',
  src,
  style,
  width,
  ...props
}) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={clsx(s.img, isSvg && s.img_svg, className)} style={style}>
      {src && (
        <>
          {isLoading && customLoader}
          <Image
            alt={alt}
            quality={quality}
            src={src}
            {...(width && height
              ? {
                  height: +height * 2,
                  width: +width * 2
                }
              : {
                  fill,
                  sizes
                })}
            ref={imgRef}
            onLoad={() => {
              setIsLoading(false);
            }}
            {...props}
          />
        </>
      )}
    </div>
  );
};
