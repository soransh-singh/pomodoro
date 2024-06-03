import { View, Text } from "react-native";

export type TimerModes = "Focus" | "Break";

type props = {
  timerMode: TimerModes;
};

export const TimerModeDisplay: React.FC<props> = ({ timerMode }) => {
  return <Text style={{ color: "gray" }}>{timerMode} Time</Text>;
};
