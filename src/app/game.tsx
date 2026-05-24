import { router, useLocalSearchParams } from "expo-router";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import AppButton from "../components/AppButton";
import AppCard from "../components/AppCard";
import StatBox from "../components/StatBox";
import TimerBar from "../components/TimerBar";
import { DIFFICULTIES, GAME_MODES } from "../constants/gameConfig";
import { GameMode, useGame } from "../hooks/useGame";
import { Difficulty } from "../logic/generateOperation";

const getParamValue = (
  value: string | string[] | undefined,
  fallback: string
) => {
  if (Array.isArray(value)) {
    return value[0] ?? fallback;
  }

  return value ?? fallback;
};

const isValidDifficulty = (value: string): value is Difficulty => {
  return ["easy", "medium", "hard"].includes(value);
};

const isValidMode = (value: string): value is GameMode => {
  return [
    "classic",
    "true_false",
    "multiple_choice",
    "time_attack",
  ].includes(value);
};

export default function GameScreen() {
  const params = useLocalSearchParams();

  const difficultyParam = getParamValue(params.difficulty, "easy");
  const modeParam = getParamValue(params.mode, "classic");
  const questionsParam = getParamValue(params.questions, "10");

  const difficulty = isValidDifficulty(difficultyParam)
    ? difficultyParam
    : "easy";

  const mode = isValidMode(modeParam) ? modeParam : "classic";

  const totalQuestions = Number.isNaN(Number(questionsParam))
    ? 10
    : Number(questionsParam);

  const difficultyData = DIFFICULTIES.find(
    (item) => item.id === difficulty
  );

  const modeData = GAME_MODES.find((item) => item.id === mode);

  const game = useGame({
    difficulty,
    mode,
    totalQuestions,
  });

  return (
    <ScrollView
      className="flex-1 bg-slate-100 px-6 pt-14"
      contentContainerStyle={{ paddingBottom: 32 }}
    >
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-3xl font-bold text-slate-900">
            Partida
          </Text>

          <Text className="mt-1 text-base text-slate-600">
            {modeData?.label ?? "Modo clásico"} ·{" "}
            {difficultyData?.label ?? "Fácil"}
          </Text>
        </View>
        <View className="w-xl flex-row items-center justify-between gap-4">
          <TouchableOpacity
            onPress={game.resetGame}
            className="rounded-full border border-slate-300 bg-white px-4 py-2"
          >
            <Text className="font-semibold text-slate-700">
              Reiniciar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.replace("/home")}
            className="rounded-full border border-slate-300 bg-white px-4 py-2"
          >
            <Text className="font-semibold text-slate-700">
              Salir
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="mt-6">
        <AppCard>
          <View className="flex-row justify-between">
            <Text className="text-base font-semibold text-slate-600">
              Pregunta {game.currentIndex}/{game.totalQuestions}
            </Text>

            <Text className="text-base font-semibold text-blue-700">
              {game.score} pts
            </Text>
          </View>

          <View className="mt-4">
            <TimerBar
              remainingTime={game.remainingTime}
              totalTime={game.timerTotal}
            />
          </View>
        </AppCard>
      </View>

      <View className="mt-6">
        <AppCard>
          {mode === "true_false" ? (
            <>
              <Text className="text-center text-base font-semibold text-slate-500">
                Indicá si la operación es correcta
              </Text>

              <Text className="mt-5 text-center text-5xl font-bold text-slate-900">
                {game.currentQuestion.operation.question} ={" "}
                {game.currentQuestion.shownAnswer}
              </Text>
            </>
          ) : (
            <>
              <Text className="text-center text-base font-semibold text-slate-500">
                Resolvé la operación
              </Text>

              <Text className="mt-5 text-center text-5xl font-bold text-slate-900">
                {game.currentQuestion.operation.question}
              </Text>
            </>
          )}

          {game.feedback && (
            <Text className="mt-5 text-center text-lg font-bold text-blue-700">
              {game.feedback}
            </Text>
          )}
        </AppCard>
      </View>

      <View className="mt-6">
        {mode === "classic" || mode === "time_attack" ? (
          <AppCard>
            <Text className="mb-3 text-base font-semibold text-slate-700">
              Tu respuesta
            </Text>

            <TextInput
              value={game.answerInput}
              onChangeText={game.updateAnswerInput}
              keyboardType="numeric"
              editable={!game.locked}
              placeholder="Ingresá el resultado"
              className="rounded-xl border border-slate-300 bg-white px-4 py-4 text-xl text-slate-900"
            />

            <View className="mt-4">
              <AppButton
                title="Responder"
                onPress={game.submitTextAnswer}
              />
            </View>
          </AppCard>
        ) : null}

        {mode === "true_false" ? (
          <View className="gap-4">
            <AppButton
              title="Verdadero"
              onPress={() =>
                game.processAnswer({
                  answered: true,
                  booleanAnswer: true,
                })
              }
            />

            <AppButton
              title="Falso"
              variant="secondary"
              onPress={() =>
                game.processAnswer({
                  answered: true,
                  booleanAnswer: false,
                })
              }
            />
          </View>
        ) : null}

        {mode === "multiple_choice" ? (
          <View className="gap-4">
            {game.currentQuestion.choices.map((choice) => (
              <TouchableOpacity
                key={choice}
                disabled={game.locked}
                activeOpacity={0.8}
                onPress={() =>
                  game.processAnswer({
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
        ) : null}
      </View>

      <View className="mt-6">
        <AppCard>
          <View className="flex-row gap-3">
            <StatBox
              label="Correctas"
              value={game.correctAnswers}
              variant="success"
            />

            <StatBox
              label="Incorrectas"
              value={game.incorrectAnswers}
              variant="danger"
            />

            <StatBox
              label="Sin resp."
              value={game.unanswered}
              variant="neutral"
            />
          </View>
        </AppCard>
      </View>
    </ScrollView>
  );
}