import { FC } from "react";
import { clsx } from "clsx";

import s from "./Footer.module.scss";

interface FooterProps {
  className?: string;
}

export const Footer: FC<FooterProps> = ({ className }) => {
  return <footer className={clsx(s.footer, className)}></footer>;
};
