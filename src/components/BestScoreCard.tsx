import { Text, View } from "react-native";
import { GameResult } from "../storage/gameStorage";
import AppCard from "./AppCard";

type BestScoreCardProps = {
  bestScore: GameResult;
};

export default function BestScoreCard({ bestScore }: BestScoreCardProps) {
  return (
    <AppCard>
      <Text className="text-base font-semibold text-slate-500">
        Mejor puntaje
      </Text>

      <Text className="mt-2 text-4xl font-bold text-blue-600">
        {bestScore.score} pts.
      </Text>

      <View className="mt-3 gap-1">
        <Text className="text-sm text-slate-600">
          Precisión: {bestScore.accuracy}%
        </Text>

        <Text className="text-sm text-slate-600">
          Tiempo promedio: {bestScore.averageTime}s
        </Text>

        <Text className="text-sm text-slate-600">
          Correctas: {bestScore.correct} · Incorrectas:{" "}
          {bestScore.incorrect} · Sin responder: {bestScore.unanswered}
        </Text>
      </View>
    </AppCard>
  );
}