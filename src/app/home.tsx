import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

import AppButton from "../components/AppButton";
import AppCard from "../components/AppCard";
import BestScoreCard from "../components/BestScoreCard";
import { GameResult, getBestScore } from "../storage/gameStorage";

export default function HomeScreen() {
  const [bestScore, setBestScore] = useState<GameResult | null>(null);

  const loadBestScore = async () => {
    const storedBestScore = await getBestScore();
    setBestScore(storedBestScore);
  };

  useEffect(() => {
    loadBestScore();
  }, []);

  return (
    <View className="flex-1 justify-center bg-slate-100 px-6">
      <View className="mb-8">
        <Text className="text-center text-3xl font-bold text-slate-900">
          Juego de Cálculo Mental
        </Text>

        <Text className="mt-3 text-center text-base text-slate-600">
          Resolvé operaciones matemáticas bajo presión de tiempo.
        </Text>
      </View>

      <View className="gap-5">
        {bestScore ? (
          <BestScoreCard bestScore={bestScore} />
        ) : (
          <AppCard>
            <Text className="text-center text-base font-semibold text-slate-500">
              Mejor puntaje
            </Text>

            <Text className="mt-2 text-center text-lg text-slate-600">
              Todavía no hay partidas registradas.
            </Text>
          </AppCard>
        )}

        <AppCard>
          <View className="gap-4">
            <AppButton
              title="Nueva partida"
              onPress={() => router.push("/config")}
            />

            <AppButton
              title="Ver historial"
              variant="secondary"
              onPress={() => router.push("/history")}
            />
          </View>
        </AppCard>
      </View>
    </View>
  );
}