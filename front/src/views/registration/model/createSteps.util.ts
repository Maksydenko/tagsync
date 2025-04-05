import { StepProps } from "rc-steps/lib/Step";

export const createSteps = (
  currentStep: number,
  stepsLength: number
): StepProps[] => {
  return Array.from(
    {
      length: stepsLength,
    },
    (_, index) => ({
      disabled: index > currentStep,
      icon: ++index,
    })
  );
};
