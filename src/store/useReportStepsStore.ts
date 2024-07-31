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
  deleteSubStep: (stepIndex: number, subStepId: number) => void; // Add this
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
        data: `###### Objective

        Provide a detailed EMPA report that evaluates GreenLife's environmental assets, identifies carbon credit opportunities, and offers strategic recommendations to enhance market positioning and sustainability.
        
        ###### Tasks and Deliverables
        
        - **Project Kickoff Meeting**: Initiate the project with a comprehensive meeting to understand GreenLife's objectives, project scope, and expectations.
        - **Data Collection**: Gather relevant data from GreenLife, including project details, financials, and environmental impact information.
        - **Analysis and Reporting**: Conduct a thorough analysis following the 27-step EMPA framework, incorporating data validation, compliance screening, carbon estimation, and market analysis.
        - **Draft Report Submission**: Provide a draft EMPA report for GreenLife's review and feedback.
        - **Final Report Delivery**: Submit the finalized EMPA report incorporating GreenLife's feedback and additional insights`,
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
