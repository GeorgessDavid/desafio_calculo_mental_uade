import { router, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

import AppButton from "../components/AppButton";
import AppCard from "../components/AppCard";

export default function ResultScreen() {
  const { score, correct, incorrect, total, accuracy, averageTime } = useLocalSearchParams();

  return (
    <View className="flex-1 bg-slate-100 px-6 pt-14">
      <Text className="text-3xl font-bold text-slate-900">
        Resultado final
      </Text>

      <Text className="mt-2 text-base text-slate-600">
        Estadísticas obtenidas al finalizar la ronda.
      </Text>

      <View className="mt-6 gap-4">
        <AppCard>
          <Text className="text-center text-base font-semibold text-slate-500">
            Puntaje total
          </Text>

          <Text className="mt-3 text-center text-5xl font-bold text-blue-600">
            {String(score ?? 0)}
          </Text>
        </AppCard>

        <AppCard>
          <View className="gap-3">
            <Text className="text-lg text-slate-900">
              Preguntas totales: {String(total ?? 0)}
            </Text>

            <Text className="text-lg text-slate-900">
              Correctas: {String(correct ?? 0)}
            </Text>

            <Text className="text-lg text-slate-900">
              Incorrectas: {String(incorrect ?? 0)}
            </Text>

            <Text className="text-lg text-slate-900">
              Precisión: {accuracy}%
            </Text>

            <Text className="text-lg text-slate-900">
              Tiempo promedio {String(averageTime).replace('.', ',')} s
            </Text>
          </View>
        </AppCard>
      </View>

      <View className="mt-auto mb-8 gap-4">
        <AppButton
          title="Nueva partida"
          onPress={() => router.replace("/config")}
        />

        <AppButton
          title="Volver al inicio"
          variant="secondary"
          onPress={() => router.replace("/home")}
        />
      </View>
    </View>
  );
}