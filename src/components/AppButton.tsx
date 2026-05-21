import { Text, TouchableOpacity } from "react-native";

type AppButtonProps = {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "danger";
};

export default function AppButton({
  title,
  onPress,
  variant = "primary",
}: AppButtonProps) {
  const styles = {
    primary: "bg-blue-600",
    secondary: "bg-white border border-slate-300",
    danger: "bg-red-600",
  };

  const textStyles = {
    primary: "text-white",
    secondary: "text-slate-800",
    danger: "text-white",
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`rounded-xl py-4 px-5 ${styles[variant]}`}
      activeOpacity={0.8}
    >
      <Text className={`text-center text-base font-semibold ${textStyles[variant]}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}