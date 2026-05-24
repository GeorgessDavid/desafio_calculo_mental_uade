import { Text, View } from "react-native";

import AppCard from "./AppCard";
import TimerBar from "./TimerBar";

type GameProgressCardProps = {
  currentIndex: number;
  totalQuestions: number;
  score: number;
  remainingTime: number;
  timerTotal: number;
};

export default function GameProgressCard({
  currentIndex,
  totalQuestions,
  score,
  remainingTime,
  timerTotal,
}: GameProgressCardProps) {
  return (
    <AppCard>
      <View className="flex-row justify-between">
        <Text className="text-base font-semibold text-slate-600">
          Pregunta {currentIndex}/{totalQuestions}
        </Text>

        <Text className="text-base font-semibold text-blue-700">
          {score} pts
        </Text>
      </View>

      <View className="mt-4">
        <TimerBar
          remainingTime={remainingTime}
          totalTime={timerTotal}
        />
      </View>
    </AppCard>
  );
}