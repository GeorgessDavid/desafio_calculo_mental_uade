import { router, useLocalSearchParams } from "expo-router";
import { ScrollView, View } from "react-native";
import AnswerSection from "../components/AnswerSection";
import GameHeader from "../components/GameHeader";
import GameProgressCard from "../components/GameProgressCard";
import GameStatsCard from "../components/GameStatsCard";
import QuestionCard from "../components/QuestionCard";
import { DIFFICULTIES, GAME_MODES } from "../constants/gameConfig";
import { useGame } from "../hooks/useGame";
import { Difficulty } from "../logic/generateOperation";
import { GameMode } from '../types/game';

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
  return [
    "classic",
    "true_false",
    "multiple_choice",
    "time_attack",
  ].includes(value);
};

export default function GameScreen() {
  const params = useLocalSearchParams();

  const difficultyParam = getParamValue(params.difficulty, "easy");
  const modeParam = getParamValue(params.mode, "classic");
  const questionsParam = getParamValue(params.questions, "10");

  const difficulty = isValidDifficulty(difficultyParam)
    ? difficultyParam
    : "easy";

  const mode = isValidMode(modeParam) ? modeParam : "classic";

  const totalQuestions = Number.isNaN(Number(questionsParam))
    ? 10
    : Number(questionsParam);

  const difficultyData = DIFFICULTIES.find(
    (item) => item.id === difficulty
  );

  const modeData = GAME_MODES.find((item) => item.id === mode);

  const game = useGame({
    difficulty,
    mode,
    totalQuestions,
  });

  return (
    <ScrollView
      className="flex-1 bg-slate-100 px-6 pt-14"
      contentContainerStyle={{ paddingBottom: 32 }}
    >
      <GameHeader
        title="Partida"
        subtitle={`${modeData?.label ?? "Modo clásico"} · ${difficultyData?.label ?? "Fácil"
          }`}
        onReset={game.resetGame}
        onExit={() => router.replace("/home")}
      />

      <View className="mt-6">
        <GameProgressCard
          currentIndex={game.currentIndex}
          totalQuestions={game.totalQuestions}
          score={game.score}
          remainingTime={game.remainingTime}
          timerTotal={game.timerTotal}
        />
      </View>

      <View className="mt-6">
        <QuestionCard
          mode={mode}
          question={game.currentQuestion.operation.question}
          shownAnswer={game.currentQuestion.shownAnswer}
          feedback={game.feedback}
        />
      </View>

      <View className="mt-6">
        <AnswerSection
          mode={mode}
          choices={game.currentQuestion.choices}
          answerInput={game.answerInput}
          locked={game.locked}
          onChangeAnswer={game.updateAnswerInput}
          onSubmitTextAnswer={game.submitTextAnswer}
          onProcessAnswer={game.processAnswer}
        />
      </View>

      <View className="mt-6">
        <GameStatsCard
          correctAnswers={game.correctAnswers}
          incorrectAnswers={game.incorrectAnswers}
          unanswered={game.unanswered}
        />
      </View>
    </ScrollView>
  );
}