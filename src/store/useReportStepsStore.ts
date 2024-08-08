import create from "zustand";
import { EMPAReportSteps } from "@/config/reportStepConfig";

interface ReportStepsState {
  isRegenerating: boolean;
  setIsRegenerating: (isRegenerating: boolean) => void;
  reportSteps: TStep[];
  currentSubStep: TSubStep | null;
  setCurrentSubStep: (subStep: TSubStep) => void;
  setReportSteps: (steps: TStep[]) => void;
  toggleSubStepLock: (stepIndex: number, subIndex: number) => void;
  addNewSubStep: (stepIndex: number, title: string) => void;
  updateSubSteps: (stepIndex: number, newSubSteps: TSubStep[]) => void;
  deleteSubStep: (stepIndex: number, subStepTitle: string) => void;
}

const useReportStepsStore = create<ReportStepsState>((set) => ({
  isRegenerating: false,
  setIsRegenerating: (isRegenerating) => set({ isRegenerating }),
  reportSteps: [],
  currentSubStep: null,
  setCurrentSubStep: (subStep: TSubStep) => set({ currentSubStep: subStep }),
  setReportSteps: (steps: TStep[]) => set({ reportSteps: steps }),
  toggleSubStepLock: (stepIndex, subIndex) =>
    set((state) => {
      const updatedSteps = state.reportSteps.map((step, sIdx) =>
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
      );

      const updatedSubStep = updatedSteps[stepIndex].substeps[subIndex];

      return {
        reportSteps: updatedSteps,
        currentSubStep: updatedSubStep,
      };
    }),
  addNewSubStep: (stepIndex, title) =>
    set((state) => {
      const currentSubsteps = state.reportSteps[stepIndex].substeps;
      const maxId = currentSubsteps.reduce(
        (max, substep) => (substep.id > max ? substep.id : max),
        0
      );
      const newSubStep = {
        id: maxId + 1,
        title,
        isLocked: false,
        data: `

###### Primary Activities

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras iaculis mollis sagittis. Donec ornare rutrum augue non finibus. In ullamcorper diam ut bibendum venenatis. Proin dapibus magna in mattis imperdiet. Integer quis nisi est. Nullam non nisi quis ipsum interdum consectetur. Suspendisse fringilla vitae tellus in ullamcorper. Nullam rutrum risus vitae lorem faucibus interdum. Vivamus eget vehicula ante. Etiam sagittis neque massa, nec sodales est venenatis id.

###### Secondary Activities

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras iaculis mollis sagittis. Donec ornare rutrum augue non finibus. In ullamcorper diam ut bibendum venenatis. Proin dapibus magna in mattis imperdiet. Integer quis nisi est. Nullam non nisi quis ipsum interdum consectetur. Suspendisse fringilla vitae tellus in ullamcorper. Nullam rutrum risus vitae lorem faucibus interdum. Vivamus eget vehicula ante. Etiam sagittis neque massa, nec sodales est venenatis id.




  `,
        description: `Add Description`,
        markupTitle: `#### ${title}`,
      };

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
  updateSubSteps: (stepIndex, newSubSteps) =>
    set((state) => {
      const updatedSteps = state.reportSteps.map((step, sIdx) =>
        sIdx === stepIndex
          ? {
              ...step,
              substeps: newSubSteps,
            }
          : step
      );

      return { reportSteps: updatedSteps };
    }),
  deleteSubStep: (stepIndex, subStepTitle) =>
    set((state) => {
      const updatedSteps = state.reportSteps.map((step, sIdx) =>
        sIdx === stepIndex
          ? {
              ...step,
              substeps: step.substeps.filter(
                (substep) => substep.title !== subStepTitle
              ),
            }
          : step
      );

      // Set currentSubStep to the next one or null if none exists
      const nextSubStep =
        updatedSteps[stepIndex].substeps.find((substep, idx) => idx === 0) ||
        null;

      return {
        reportSteps: updatedSteps,
        currentSubStep: nextSubStep,
      };
    }),
}));

export default useReportStepsStore;
