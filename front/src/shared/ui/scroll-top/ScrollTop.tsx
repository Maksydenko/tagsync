import { FC } from "react";
import { clsx } from "clsx";
import gsap from "gsap";
import ScrollToPlugin from "gsap/dist/ScrollToPlugin";

import { useGSAP } from "@gsap/react";

import { useActiveOnScroll } from "@/shared/model";

import { Transition } from "../transition/Transition";

interface ScrollTopProps {
  className?: string;
}

export const ScrollTop: FC<ScrollTopProps> = ({ className }) => {
  const { isActive } = useActiveOnScroll(110);

  useGSAP(() => {
    gsap.registerPlugin(ScrollToPlugin);
  }, {});

  const handleClick = () => {
    gsap.to(window, {
      duration: 0.8,
      scrollTo: {
        y: 0,
      },
    });
  };

  return (
    <Transition show={isActive}>
      <button
        aria-label="Scroll top"
        className={clsx(className, "scroll-top")}
        type="button"
        onClick={handleClick}
      >
        <span className="scroll-top__arrow-top _icon-arrow-top"></span>
      </button>
    </Transition>
  );
};
