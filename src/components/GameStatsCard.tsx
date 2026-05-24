import { View } from "react-native";

import AppCard from "./AppCard";
import StatBox from "./StatBox";

type GameStatsCardProps = {
  correctAnswers: number;
  incorrectAnswers: number;
  unanswered: number;
};

export default function GameStatsCard({
  correctAnswers,
  incorrectAnswers,
  unanswered,
}: GameStatsCardProps) {
  return (
    <AppCard>
      <View className="flex-row gap-3">
        <StatBox
          label="Correctas"
          value={correctAnswers}
          variant="success"
        />

        <StatBox
          label="Incorrectas"
          value={incorrectAnswers}
          variant="danger"
        />

        <StatBox
          label="Sin resp."
          value={unanswered}
          variant="neutral"
        />
      </View>
    </AppCard>
  );
}