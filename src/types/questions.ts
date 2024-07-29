
export type TQuestion = {
    section?: string;
    id: number;
    text: string;
    created: string; // Use string to represent ISO date strings
  };
  
  export interface TGroupedQuestions {
    [dateKey: string]: {
        label: string;
        questions: TQuestion[];
    };
}
  