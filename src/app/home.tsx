import { router } from "expo-router";
import { Text, View } from "react-native";
import AppButton from "../components/AppButton";
import AppCard from "../components/AppCard";

export default function HomeScreen() {
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
  );
}