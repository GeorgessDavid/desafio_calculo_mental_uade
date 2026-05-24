import { Text, View } from "react-native";

type StepIndicatorProps = {
    currentStep: number;
    totalSteps: number;
};

export default function StepIndicator({
    currentStep,
    totalSteps,
}: StepIndicatorProps) {
    return (
        <View className="mt-5">
            <Text className="mb-2 text-sm font-semibold text-slate-500">
                Paso {currentStep} de {totalSteps}
            </Text>

            <View className="flex-row gap-2">
                {Array.from({ length: totalSteps }).map((_, index) => {
                    const isActive = index + 1 <= currentStep;

                    return (
                        <View
                            key={index}
                            className={`h-2 flex-1 rounded-full ${isActive ? "bg-blue-600" : "bg-slate-300"}`}
                        />
                    );
                })}
            </View>
        </View>
    );
}