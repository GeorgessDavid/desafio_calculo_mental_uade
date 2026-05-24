import { MathOperation } from "../logic/generateOperation";

export type GameMode = "classic" | "true_false" | "multiple_choice" | "time_attack";

export type CurrentQuestion = {
  operation: MathOperation;
  choices: number[];
  shownAnswer: number;
  isStatementCorrect: boolean;
  startedAt: number;
};

export type ProcessAnswerParams = {
  answered: boolean;
  userAnswer?: number;
  booleanAnswer?: boolean;
};