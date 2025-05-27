"use client";

import { FC } from "react";
import { clsx } from "clsx";
import { animate } from "framer-motion";

import { useActiveOnScroll } from "@/shared/model";
import { Img } from "@/shared/ui";

import s from "./ScrollTop.module.scss";

interface ScrollTopProps {
  className?: string;
}

export const ScrollTop: FC<ScrollTopProps> = ({ className }) => {
  const isActive = useActiveOnScroll(110);

  const handleClick = () => {
    animate(window.scrollY, 0, {
      duration: 0.8,
      onUpdate: (value) => {
        window.scrollTo(0, value);
      },
    });
  };

  return (
    <div
      className={clsx(s.scrollTop, isActive && s.scrollTop_active, className)}
    >
      <button
        aria-label="Scroll top"
        className={s.scrollTop__btn}
        type="button"
        onClick={handleClick}
      >
        <Img
          alt="Scroll top"
          className={s.scrollTop__icon}
          src="/img/icons/form/arrow-down.svg"
          isSvg
        />
      </button>
    </div>
  );
};
