import create from 'zustand';
import { ReactElement } from 'react';
import { EMPAReportSteps } from '@/config/reportStepConfig';

interface SubStep {
    title: string;
    isLocked: boolean;
    data?: string;
  }
  
  interface Step {
    title: string;
    path?: string;
  
    substeps: SubStep[];
    icon: () => JSX.Element;
    isLocked: boolean;
  }

interface ReportStepsState {
    reportSteps: Step[];
    currentSubStep: SubStep  | null; // Add the currentSubStep property
    setCurrentSubStep: (subStep: SubStep) => void;
    toggleSubStepLock: (stepIndex: number, subIndex: number) => void;
    addNewSubStep: (stepIndex: number, title: string) => void;
}

const useReportStepsStore = create<ReportStepsState>((set) => ({
    reportSteps:EMPAReportSteps,
    currentSubStep: null,
    setCurrentSubStep: (subStep: SubStep) => set({ currentSubStep: subStep }),
    toggleSubStepLock: (stepIndex, subIndex) =>
      set((state) => ({
        reportSteps: state.reportSteps.map((step, sIdx) =>
          sIdx === stepIndex
            ? {
                ...step,
                substeps: step.substeps.map((substep, ssIdx) =>
                  ssIdx === subIndex
                    ? { ...substep, isLocked: !substep.isLocked }
                    : substep
                ),
              }
            : step
        ),
      })),
    addNewSubStep: (stepIndex, title) =>
      set((state) => {
        const newSubStep = { title, isLocked: false };
        const updatedSteps = state.reportSteps.map((step, sIdx) =>
          sIdx === stepIndex
            ? {
                ...step,
                substeps: [...step.substeps, newSubStep],
              }
            : step
        );
  
        return { reportSteps: updatedSteps };
      }),
  }));

export default useReportStepsStore;
