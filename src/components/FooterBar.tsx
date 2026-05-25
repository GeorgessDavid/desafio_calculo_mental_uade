import Ionicons from "@expo/vector-icons/Ionicons";
import { router, usePathname } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

type FooterRoute = "/home" | "/config" | "/history";

type FooterItemProps = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: FooterRoute;
};

function FooterItem({ label, icon, route }: FooterItemProps) {
  const pathname = usePathname();
  const isActive = pathname === route;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => router.replace(route)}
      className="flex-1 items-center justify-center py-2"
    >
      <Ionicons
        name={icon}
        size={22}
        color={isActive ? "#2563eb" : "#64748b"}
      />

      <Text
        className={`mt-1 text-xs font-semibold ${
          isActive ? "text-blue-600" : "text-slate-500"
        }`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export default function FooterBar() {
  return (
    <View className="sticky bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white px-4 pb-5 pt-2 shadow-lg">
      <View className="flex-row items-center justify-around">
        <FooterItem
          label="Inicio"
          icon="home-outline"
          route="/home"
        />

        <FooterItem
          label="Nuevo juego"
          icon="play-circle-outline"
          route="/config"
        />

        <FooterItem
          label="Historial"
          icon="time-outline"
          route="/history"
        />
      </View>
    </View>
  );
}