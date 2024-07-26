import create from "zustand";
import { EMPAReportSteps } from "@/config/reportStepConfig";

interface ReportStepsState {
  reportSteps: TStep[];
  currentSubStep: TSubStep | null; // Add the currentSubStep property
  setCurrentSubStep: (subStep: TSubStep) => void;
  toggleSubStepLock: (stepIndex: number, subIndex: number) => void;
  addNewSubStep: (stepIndex: number, title: string) => void;
}

const useReportStepsStore = create<ReportStepsState>((set) => ({
  reportSteps: EMPAReportSteps,
  currentSubStep: null,
  setCurrentSubStep: (subStep: TSubStep) => set({ currentSubStep: subStep }),
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
      // Find the highest id among the current substeps to generate a new unique id
      const currentSubsteps = state.reportSteps[stepIndex].substeps;
      const maxId = currentSubsteps.reduce(
        (max, substep) => (substep.id > max ? substep.id : max),
        0
      );
      const newSubStep = {
        id: maxId + 1,
        title,
        isLocked: false,
        data: `###### Itenerary
               - New Itenerary`,
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
}));

export default useReportStepsStore;
