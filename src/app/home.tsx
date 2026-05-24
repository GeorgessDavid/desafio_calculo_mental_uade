import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Text, View } from "react-native";

import AppButton from "../components/AppButton";
import AppCard from "../components/AppCard";
import { DIFFICULTIES, GAME_MODES } from "../constants/gameConfig";
import { GameResult, getBestScore } from "../storage/gameStorage";

export default function HomeScreen() {
  const [bestScore, setBestScore] = useState<GameResult | null>(null);

  const loadBestScore = async () => {
    const storedBestScore = await getBestScore();
    setBestScore(storedBestScore);
  };

  useFocusEffect(
    useCallback(() => {
      loadBestScore();
    }, [])
  );

  const difficultyData = bestScore
    ? DIFFICULTIES.find((item) => item.id === bestScore.difficulty)
    : null;

  const modeData = bestScore
    ? GAME_MODES.find((item) => item.id === bestScore.mode)
    : null;

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
        <AppCard>
          {bestScore ? (
            <View>
              <Text className="text-center text-base font-semibold text-slate-500">
                Mejor puntaje
              </Text>

              <Text className="mt-2 text-center text-5xl font-bold text-blue-600">
                {bestScore.score}
              </Text>

              <Text className="mt-2 text-center text-sm text-slate-500">
                {modeData?.label ?? bestScore.mode} ·{" "}
                {difficultyData?.label ?? bestScore.difficulty}
              </Text>

              <Text className="mt-1 text-center text-sm text-slate-500">
                Precisión: {bestScore.accuracy}% · Tiempo promedio:{" "}
                {bestScore.averageTime}s
              </Text>
            </View>
          ) : (
            <View>
              <Text className="text-center text-base font-semibold text-slate-500">
                Mejor puntaje
              </Text>

              <Text className="mt-2 text-center text-lg text-slate-600">
                Todavía no hay partidas registradas.
              </Text>
            </View>
          )}
        </AppCard>

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