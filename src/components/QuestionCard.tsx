import { Text } from "react-native";
import { GameMode } from "../types/game";
import AppCard from "./AppCard";

type QuestionCardProps = {
  mode: GameMode;
  question: string;
  shownAnswer: number;
  feedback: string | null;
};

export default function QuestionCard({
  mode,
  question,
  shownAnswer,
  feedback,
}: QuestionCardProps) {
  const isTrueFalse = mode === "true_false";

  return (
    <AppCard>
      <Text className="text-center text-base font-semibold text-slate-500">
        {isTrueFalse
          ? "Indicá si la operación es correcta"
          : "Resolvé la operación"}
      </Text>

      <Text className="mt-5 text-center text-5xl font-bold text-slate-900">
        {isTrueFalse ? `${question} = ${shownAnswer}` : question}
      </Text>

      {feedback && (
        <Text className="mt-5 text-center text-lg font-bold text-blue-700">
          {feedback}
        </Text>
      )}
    </AppCard>
  );
}