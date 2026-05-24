import { router } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Keyboard } from "react-native";
import { DIFFICULTIES } from "../constants/gameConfig";
import { buildQuestion } from "../logic/buildQuestion";
import { calculateScore } from "../logic/calculateScore";
import { createGameResult } from "../logic/createGameResult";
import { Difficulty } from "../logic/generateOperation";
import { saveGameResult } from "../storage/gameStorage";
import { GameMode, ProcessAnswerParams } from "../types/game";

type UseGameParams = {
  difficulty: Difficulty;
  mode: GameMode;
  totalQuestions: number;
};

export const useGame = ({
  difficulty,
  mode,
  totalQuestions,
}: UseGameParams) => {
  const difficultyData = DIFFICULTIES.find((item) => item.id === difficulty);
  const timePerQuestion = difficultyData?.timePerQuestion ?? 10;

  const isTimeAttack = mode === "time_attack";

  const initialTime = useMemo(() => {
    return isTimeAttack
      ? totalQuestions * timePerQuestion
      : timePerQuestion;
  }, [isTimeAttack, totalQuestions, timePerQuestion]);

  const [currentQuestion, setCurrentQuestion] = useState(() =>
    buildQuestion(difficulty, mode)
  );

  const [currentIndex, setCurrentIndex] = useState(1);
  const [remainingTime, setRemainingTime] = useState(initialTime);
  const [answerInput, setAnswerInput] = useState("");

  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [unanswered, setUnanswered] = useState(0);
  const [responseTimes, setResponseTimes] = useState<number[]>([]);

  const [locked, setLocked] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const finishGame = useCallback(
    async ({
      finalScore,
      finalCorrect,
      finalIncorrect,
      finalUnanswered,
      finalResponseTimes,
    }: {
      finalScore: number;
      finalCorrect: number;
      finalIncorrect: number;
      finalUnanswered: number;
      finalResponseTimes: number[];
    }) => {
      const result = createGameResult({
        finalScore,
        finalCorrect,
        finalIncorrect,
        finalUnanswered,
        finalResponseTimes,
        totalQuestions,
        difficulty,
        mode,
      });

      await saveGameResult(result);

      router.replace({
        pathname: "/result",
        params: {
          resultId: result.id,
          score: String(result.score),
          correct: String(result.correct),
          incorrect: String(result.incorrect),
          unanswered: String(result.unanswered),
          answered: String(result.answered),
          totalPlayed: String(result.totalPlayed),
          totalConfigured: String(result.totalConfigured),
          accuracy: String(result.accuracy),
          averageTime: String(result.averageTime),
          difficulty: result.difficulty,
          mode: result.mode,
        },
      });
    },
    [difficulty, mode, totalQuestions]
  );

  const goToNextQuestion = useCallback(() => {
    setCurrentQuestion(buildQuestion(difficulty, mode));
    setCurrentIndex((prev) => prev + 1);
    setAnswerInput("");
    setFeedback(null);
    setLocked(false);

    if (!isTimeAttack) {
      setRemainingTime(timePerQuestion);
    }
  }, [difficulty, mode, isTimeAttack, timePerQuestion]);

  const processAnswer = useCallback(
    ({ answered, userAnswer, booleanAnswer }: ProcessAnswerParams) => {
      if (locked) return;

      setLocked(true);
      Keyboard.dismiss();

      const responseTime = (Date.now() - currentQuestion.startedAt) / 1000;

      let isCorrect = false;

      if (!answered) {
        isCorrect = false;
      } else if (mode === "true_false") {
        isCorrect = booleanAnswer === currentQuestion.isStatementCorrect;
      } else {
        isCorrect = userAnswer === currentQuestion.operation.answer;
      }

      const points = calculateScore({
        isCorrect,
        answered,
        responseTime,
        maxTime: timePerQuestion,
      });

      const nextScore = score + points;
      const nextCorrect = correctAnswers + (answered && isCorrect ? 1 : 0);
      const nextIncorrect = incorrectAnswers + (answered && !isCorrect ? 1 : 0);
      const nextUnanswered = unanswered + (!answered ? 1 : 0);
      const nextResponseTimes = answered
        ? [...responseTimes, responseTime]
        : responseTimes;

      setScore(nextScore);
      setCorrectAnswers(nextCorrect);
      setIncorrectAnswers(nextIncorrect);
      setUnanswered(nextUnanswered);
      setResponseTimes(nextResponseTimes);

      if (!answered) {
        setFeedback(`Sin respuesta (${points} puntos)`);
      } else if (isCorrect) {
        setFeedback(`Correcto (+${points} puntos)`);
      } else {
        setFeedback(`Incorrecto (${points} puntos)`);
      }

      const shouldFinishByQuestions = currentIndex >= totalQuestions;
      const shouldFinishByTimeAttackError = isTimeAttack && !isCorrect;

      setTimeout(() => {
        if (shouldFinishByQuestions || shouldFinishByTimeAttackError) {
          finishGame({
            finalScore: nextScore,
            finalCorrect: nextCorrect,
            finalIncorrect: nextIncorrect,
            finalUnanswered: nextUnanswered,
            finalResponseTimes: nextResponseTimes,
          });

          return;
        }

        goToNextQuestion();
      }, 700);
    },
    [
      locked,
      currentQuestion,
      mode,
      timePerQuestion,
      score,
      correctAnswers,
      incorrectAnswers,
      unanswered,
      responseTimes,
      currentIndex,
      totalQuestions,
      isTimeAttack,
      finishGame,
      goToNextQuestion,
    ]
  );

  useEffect(() => {
    if (locked) return;

    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 0) return 0;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [locked, currentQuestion]);

  useEffect(() => {
    if (remainingTime > 0 || locked) return;

    processAnswer({
      answered: false,
    });
  }, [remainingTime, locked, processAnswer]);

  const submitTextAnswer = () => {
    if (answerInput.trim() === "") return;

    processAnswer({
      answered: true,
      userAnswer: Number(answerInput),
    });
  };

  const updateAnswerInput = (value: string) => {
    setAnswerInput(value.replace(/[^0-9-]/g, ""));
  };

  const resetGame = () => {
    setCurrentQuestion(buildQuestion(difficulty, mode));
    setCurrentIndex(1);
    setRemainingTime(initialTime);
    setAnswerInput("");

    setScore(0);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    setUnanswered(0);
    setResponseTimes([]);

    setLocked(false);
    setFeedback(null);
  };

  const timerTotal = isTimeAttack ? initialTime : timePerQuestion;

  return {
    currentQuestion,
    currentIndex,
    totalQuestions,

    remainingTime,
    timerTotal,

    answerInput,
    updateAnswerInput,
    submitTextAnswer,

    score,
    correctAnswers,
    incorrectAnswers,
    unanswered,

    locked,
    feedback,

    processAnswer,
    isTimeAttack,
    resetGame,
  };
};