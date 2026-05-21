
import { router } from 'expo-router';
import { useEffect } from 'react';
import { Text, View } from 'react-native';

// import { AnimatedIcon } from '@/components/animated-icon';
// import { HintRow } from '@/components/hint-row';
// import { ThemedText } from '@/components/themed-text';
// import { ThemedView } from '@/components/themed-view';
// import { WebBadge } from '@/components/web-badge';
// import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

// function getDevMenuHint() {
//   // if (Platform.OS === 'web') {
//   //   return <ThemedText type="small">use browser devtools</ThemedText>;
//   // }
//   // if (Device.isDevice) {
//   //   return (
//   //     <ThemedText type="small">
//   //       shake device or press <ThemedText type="code">m</ThemedText> in terminal
//   //     </ThemedText>
//   //   );
//   // }
//   // const shortcut = Platform.OS === 'android' ? 'cmd+m (or ctrl+m)' : 'cmd+d';
//   // return (
//   //   <ThemedText type="small">
//   //     press <ThemedText type="code">{shortcut}</ThemedText>
//   //   </ThemedText>
//   // );
// }

export default function SplashScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/home");
    }, 2000)

    return () => clearTimeout(timer);
  })
  return (
    <View className="flex-1 items-center justify-center bg-blue-600 px-6">
      <Text className="text-4xl font-bold text-white text-center">
        Cálculo Mental
      </Text>
      <Text className="mt-4 text-lg text-blue-100 text-center">
        Entrená tu velocidad y precisión.
      </Text>
    </View>
  );
}