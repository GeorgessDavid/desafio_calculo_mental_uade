import { router, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

import AppButton from "../components/AppButton";
import AppCard from "../components/AppCard";

export default function GameScreen() {
  const { difficulty, mode, questions } = useLocalSearchParams();

  return (
    <View className="flex-1 bg-slate-100 px-6 pt-14">
      <Text className="text-3xl font-bold text-slate-900">
        Partida
      </Text>

      <Text className="mt-2 text-base text-slate-600">
        Pantalla base del juego. Luego conectaremos la lógica.
      </Text>

      <View className="mt-6">
        <AppCard>
          <Text className="text-base font-semibold text-slate-500">
            Configuración seleccionada
          </Text>

          <Text className="mt-4 text-lg text-slate-900">
            Dificultad: {String(difficulty)}
          </Text>

          <Text className="mt-2 text-lg text-slate-900">
            Modo: {String(mode)}
          </Text>

          <Text className="mt-2 text-lg text-slate-900">
            Preguntas: {String(questions)}
          </Text>
        </AppCard>
      </View>

      <View className="mt-6">
        <AppCard>
          <Text className="text-center text-lg text-slate-500">
            Operación actual
          </Text>

          <Text className="mt-4 text-center text-5xl font-bold text-slate-900">
            8 + 5
          </Text>

          <Text className="mt-4 text-center text-base text-slate-500">
            Acá irá el input, botones o multiple choice según el modo.
          </Text>
        </AppCard>
      </View>

      <View className="mt-auto mb-8 gap-4">
        <AppButton
          title="Finalizar prueba"
          onPress={() =>
            router.replace({
              pathname: "/result",
              params: {
                score: "0",
                correct: "0",
                incorrect: "0",
                total: String(questions ?? 0),
              },
            })
          }
        />

        <AppButton
          title="Cancelar"
          variant="secondary"
          onPress={() => router.replace("/home")}
        />
      </View>
    </View>
  );
}