export type TQuestion = {
  id: number;
  text: string;
  created: string; // Use string to represent ISO date strings
  source: string;
  section?:string
};

export interface TGroupedQuestions {
  [dateKey: string]: {
    label: string;
    questions: TQuestion[];
  };
}
