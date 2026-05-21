import { ReactNode } from "react";
import { View } from "react-native";

type AppCardProps = {
  children: ReactNode;
};

export default function AppCard({ children }: AppCardProps) {
  return (
    <View className="rounded-2xl bg-white p-5 shadow-sm border border-slate-200">
      {children}
    </View>
  );
}