import { Text, View } from "react-native";

type TimerBarProps = {
  remainingTime: number;
  totalTime: number;
};

export default function TimerBar({ remainingTime, totalTime }: TimerBarProps) {
  const percentage =
    totalTime <= 0 ? 0 : Math.max(0, (remainingTime / totalTime) * 100);

  return (
    <View>
      <View className="h-3 overflow-hidden rounded-full bg-slate-200">
        <View
          className="h-full rounded-full bg-blue-600"
          style={{ width: `${percentage}%` }}
        />
      </View>

      <Text className="mt-2 text-right text-sm font-semibold text-slate-500">
        Tiempo restante: {remainingTime}s
      </Text>
    </View>
  );
}