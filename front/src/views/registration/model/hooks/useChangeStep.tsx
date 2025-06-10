import { RefObject, useCallback, useState } from 'react';
import { StepWizardChildProps } from 'react-step-wizard';

export const useChangeStep = (
  stepWizardRef: RefObject<null | StepWizardChildProps>
) => {
  const DEFAULT_STEP = 0;
  const [currentStep, setCurrentStep] = useState(DEFAULT_STEP);

  const changeStep = useCallback(
    (stepNumber: number) => {
      setCurrentStep(stepNumber);
      stepWizardRef.current?.goToStep(++stepNumber);
    },
    [setCurrentStep, stepWizardRef]
  );

  return {
    currentStep,
    defaultStep: DEFAULT_STEP,
    handleStepChange: changeStep
  };
};
