import { Text, TouchableOpacity, View } from "react-native";

type ConfigOptionCardProps = {
  title: string;
  description?: string;
  footer?: string;
  selected?: boolean;
  center?: boolean;
  onPress: () => void;
};

export default function ConfigOptionCard({
  title,
  description,
  footer,
  selected = false,
  center = false,
  onPress,
}: ConfigOptionCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      className={`rounded-2xl border bg-white p-5 shadow-sm ${
        selected ? "border-blue-600 bg-blue-50" : "border-slate-200"
      }`}
    >
      <Text
        className={`text-xl font-bold text-slate-900 ${
          center ? "text-center" : ""
        }`}
      >
        {title}
      </Text>

      {description && (
        <Text
          className={`mt-2 text-base text-slate-600 ${
            center ? "text-center" : ""
          }`}
        >
          {description}
        </Text>
      )}

      {footer && (
        <View className={center ? "items-center" : ""}>
          <Text className="mt-3 text-base font-semibold text-blue-700">
            {footer}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}