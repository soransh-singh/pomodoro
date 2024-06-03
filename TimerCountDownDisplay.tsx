import { View, Text } from "react-native";

type props = {
  timerDate: Date;
};

export const TimerCountDownDisplay: React.FC<props> = ({ timerDate }) => {
  return (
    <View
      style={{
        width: 200,
        height: 200,
        backgroundColor: "#0a0a23",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
        margin: 10,
        marginBottom: 30,
        borderColor: "purple",
        borderWidth: 10,
      }}
    >
      <Text style={{ fontSize: 32, fontWeight: 700, color: "gray" }}>
        {timerDate.getUTCMinutes().toString().padStart(2, "0")}:
        {timerDate.getUTCSeconds().toString().padStart(2, "0")}
      </Text>
    </View>
  );
};
