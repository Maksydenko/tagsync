"use client";

import { CSSProperties, FC, ReactNode, useRef, useState } from "react";
import Image from "next/image";
import { StaticImageData } from "next/image";
import { clsx } from "clsx";

import { Loader } from "../loader/Loader";

import s from "./Img.module.scss";

interface ImgProps {
  alt?: string;
  className?: string;
  height?: number;
  isFill?: boolean;
  isPriority?: boolean;
  isSvg?: boolean;
  loader?: ReactNode;
  quality?: number;
  sizes?: string;
  src?: StaticImageData | string;
  style?: CSSProperties;
  width?: number;
}

export const Img: FC<ImgProps> = ({
  alt = "",
  className,
  height,
  isFill = true,
  isPriority,
  isSvg,
  loader = <Loader className={s.img__loader} />,
  quality = 75,
  sizes = "99vw",
  src,
  style,
  width,
}) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={clsx(s.img, isSvg && s.img_svg, className)} style={style}>
      {src && (
        <>
          {isLoading && loader}
          <Image
            alt={alt}
            priority={isPriority}
            quality={quality}
            src={src}
            {...(width && height
              ? {
                  height,
                  width,
                }
              : {
                  fill: isFill,
                  sizes,
                })}
            ref={imgRef}
            onLoad={() => {
              setIsLoading(false);
            }}
          />
        </>
      )}
    </div>
  );
};
