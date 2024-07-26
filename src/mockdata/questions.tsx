import { TQuestion } from "@/types/questions";

export const questions: TQuestion[] = [
  {
    id: 1,
    text: "Could you provide more insights into the regulatory environment and market mechanisms impacting our environmental asset market?",
    created: new Date().toISOString(), // today's date
    source: "/EMPA/methodology?data=report&&section=Data Gathering",
  },
  {
    id: 2,
    text: "What specific environmental assets opportunities were identified, and how do they align with our strategic goals?",
     source: "/EMPA/methodology?data=report&&section=Data Gathering",
    created: new Date().toISOString(), // today's date
  },
  {
    id: 3,
    text: "What specific environmental assets opportunities were identified, and how do they align with our strategic goals?",
     source: "/EMPA/methodology?data=report&&section=Data Gathering",
    created: "2024-07-19T10:00:00Z", // yesterday's date
  },
  {
    id: 4,
    text: "Could you provide more insights into the regulatory environment and market mechanisms impacting our environmental asset market?",
     source: "/EMPA/methodology?data=report&&section=Data Gathering",
    created: "2024-07-19T08:00:00Z", // yesterday's date
  },
  {
    id: 5,
    text: "How do market trends impact our environmental asset strategies?",
     source: "/EMPA/methodology?data=report&&section=Data Gathering",
    created: "2024-07-18T10:00:00Z", // earlier date
  },
  {
    id: 6,
    text: "Can you provide examples of successful environmental asset projects?",
     source: "/EMPA/methodology?data=report&&section=Data Gathering",
    created: "2024-07-18T09:00:00Z", // earlier date
  },
];
