// import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
// import { useColorScheme } from 'react-native';
// import { AnimatedSplashOverlay } from '../components/animated-icon';
// import AppTabs from '../components/app-tabs';
// import "../global.css";

// export default function TabLayout() {
//   const colorScheme = useColorScheme();
//   return (
//     <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//       <AnimatedSplashOverlay />
//       <AppTabs />
//     </ThemeProvider>
//   );
// }

import { Stack } from "expo-router";
import "../global.css";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}