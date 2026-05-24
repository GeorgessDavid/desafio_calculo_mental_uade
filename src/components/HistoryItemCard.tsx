import { Text, View } from "react-native";
import { DIFFICULTIES, GAME_MODES } from "../constants/gameConfig";
import { GameResult } from "../storage/gameStorage";
import AppCard from "./AppCard";

type HistoryItemCardProps = {
  item: GameResult;
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function HistoryItemCard({ item }: HistoryItemCardProps) {
  const difficultyData = DIFFICULTIES.find(
    (difficulty) => difficulty.id === item.difficulty
  );

  const modeData = GAME_MODES.find((mode) => mode.id === item.mode);

  return (
    <AppCard>
      <View className="flex-row items-start justify-between gap-4">
        <View className="flex-1">
          <Text className="text-2xl font-bold text-slate-900">
            {item.score} pts.
          </Text>

          <Text className="mt-1 text-sm text-slate-500">
            {formatDate(item.date)}
          </Text>
        </View>

        <View className="rounded-full bg-blue-50 px-3 py-1">
          <Text className="text-sm font-bold text-blue-700">
            {item.accuracy}%
          </Text>
        </View>
      </View>

      <View className="mt-4 gap-2">
        <Text className="text-base text-slate-700">
          Modo: {modeData?.label ?? item.mode}
        </Text>

        <Text className="text-base text-slate-700">
          Dificultad: {difficultyData?.label ?? item.difficulty}
        </Text>

        <Text className="text-base text-slate-700">
          Correctas: {item.correct} · Incorrectas: {item.incorrect} · Sin
          responder: {item.unanswered}
        </Text>

        <Text className="text-base text-slate-700">
          Tiempo promedio: {item.averageTime}s
        </Text>

        <Text className="text-base text-slate-700">
          Preguntas jugadas: {item.totalPlayed}/{item.totalConfigured}
        </Text>
      </View>
    </AppCard>
  );
}