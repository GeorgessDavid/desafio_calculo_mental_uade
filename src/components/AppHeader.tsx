import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

type HeaderAction = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
};

type AppHeaderProps = {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  onBack?: () => void;
  actions?: HeaderAction[];
};

export default function AppHeader({
  title,
  subtitle,
  showBackButton = true,
  onBack,
  actions = [],
}: AppHeaderProps) {
  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }

    router.back();
  };

  return (
    <View className="py-4 px-2 shadow-slate-400 border-b-2 border-b-gray-100 bg-white">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-3">
          {showBackButton && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleBack}
              className="h-10 w-10 items-center justify-center"
            >
              <Ionicons name="chevron-back" size={22} color="#334155" />
            </TouchableOpacity>
          )}

          <View>
            <Text className="text-3xl font-bold text-slate-900">
              {title}
            </Text>

            {subtitle && (
              <Text className="mt-1 text-base text-slate-600">
                {subtitle}
              </Text>
            )}
          </View>
        </View>

        {actions.length > 0 && (
          <View className="flex-row gap-2">
            {actions.map((action) => (
              <TouchableOpacity
                key={action.label}
                activeOpacity={0.8}
                onPress={action.onPress}
                className="h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white"
              >
                <Ionicons name={action.icon} size={21} color="#334155" />
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}