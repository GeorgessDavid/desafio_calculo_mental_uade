import { Text, TextInput, TouchableOpacity, View } from "react-native";

import { GameMode } from "../hooks/useGame";
import AppButton from "./AppButton";
import AppCard from "./AppCard";

type ProcessAnswerParams = {
  answered: boolean;
  userAnswer?: number;
  booleanAnswer?: boolean;
};

type AnswerSectionProps = {
  mode: GameMode;
  choices: number[];
  answerInput: string;
  locked: boolean;
  onChangeAnswer: (value: string) => void;
  onSubmitTextAnswer: () => void;
  onProcessAnswer: (params: ProcessAnswerParams) => void;
};

export default function AnswerSection({
  mode,
  choices,
  answerInput,
  locked,
  onChangeAnswer,
  onSubmitTextAnswer,
  onProcessAnswer,
}: AnswerSectionProps) {
  if (mode === "classic" || mode === "time_attack") {
    return (
      <AppCard>
        <Text className="mb-3 text-base font-semibold text-slate-700">
          Tu respuesta
        </Text>

        <TextInput
          value={answerInput}
          onChangeText={onChangeAnswer}
          keyboardType="numeric"
          editable={!locked}
          placeholder="Ingresá el resultado"
          className="rounded-xl border border-slate-300 bg-white px-4 py-4 text-xl text-slate-900"
        />

        <View className="mt-4">
          <AppButton
            title="Responder"
            onPress={onSubmitTextAnswer}
          />
        </View>
      </AppCard>
    );
  }

  if (mode === "true_false") {
    return (
      <View className="gap-4">
        <AppButton
          title="Verdadero"
          onPress={() =>
            onProcessAnswer({
              answered: true,
              booleanAnswer: true,
            })
          }
        />

        <AppButton
          title="Falso"
          variant="secondary"
          onPress={() =>
            onProcessAnswer({
              answered: true,
              booleanAnswer: false,
            })
          }
        />
      </View>
    );
  }

  if (mode === "multiple_choice") {
    return (
      <View className="gap-4">
        {choices.map((choice) => (
          <TouchableOpacity
            key={choice}
            disabled={locked}
            activeOpacity={0.8}
            onPress={() =>
              onProcessAnswer({
                answered: true,
                userAnswer: choice,
              })
            }
            className="rounded-xl border border-slate-300 bg-white py-5"
          >
            <Text className="text-center text-2xl font-bold text-slate-900">
              {choice}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  return null;
}