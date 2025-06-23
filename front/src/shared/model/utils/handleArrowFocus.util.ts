import { KeyboardEvent } from 'react';

interface IHandleArrowFocus {
  e: KeyboardEvent<HTMLElement>;
  isLoop?: boolean;
  isRtl?: boolean;
  isVertical?: boolean;
  selector: string;
}

export const handleArrowFocus = ({
  e,
  isLoop,
  isRtl,
  isVertical,
  selector
}: IHandleArrowFocus) => {
  const { currentTarget, key } = e;

  const isLeft = key === (isVertical ? 'ArrowUp' : 'ArrowLeft');
  const isRight = key === (isVertical ? 'ArrowDown' : 'ArrowRight');

  if (!isLeft && !isRight) {
    return;
  }

  e.preventDefault();

  const moveForward = isRtl ? isLeft : isRight;
  const moveBackward = isRtl ? isRight : isLeft;

  const allFocusable = Array.from(
    document.querySelectorAll<HTMLElement>(selector)
  );
  const currentIndex = allFocusable.indexOf(currentTarget as HTMLElement);

  if (currentIndex === -1) {
    return;
  }

  let nextIndex = -1;

  if (moveBackward) {
    if (currentIndex > 0) {
      nextIndex = currentIndex - 1;
    } else if (isLoop) {
      nextIndex = allFocusable.length - 1;
    }
  }

  if (moveForward) {
    if (currentIndex < allFocusable.length - 1) {
      nextIndex = currentIndex + 1;
    } else if (isLoop) {
      nextIndex = 0;
    }
  }

  if (nextIndex === -1) {
    return;
  }

  allFocusable[nextIndex].focus();
};
