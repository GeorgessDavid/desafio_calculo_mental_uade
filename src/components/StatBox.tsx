import { Text, View } from "react-native";

type StatBoxProps = {
  label: string;
  value: string | number;
  variant?: "success" | "danger" | "neutral" | "primary";
};

export default function StatBox({
  label,
  value,
  variant = "neutral",
}: StatBoxProps) {
  const textColor = {
    success: "text-green-600",
    danger: "text-red-600",
    neutral: "text-slate-700",
    primary: "text-blue-600",
  };

  return (
    <View className="flex-1 rounded-xl border border-slate-200 bg-white p-3">
      <Text className="text-sm text-slate-500">{label}</Text>

      <Text className={`mt-1 text-2xl font-bold ${textColor[variant]}`}>
        {value}
      </Text>
    </View>
  );
}