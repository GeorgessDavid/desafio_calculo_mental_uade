import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  Keyboard,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import AppButton from "../components/AppButton";
import AppCard from "../components/AppCard";
import { DIFFICULTIES, GAME_MODES } from "../constants/gameConfig";
import { calculateScore } from "../logic/calculateScore";
import { generateChoices } from "../logic/generateChoices";
import {
  Difficulty,
  generateOperation,
  MathOperation,
} from "../logic/generateOperation";

type GameMode = "classic" | "true_false" | "multiple_choice" | "time_attack";

type CurrentQuestion = {
  operation: MathOperation;
  choices: number[];
  shownAnswer: number;
  isStatementCorrect: boolean;
  startedAt: number;
};

const getParamValue = (
  value: string | string[] | undefined,
  fallback: string
) => {
  if (Array.isArray(value)) {
    return value[0] ?? fallback;
  }

  return value ?? fallback;
};

const isValidDifficulty = (value: string): value is Difficulty => {
  return ["easy", "medium", "hard"].includes(value);
};

const isValidMode = (value: string): value is GameMode => {
  return ["classic", "true_false", "multiple_choice", "time_attack"].includes(
    value
  );
};

const getRandomOffset = () => {
  const offsets = [-10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return offsets[Math.floor(Math.random() * offsets.length)];
};

const buildQuestion = (
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

export default function GameScreen() {
  const params = useLocalSearchParams();

  const difficulty = useMemo<Difficulty>(() => {
    const value = getParamValue(params.difficulty, "easy");
    return isValidDifficulty(value) ? value : "easy";
  }, [params.difficulty]);

  const mode = useMemo<GameMode>(() => {
    const value = getParamValue(params.mode, "classic");
    return isValidMode(value) ? value : "classic";
  }, [params.mode]);

  const totalQuestions = useMemo(() => {
    const value = Number(getParamValue(params.questions, "10"));
    return Number.isNaN(value) || value <= 0 ? 10 : value;
  }, [params.questions]);

  const difficultyData = DIFFICULTIES.find((item) => item.id === difficulty);
  const modeData = GAME_MODES.find((item) => item.id === mode);

  const timePerQuestion = difficultyData?.timePerQuestion ?? 10;

  const isTimeAttack = mode === "time_attack";

  const initialTime = isTimeAttack
    ? totalQuestions * timePerQuestion
    : timePerQuestion;

  const [currentQuestion, setCurrentQuestion] = useState<CurrentQuestion>(() =>
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

  const finishGame = ({
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

    router.replace({
      pathname: "/result",
      params: {
        score: String(finalScore),
        correct: String(finalCorrect),
        incorrect: String(finalIncorrect),
        unanswered: String(finalUnanswered),
        answered: String(answeredQuestions),
        totalPlayed: String(totalPlayed),
        totalConfigured: String(totalQuestions),
        accuracy: String(accuracy),
        averageTime: averageTime.toFixed(2),
        difficulty,
        mode,
      },
    });
  };

  const goToNextQuestion = () => {
    setCurrentQuestion(buildQuestion(difficulty, mode));
    setCurrentIndex((prev) => prev + 1);
    setAnswerInput("");
    setFeedback(null);
    setLocked(false);

    if (!isTimeAttack) {
      setRemainingTime(timePerQuestion);
    }
  };

  const processAnswer = ({
    answered,
    userAnswer,
    booleanAnswer,
  }: {
    answered: boolean;
    userAnswer?: number;
    booleanAnswer?: boolean;
  }) => {
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
  };

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
  }, [remainingTime, locked]);

  const submitTextAnswer = () => {
    if (answerInput.trim() === "") return;

    processAnswer({
      answered: true,
      userAnswer: Number(answerInput),
    });
  };

  const timerTotal = isTimeAttack ? initialTime : timePerQuestion;
  const timerPercentage = Math.max(0, (remainingTime / timerTotal) * 100);

  return (
    <ScrollView
      className="flex-1 bg-slate-100 px-6 pt-14"
      contentContainerStyle={{ paddingBottom: 32 }}
    >
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-3xl font-bold text-slate-900">
            Partida
          </Text>

          <Text className="mt-1 text-base text-slate-600">
            {modeData?.label ?? "Modo clásico"} · {difficultyData?.label ?? "Fácil"}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => router.replace("/home")}
          className="rounded-full bg-white px-4 py-2 border border-slate-300"
        >
          <Text className="font-semibold text-slate-700">
            Salir
          </Text>
        </TouchableOpacity>
      </View>

      <View className="mt-6">
        <AppCard>
          <View className="flex-row justify-between">
            <Text className="text-base font-semibold text-slate-600">
              Pregunta {currentIndex}/{totalQuestions}
            </Text>

            <Text className="text-base font-semibold text-blue-700">
              {score} pts
            </Text>
          </View>

          <View className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200">
            <View
              className="h-full rounded-full bg-blue-600"
              style={{ width: `${timerPercentage}%` }}
            />
          </View>

          <Text className="mt-2 text-right text-sm font-semibold text-slate-500">
            Tiempo restante: {remainingTime}s
          </Text>
        </AppCard>
      </View>

      <View className="mt-6">
        <AppCard>
          {mode === "true_false" ? (
            <>
              <Text className="text-center text-base font-semibold text-slate-500">
                Indicá si la operación es correcta
              </Text>

              <Text className="mt-5 text-center text-5xl font-bold text-slate-900">
                {currentQuestion.operation.question} = {currentQuestion.shownAnswer}
              </Text>
            </>
          ) : (
            <>
              <Text className="text-center text-base font-semibold text-slate-500">
                Resolvé la operación
              </Text>

              <Text className="mt-5 text-center text-5xl font-bold text-slate-900">
                {currentQuestion.operation.question}
              </Text>
            </>
          )}

          {feedback && (
            <Text className="mt-5 text-center text-lg font-bold text-blue-700">
              {feedback}
            </Text>
          )}
        </AppCard>
      </View>

      <View className="mt-6">
        {mode === "classic" || mode === "time_attack" ? (
          <AppCard>
            <Text className="mb-3 text-base font-semibold text-slate-700">
              Tu respuesta
            </Text>

            <TextInput
              value={answerInput}
              onChangeText={(text) =>
                setAnswerInput(text.replace(/[^0-9-]/g, ""))
              }
              keyboardType="numeric"
              editable={!locked}
              placeholder="Ingresá el resultado"
              className="rounded-xl border border-slate-300 bg-white px-4 py-4 text-xl text-slate-900"
            />

            <View className="mt-4">
              <AppButton
                title="Responder"
                onPress={submitTextAnswer}
              />
            </View>
          </AppCard>
        ) : null}

        {mode === "true_false" ? (
          <View className="gap-4">
            <AppButton
              title="Verdadero"
              onPress={() =>
                processAnswer({
                  answered: true,
                  booleanAnswer: true,
                })
              }
            />

            <AppButton
              title="Falso"
              variant="secondary"
              onPress={() =>
                processAnswer({
                  answered: true,
                  booleanAnswer: false,
                })
              }
            />
          </View>
        ) : null}

        {mode === "multiple_choice" ? (
          <View className="gap-4">
            {currentQuestion.choices.map((choice) => (
              <TouchableOpacity
                key={choice}
                disabled={locked}
                activeOpacity={0.8}
                onPress={() =>
                  processAnswer({
                    answered: true,
                    userAnswer: choice,
                  })
                }
                className="rounded-xl border border-slate-300 bg-white py-5"
              >
                <Text className="text-center text-2xl font-bold text-slate-900">
                  {choice}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : null}
      </View>

      <View className="mt-6">
        <AppCard>
          <View className="flex-row justify-between">
            <View>
              <Text className="text-sm text-slate-500">
                Correctas
              </Text>
              <Text className="text-2xl font-bold text-green-600">
                {correctAnswers}
              </Text>
            </View>

            <View>
              <Text className="text-sm text-slate-500">
                Incorrectas
              </Text>
              <Text className="text-2xl font-bold text-red-600">
                {incorrectAnswers}
              </Text>
            </View>

            <View>
              <Text className="text-sm text-slate-500">
                Sin responder
              </Text>
              <Text className="text-2xl font-bold text-slate-700">
                {unanswered}
              </Text>
            </View>
          </View>
        </AppCard>
      </View>
    </ScrollView>
  );
}