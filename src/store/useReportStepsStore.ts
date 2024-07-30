import create from "zustand";
import { EMPAReportSteps } from "@/config/reportStepConfig";

interface ReportStepsState {
  isRegenerating: boolean;
  setIsRegenerating: (isRegenerating: boolean) => void;
  reportSteps: TStep[];
  currentSubStep: TSubStep | null;
  setCurrentSubStep: (subStep: TSubStep) => void;
  toggleSubStepLock: (stepIndex: number, subIndex: number) => void;
  addNewSubStep: (stepIndex: number, title: string) => void;
  updateSubSteps: (stepIndex: number, newSubSteps: TSubStep[]) => void; // Add this
}

const useReportStepsStore = create<ReportStepsState>((set) => ({
  isRegenerating: false,
  setIsRegenerating: (isRegenerating) => set({ isRegenerating }),
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
      const currentSubsteps = state.reportSteps[stepIndex].substeps;
      const maxId = currentSubsteps.reduce(
        (max, substep) => (substep.id > max ? substep.id : max),
        0
      );
      const newSubStep = {
        id: maxId + 1,
        title,
        isLocked: false,
        data: `###### Heading 6
               You can type in some content here simply by clicking on the edit button above`,
        description: `Add a Description for this sub section`,
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
}));

export default useReportStepsStore;
