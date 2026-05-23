import { router } from "expo-router";
import { Text, View } from "react-native";

import AppButton from "../components/AppButton";
import AppCard from "../components/AppCard";

export default function HistoryScreen() {
  return (
    <View className="flex-1 bg-slate-100 px-6 pt-14">
      <Text className="text-3xl font-bold text-slate-900">
        Historial
      </Text>

      <Text className="mt-2 text-base text-slate-600">
        Acá se mostrarán las partidas guardadas localmente.
      </Text>

      <View className="mt-6">
        <AppCard>
          <Text className="text-center text-base text-slate-500">
            Todavía no hay partidas registradas.
          </Text>
        </AppCard>
      </View>

      <View className="mt-auto mb-8">
        <AppButton
          title="Volver"
          variant="secondary"
          onPress={() => router.back()}
        />
      </View>
    </View>
  );
}