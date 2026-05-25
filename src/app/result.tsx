import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import AppCard from "../components/AppCard";
import BestScoreCard from "../components/BestScoreCard";
import FooterBar from "../components/FooterBar";
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

const getNumberParam = (
  value: string | string[] | undefined,
  fallback = 0
) => {
  const parsedValue = Number(getParamValue(value, String(fallback)));

  return Number.isNaN(parsedValue) ? fallback : parsedValue;
};

export default function ResultScreen() {
  const params = useLocalSearchParams();

  const [bestScore, setBestScore] = useState<GameResult | null>(null);

  const resultId = getParamValue(params.resultId, "");

  const score = getNumberParam(params.score);
  const correct = getNumberParam(params.correct);
  const incorrect = getNumberParam(params.incorrect);
  const unanswered = getNumberParam(params.unanswered);
  const answered = getNumberParam(params.answered);
  const totalPlayed = getNumberParam(params.totalPlayed);
  const totalConfigured = getNumberParam(params.totalConfigured);
  const accuracy = getNumberParam(params.accuracy);
  const averageTime = getNumberParam(params.averageTime);

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
    <View className="flex-1">

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

          {bestScore && <BestScoreCard bestScore={bestScore} />}
        </View>
      </ScrollView>
      <FooterBar />
    </View>
  );
}