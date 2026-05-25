import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

type GameHeaderProps = {
  title: string;
  subtitle: string;
  onReset: () => void;
  onExit: () => void;
  onBack?: () => void;
};

export default function GameHeader({
  title,
  subtitle,
  onReset,
  onExit,
  onBack,
}: GameHeaderProps) {
  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }

    router.back();
  };

  return (
    <View className="flex-row items-center justify-between gap-3">
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleBack}
        className="h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white"
      >
        <Ionicons name="chevron-back" size={22} color="#334155" />
      </TouchableOpacity>

      <View className="flex-1">
        <Text className="text-3xl font-bold text-slate-900">
          {title}
        </Text>

        <Text
          className="mt-1 text-base text-slate-600"
          numberOfLines={1}
        >
          {subtitle}
        </Text>
      </View>

      <View className="flex-row gap-2 me-4">
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onReset}
          className="h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white"
        >
          <Ionicons name="refresh-outline" size={21} color="#334155" />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onExit}
          className="h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white"
        >
          <Ionicons name="exit-outline" size={21} color="#334155" />
        </TouchableOpacity>
      </View>
    </View>
  );
}