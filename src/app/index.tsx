import { router } from 'expo-router';
import { useEffect } from 'react';
import { Image, Text, View } from 'react-native';
const splashImage = require('../../assets/images/splash-icon.png')

export default function SplashScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/home");
    }, 2000)

    return () => clearTimeout(timer);
  })
  return (
    <View className="flex-1 items-center justify-center bg-blue-600 px-6">
      <Image source={splashImage} style={{ width: 80, height: 60, marginBottom: 20 }} />
      <Text className="text-4xl font-bold text-white text-center">
        Cálculo Mental
      </Text>
      <Text className="mt-4 text-lg text-blue-100 text-center">
        Entrená tu velocidad y precisión.
      </Text>
    </View>
  );
}