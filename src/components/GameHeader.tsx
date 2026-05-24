import { Text, TouchableOpacity, View } from "react-native";

type GameHeaderProps = {
  title: string;
  subtitle: string;
  onReset: () => void;
  onExit: () => void;
};

export default function GameHeader({
  title,
  subtitle,
  onReset,
  onExit,
}: GameHeaderProps) {
  return (
    <View>
      <View>
        <Text className="text-3xl font-bold text-slate-900">
          {title}
        </Text>

        <Text className="mt-1 text-base text-slate-600">
          {subtitle}
        </Text>
      </View>

      <View className="mt-4 flex-row gap-3">
        <TouchableOpacity
          onPress={onReset}
          className="flex-1 rounded-full border border-slate-300 bg-white px-4 py-2"
        >
          <Text className="text-center font-semibold text-slate-700">
            Reiniciar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onExit}
          className="flex-1 rounded-full border border-slate-300 bg-white px-4 py-2"
        >
          <Text className="text-center font-semibold text-slate-700">
            Salir
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}