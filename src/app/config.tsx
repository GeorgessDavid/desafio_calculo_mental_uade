import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  Animated,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import AppButton from "../components/AppButton";
import AppCard from "../components/AppCard";
import {
  DIFFICULTIES,
  GAME_MODES,
  QUESTION_OPTIONS,
} from "../constants/gameConfig";

type ConfigStep = "difficulty" | "mode" | "questions";

export default function ConfigScreen() {
  const [step, setStep] = useState<ConfigStep>("difficulty");
  const [difficulty, setDifficulty] = useState<string | null>(null);
  const [mode, setMode] = useState<string | null>(null);

  const fadeAnim = useRef(new Animated.Value(1)).current;

  const changeStep = (nextStep: ConfigStep) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      setStep(nextStep);

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 180,
        useNativeDriver: true,
      }).start();
    });
  };

  const goBack = () => {
    if (step === "questions") {
      changeStep("mode");
      return;
    }

    if (step === "mode") {
      changeStep("difficulty");
      return;
    }

    router.back();
  };

  const startGame = (questions: number) => {
    router.push({
      pathname: "/game",
      params: {
        difficulty: String(difficulty),
        mode: String(mode),
        questions: String(questions),
      },
    });
  };

  return (
    <ScrollView className="flex-1 bg-slate-100 px-6 pt-14">
      <Text className="text-3xl font-bold text-slate-900">
        Configuración
      </Text>

      <Text className="mt-2 text-base text-slate-600">
        Elegí la dificultad, el modo de juego y la cantidad de preguntas.
      </Text>

      <View className="mt-5 flex-row gap-2">
        <View
          className={`h-2 flex-1 rounded-full ${
            step === "difficulty" ? "bg-blue-600" : "bg-slate-300"
          }`}
        />
        <View
          className={`h-2 flex-1 rounded-full ${
            step === "mode" ? "bg-blue-600" : "bg-slate-300"
          }`}
        />
        <View
          className={`h-2 flex-1 rounded-full ${
            step === "questions" ? "bg-blue-600" : "bg-slate-300"
          }`}
        />
      </View>

      <Animated.View style={{ opacity: fadeAnim }} className="mt-6">
        {step === "difficulty" && (
          <View className="gap-4">
            <Text className="text-xl font-bold text-slate-900">
              1. Seleccioná la dificultad
            </Text>

            {DIFFICULTIES.map((item) => (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.8}
                onPress={() => {
                  setDifficulty(item.id);
                  changeStep("mode");
                }}
              >
                <AppCard>
                  <Text className="text-xl font-bold text-slate-900">
                    {item.label}
                  </Text>

                  <Text className="mt-2 text-base text-slate-600">
                    {item.description}
                  </Text>

                  <Text className="mt-3 text-base font-semibold text-blue-700">
                    {item.timePerQuestion} segundos por operación
                  </Text>
                </AppCard>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {step === "mode" && (
          <View className="gap-4">
            <Text className="text-xl font-bold text-slate-900">
              2. Seleccioná el modo de juego
            </Text>

            {GAME_MODES.map((item) => (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.8}
                onPress={() => {
                  setMode(item.id);
                  changeStep("questions");
                }}
              >
                <AppCard>
                  <Text className="text-xl font-bold text-slate-900">
                    {item.label}
                  </Text>

                  <Text className="mt-2 text-base text-slate-600">
                    {item.description}
                  </Text>
                </AppCard>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {step === "questions" && (
          <View className="gap-4">
            <Text className="text-xl font-bold text-slate-900">
              3. Seleccioná la cantidad de preguntas
            </Text>

            {QUESTION_OPTIONS.map((item) => (
              <TouchableOpacity
                key={item}
                activeOpacity={0.8}
                onPress={() => startGame(item)}
              >
                <AppCard>
                  <Text className="text-center text-4xl font-bold text-blue-600">
                    {item}
                  </Text>

                  <Text className="mt-2 text-center text-base text-slate-600">
                    preguntas por ronda
                  </Text>
                </AppCard>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </Animated.View>

      <View className="mb-10 mt-8">
        <AppButton
          title={step === "difficulty" ? "Volver al inicio" : "Volver"}
          variant="secondary"
          onPress={goBack}
        />
      </View>
    </ScrollView>
  );
}