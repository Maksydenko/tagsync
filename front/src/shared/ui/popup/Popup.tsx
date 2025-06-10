'use client';

import { FC, ReactNode, useState } from 'react';
import { clsx } from 'clsx';

import { Button, Dialog, DialogPanel } from '@headlessui/react';

import { TSetState } from '@/shared/model';

import s from './Popup.module.scss';

interface PopupProps {
  btn: ReactNode;
  children: ReactNode;
  className?: string;
  forceOpen?: boolean;
  isSheet?: boolean;
  setForceOpen?: TSetState<boolean>;
}

export const Popup: FC<PopupProps> = ({
  btn,
  children,
  className,
  forceOpen,
  setForceOpen,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const isForceOpen = typeof forceOpen === 'boolean' && setForceOpen;

  const handleOpen = () => {
    if (isForceOpen) {
      setForceOpen(true);

      return;
    }

    setIsOpen(true);
  };

  const handleClose = () => {
    if (isForceOpen) {
      setForceOpen(false);

      return;
    }

    setIsOpen(false);
  };

  const isShow = isForceOpen ? forceOpen : isOpen;

  return (
    <>
      {btn && (
        <Button
          className={clsx(s.popupBtn, className)}
          type="button"
          onClick={handleOpen}
        >
          {btn}
        </Button>
      )}
      <Dialog
        className={clsx(s.popup, className)}
        open={isShow}
        onClose={handleClose}
      >
        <div className={s.popup__body}>
          <div className={s.popup__content}>
            <DialogPanel
              className={clsx(s.popup__panel, s.popup__panel_bg)}
              transition
            />
            <DialogPanel className={s.popup__panel} transition>
              <div className={s.popup__box}>{children}</div>
              <button
                className={s.popup__cross}
                type="button"
                onClick={handleClose}
              />
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};
