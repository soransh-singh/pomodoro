import { Pressable, Text, View } from "react-native";

type props = {
  isTimerRunning: boolean;
  clearTimer: () => void;
  startTimer: () => void;
};

export const TimerToggleButton: React.FC<props> = ({
  isTimerRunning,
  clearTimer,
  startTimer,
}) => {
  return (
    <Pressable onPress={isTimerRunning ? clearTimer : startTimer}>
      <View
        style={{
          backgroundColor: "purple",
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderRadius: 5,
        }}
      >
        <Text
          style={{
            color: "#0a0a23",
            fontWeight: "bold",
            textTransform: "uppercase",
            fontSize: 16,
          }}
        >
          {isTimerRunning ? "Stop timer" : "start timer"}
        </Text>
      </View>
    </Pressable>
  );
};
