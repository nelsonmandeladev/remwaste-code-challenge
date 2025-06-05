import React from 'react';
import { CheckoutStep } from './checkout-step';
import { useGlobalUrlQueryParams } from 'hooks';
import { cn } from 'libs';

interface StepData {
  label: string;
  icon: React.ReactNode;
}

interface CheckoutStepsContainerProps {
  steps: StepData[];
  activeIndex: number;
}

/**
 * Renders a series of checkout steps.
 *
 * @param {CheckoutStepsContainerProps} props - The component props.
 * @param {StepData[]} props.steps - An array of step data.
 * @param {number} props.activeIndex - The index of the currently active step.
 * @returns {React.ReactElement} The rendered component.
 */
export function CheckoutStepsContainer({ steps, activeIndex }: CheckoutStepsContainerProps): React.ReactElement {
  const {queryParams} = useGlobalUrlQueryParams();

  return (
    <div className={cn(" w-full flex items-center bg-white/50 backdrop-blur-lg rounded-full p-4 overflow-x-auto transition-all duration-300", {
      "md:w-[97%]": !queryParams.filterFormOpen,
    })}>
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <CheckoutStep label={step.label} icon={step.icon} isActive={index === activeIndex} />
          {index < steps.length - 1 && (
            <div className={`flex-auto border-t ${index < activeIndex ? 'border-blue-500' : 'border-gray-300'} mx-4`}></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
} 