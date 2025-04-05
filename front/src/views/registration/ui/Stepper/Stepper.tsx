import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { clsx } from "clsx";
import Steps from "rc-steps";

import { transformPxToRem, useWindowListener } from "@/shared/model";

import { createSteps } from "../../model";

import s from "./Stepper.module.scss";

interface StepperProps {
  className?: string;
  current: number;
  onChange: (current: number) => void;
  stepsLength: number;
}

export const Stepper: FC<StepperProps> = ({
  className,
  current,
  onChange,
  stepsLength,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progressbarWidth, setProgressbarWidth] = useState(0);

  const items = useMemo(() => {
    return createSteps(currentStep, stepsLength);
  }, [currentStep, stepsLength]);

  const { length: itemsLength } = items;

  const createStepsGap = useCallback(() => {
    const allSteps = document.querySelectorAll("#stepper .rc-steps-item");
    const [step1, step2] = allSteps;

    if (!step1 || !step2) {
      return;
    }

    const rect1 = step1.getBoundingClientRect();
    const rect2 = step2.getBoundingClientRect();

    const stepsGap = Math.sqrt((rect2.x - rect1.x) ** 2);

    setProgressbarWidth(stepsGap + rect1.width / itemsLength);
  }, [itemsLength]);
  useWindowListener("resize", createStepsGap);

  const handleKeyDownCallback = useCallback((e: KeyboardEvent) => {
    if (e.key !== "Enter") {
      return;
    }

    e.preventDefault();
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDownCallback);

    return () => {
      window.removeEventListener("keydown", handleKeyDownCallback);
    };
  }, [handleKeyDownCallback]);

  useEffect(() => {
    setCurrentStep(0);
  }, [current]);

  return (
    <div className={clsx(s.stepper, className)} id="stepper">
      <Steps
        className={s.stepper__steps}
        current={current}
        items={items}
        type="navigation"
        onChange={onChange}
      />
      <span
        className={s.stepper__progressbar}
        style={{
          width: transformPxToRem(progressbarWidth * current),
        }}
      />
    </div>
  );
};
