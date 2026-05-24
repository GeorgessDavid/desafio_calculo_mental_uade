import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import AppButton from "../components/AppButton";
import ConfigOptionCard from "../components/ConfigOptionCard";
import StepIndicator from "../components/StepIndicator";

import {
  DIFFICULTIES,
  GAME_MODES,
  QUESTION_OPTIONS,
} from "../constants/gameConfig";

type ConfigStep = "difficulty" | "mode" | "questions";

const getStepNumber = (step: ConfigStep) => {
  if (step === "difficulty") return 1;
  if (step === "mode") return 2;
  return 3;
};

export default function ConfigScreen() {
  const [step, setStep] = useState<ConfigStep>("difficulty");
  const [difficulty, setDifficulty] = useState<string | null>(null);
  const [mode, setMode] = useState<string | null>(null);

  const goBack = () => {
    if (step === "questions") {
      setStep("mode");
      return;
    }

    if (step === "mode") {
      setStep("difficulty");
      return;
    }

    router.back();
  };

  const startGame = (questions: number) => {
    if (!difficulty || !mode) return;

    router.push({
      pathname: "/game",
      params: {
        difficulty,
        mode,
        questions: String(questions),
      },
    });
  };

  return (
    <ScrollView
      className="flex-1 bg-slate-100 px-6 pt-14"
      contentContainerStyle={{ paddingBottom: 32 }}
    >
      <Text className="text-3xl font-bold text-slate-900">
        Configuración
      </Text>

      <Text className="mt-2 text-base text-slate-600">
        Elegí la dificultad, el modo de juego y la cantidad de preguntas.
      </Text>

      <StepIndicator currentStep={getStepNumber(step)} totalSteps={3} />

      <View className="mt-6">
        {step === "difficulty" && (
          <View className="gap-4">
            <Text className="text-xl font-bold text-slate-900">
              Seleccioná la dificultad
            </Text>

            {DIFFICULTIES.map((item) => (
              <ConfigOptionCard
                key={item.id}
                title={item.label}
                description={item.description}
                footer={`${item.timePerQuestion} segundos por operación`}
                selected={difficulty === item.id}
                onPress={() => {
                  setDifficulty(item.id);
                  setStep("mode");
                }}
              />
            ))}
          </View>
        )}

        {step === "mode" && (
          <View className="gap-4">
            <Text className="text-xl font-bold text-slate-900">
              Seleccioná el modo de juego
            </Text>

            {GAME_MODES.map((item) => (
              <ConfigOptionCard
                key={item.id}
                title={item.label}
                description={item.description}
                selected={mode === item.id}
                onPress={() => {
                  setMode(item.id);
                  setStep("questions");
                }}
              />
            ))}
          </View>
        )}

        {step === "questions" && (
          <View className="gap-4">
            <Text className="text-xl font-bold text-slate-900">
              Seleccioná la cantidad de preguntas
            </Text>

            {QUESTION_OPTIONS.map((item) => (
              <ConfigOptionCard
                key={item}
                title={String(item)}
                description="preguntas por ronda"
                center
                onPress={() => startGame(item)}
              />
            ))}
          </View>
        )}
      </View>

      <View className="mt-8">
        <AppButton
          title={step === "difficulty" ? "Volver al inicio" : "Volver"}
          variant="secondary"
          onPress={goBack}
        />
      </View>
    </ScrollView>
  );
}