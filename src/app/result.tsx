import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

import AppButton from "../components/AppButton";
import AppCard from "../components/AppCard";
import StatBox from "../components/StatBox";
import { DIFFICULTIES, GAME_MODES } from "../constants/gameConfig";
import { GameResult, getBestScore } from "../storage/gameStorage";

const getParamValue = (
  value: string | string[] | undefined,
  fallback: string
) => {
  if (Array.isArray(value)) {
    return value[0] ?? fallback;
  }

  return value ?? fallback;
};

export default function ResultScreen() {
  const params = useLocalSearchParams();

  const [bestScore, setBestScore] = useState<GameResult | null>(null);

  const resultId = getParamValue(params.resultId, "");
  const score = Number(getParamValue(params.score, "0"));
  const correct = Number(getParamValue(params.correct, "0"));
  const incorrect = Number(getParamValue(params.incorrect, "0"));
  const unanswered = Number(getParamValue(params.unanswered, "0"));
  const answered = Number(getParamValue(params.answered, "0"));
  const totalPlayed = Number(getParamValue(params.totalPlayed, "0"));
  const totalConfigured = Number(getParamValue(params.totalConfigured, "0"));
  const accuracy = Number(getParamValue(params.accuracy, "0"));
  const averageTime = Number(getParamValue(params.averageTime, "0"));
  const difficulty = getParamValue(params.difficulty, "easy");
  const mode = getParamValue(params.mode, "classic");

  const difficultyData = DIFFICULTIES.find((item) => item.id === difficulty);
  const modeData = GAME_MODES.find((item) => item.id === mode);

  useEffect(() => {
    const loadBestScore = async () => {
      const storedBestScore = await getBestScore();
      setBestScore(storedBestScore);
    };

    loadBestScore();
  }, []);

  const isNewBestScore = bestScore?.id === resultId;

  return (
    <ScrollView
      className="flex-1 bg-slate-100 px-6 pt-14"
      contentContainerStyle={{ paddingBottom: 32 }}
    >
      <Text className="text-3xl font-bold text-slate-900">
        Resultado final
      </Text>

      <Text className="mt-2 text-base text-slate-600">
        Estadísticas obtenidas al finalizar la ronda.
      </Text>

      <View className="mt-6 gap-5">
        <AppCard>
          <Text className="text-center text-base font-semibold text-slate-500">
            Puntaje total
          </Text>

          <Text className="mt-3 text-center text-6xl font-bold text-blue-600">
            {score}
          </Text>

          <Text className="mt-3 text-center text-sm text-slate-500">
            {modeData?.label ?? mode} · {difficultyData?.label ?? difficulty}
          </Text>

          {isNewBestScore && (
            <View className="mt-4 rounded-xl bg-blue-50 px-4 py-3">
              <Text className="text-center text-base font-bold text-blue-700">
                Nuevo mejor puntaje
              </Text>
            </View>
          )}
        </AppCard>

        <AppCard>
          <Text className="mb-4 text-xl font-bold text-slate-900">
            Rendimiento
          </Text>

          <View className="flex-row gap-3">
            <StatBox
              label="Precisión"
              value={`${accuracy}%`}
              variant="primary"
            />

            <StatBox
              label="Promedio"
              value={`${averageTime}s`}
              variant="neutral"
            />
          </View>

          <View className="mt-3 flex-row gap-3">
            <StatBox
              label="Puntaje"
              value={score}
              variant="primary"
            />

            <StatBox
              label="Respondidas"
              value={answered}
              variant="neutral"
            />
          </View>
        </AppCard>

        <AppCard>
          <Text className="mb-4 text-xl font-bold text-slate-900">
            Detalle de respuestas
          </Text>

          <View className="flex-row gap-3">
            <StatBox
              label="Correctas"
              value={correct}
              variant="success"
            />

            <StatBox
              label="Incorrectas"
              value={incorrect}
              variant="danger"
            />

            <StatBox
              label="Sin resp."
              value={unanswered}
              variant="neutral"
            />
          </View>

          <View className="mt-5 gap-3">
            <View className="flex-row justify-between">
              <Text className="text-base text-slate-600">
                Preguntas jugadas
              </Text>

              <Text className="text-base font-bold text-slate-900">
                {totalPlayed}/{totalConfigured}
              </Text>
            </View>

            <View className="flex-row justify-between">
              <Text className="text-base text-slate-600">
                Modo de juego
              </Text>

              <Text className="text-base font-bold text-slate-900">
                {modeData?.label ?? mode}
              </Text>
            </View>

            <View className="flex-row justify-between">
              <Text className="text-base text-slate-600">
                Dificultad
              </Text>

              <Text className="text-base font-bold text-slate-900">
                {difficultyData?.label ?? difficulty}
              </Text>
            </View>
          </View>
        </AppCard>

        {bestScore && (
          <AppCard>
            <Text className="text-base font-semibold text-slate-500">
              Mejor puntaje histórico
            </Text>

            <Text className="mt-2 text-3xl font-bold text-blue-600">
              {bestScore.score} pts
            </Text>

            <Text className="mt-2 text-sm text-slate-600">
              Precisión: {bestScore.accuracy}% · Tiempo promedio:{" "}
              {bestScore.averageTime}s
            </Text>
          </AppCard>
        )}

        <View className="gap-4">
          <AppButton
            title="Nueva partida"
            onPress={() => router.replace("/config")}
          />

          <AppButton
            title="Ver historial"
            variant="secondary"
            onPress={() => router.replace("/history")}
          />

          <AppButton
            title="Volver al inicio"
            variant="secondary"
            onPress={() => router.replace("/home")}
          />
        </View>
      </View>
    </ScrollView>
  );
}