import { GameMode } from "../types/game";
import { Difficulty } from "./generateOperation";

type CreateGameResultParams = {
  finalScore: number;
  finalCorrect: number;
  finalIncorrect: number;
  finalUnanswered: number;
  finalResponseTimes: number[];
  totalQuestions: number;
  difficulty: Difficulty;
  mode: GameMode;
};

export const createGameResult = ({
  finalScore,
  finalCorrect,
  finalIncorrect,
  finalUnanswered,
  finalResponseTimes,
  totalQuestions,
  difficulty,
  mode,
}: CreateGameResultParams) => {
  const answeredQuestions = finalCorrect + finalIncorrect;
  const totalPlayed = finalCorrect + finalIncorrect + finalUnanswered;

  const accuracy =
    totalPlayed === 0
      ? 0
      : Math.round((finalCorrect / totalPlayed) * 100);

  const averageTime =
    finalResponseTimes.length === 0
      ? 0
      : finalResponseTimes.reduce((acc, item) => acc + item, 0) /
        finalResponseTimes.length;

  return {
    id: Date.now().toString(),
    date: new Date().toISOString(),
    score: finalScore,
    correct: finalCorrect,
    incorrect: finalIncorrect,
    unanswered: finalUnanswered,
    answered: answeredQuestions,
    totalPlayed,
    totalConfigured: totalQuestions,
    accuracy,
    averageTime: Number(averageTime.toFixed(2)),
    difficulty,
    mode,
  };
};