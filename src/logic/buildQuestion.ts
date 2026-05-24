import { CurrentQuestion, GameMode } from "../types/game";
import { generateChoices } from "./generateChoices";
import { Difficulty, generateOperation } from "./generateOperation";

const getRandomOffset = () => {
  const offsets = [
    -10, -9, -8, -7, -6, -5, -4, -3, -2, -1,
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  ];

  return offsets[Math.floor(Math.random() * offsets.length)];
};

export const buildQuestion = (
  difficulty: Difficulty,
  mode: GameMode
): CurrentQuestion => {
  const operation = generateOperation(difficulty);

  let shownAnswer = operation.answer;
  let isStatementCorrect = true;

  if (mode === "true_false") {
    isStatementCorrect = Math.random() > 0.5;

    if (!isStatementCorrect) {
      shownAnswer = operation.answer + getRandomOffset();
    }
  }

  return {
    operation,
    choices: generateChoices(operation.answer),
    shownAnswer,
    isStatementCorrect,
    startedAt: Date.now(),
  };
};