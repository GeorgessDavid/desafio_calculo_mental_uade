import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import AppButton from "../components/AppButton";
import AppCard from "../components/AppCard";
import AppHeader from '../components/AppHeader';
import BestScoreCard from "../components/BestScoreCard";
import FooterBar from "../components/FooterBar";
import HistoryItemCard from "../components/HistoryItemCard";
import { clearGameHistory, GameResult, getBestScore, getGameHistory } from "../storage/gameStorage";

export default function HistoryScreen() {
  const [history, setHistory] = useState<GameResult[]>([]);
  const [bestScore, setBestScore] = useState<GameResult | null>(null);

  const loadHistory = async () => {
    const storedHistory = await getGameHistory();
    const storedBestScore = await getBestScore();

    setHistory(storedHistory);
    setBestScore(storedBestScore);
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handleClearHistory = () => {
    Alert.alert(
      "Limpiar historial",
      "¿Seguro que querés eliminar todas las partidas guardadas?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            await clearGameHistory();
            await loadHistory();
          },
        },
      ]
    );
  };

  return (
    <View className="flex-1 bg-slate-100">
      <AppHeader title="Historial" />
      <ScrollView
        className="flex-1 bg-slate-100 px-6 pt-14"
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <Text className="mt-2 text-base text-slate-600">
          Partidas guardadas localmente en el dispositivo.
        </Text>

        <View className="mt-6 gap-5">
          {bestScore && <BestScoreCard bestScore={bestScore} />}

          {history.length === 0 ? (
            <AppCard>
              <Text className="text-center text-base font-semibold text-slate-500">
                Todavía no hay partidas registradas.
              </Text>

              <Text className="mt-2 text-center text-sm text-slate-500">
                Jugá una partida para comenzar a generar estadísticas.
              </Text>
            </AppCard>
          ) : (
            <View className="gap-4">
              <Text className="text-xl font-bold text-slate-900">
                Partidas recientes
              </Text>

              {history.map((item) => (
                <HistoryItemCard key={item.id} item={item} />
              ))}
            </View>
          )}

          <View className="gap-4">
            {history.length > 0 && (
              <AppButton
                title="Limpiar historial"
                variant="danger"
                onPress={handleClearHistory}
              />
            )}

            <AppButton
              title="Volver"
              variant="secondary"
              onPress={() => router.back()}
            />
          </View>
        </View>
      </ScrollView>
      <FooterBar />
    </View>
  );
}