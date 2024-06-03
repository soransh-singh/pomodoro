import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Button,
  Modal,
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
} from "react-native";
import { TimerCountDownDisplay } from "./TimerCountDownDisplay";
import { TimerToggleButton } from "./TimerToggleButton";
import { TimerModeDisplay, TimerModes } from "./TimerModeDisplay";

const FOCUS_TIME_MINUTES = 0.2 * 60 * 1000;
const BREAK_TIME_MINUTES = 0.1 * 60 * 1000;
export default function App() {
  const [timerCount, setTimerCount] = useState<number>(FOCUS_TIME_MINUTES);
  const [timerInterval, setTimerInterval] = useState<ReturnType<
    typeof setInterval
  > | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [timerMode, setTimerMode] = useState<TimerModes>("Focus");
  const [openSetting, setOpenSetting] = useState<boolean>(false);
  const [text, onChangeText] = useState<string>("0");
  const startTimer = () => {
    setIsTimerRunning(true);
    const id = setInterval(() => {
      setTimerCount((prev) => prev - 1000);
    }, 1000);
    setTimerInterval(id);
  };

  useEffect(() => {
    if (timerCount === 0) {
      if (timerMode === "Focus") {
        setTimerMode("Break");
        setTimerCount(BREAK_TIME_MINUTES);
      } else if (timerMode === "Break") {
        setTimerMode("Focus");
        setTimerCount(FOCUS_TIME_MINUTES);
      }
      clearTimer();
    }
  }, [timerCount]);

  const clearTimer = () => {
    if (timerInterval !== null) {
      clearInterval(timerInterval);
      setTimerInterval(null);
      setIsTimerRunning(false);
    }
  };

  return (
    <View style={styles.container}>
      <TimerModeDisplay timerMode={timerMode} />
      <TimerCountDownDisplay timerDate={new Date(timerCount)} />
      <TimerToggleButton
        isTimerRunning={isTimerRunning}
        startTimer={startTimer}
        clearTimer={clearTimer}
      />
      <Pressable onPress={() => setOpenSetting(true)}>
        <View
          style={{
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: 5,
            backgroundColor: "purple",
            marginTop: 20,
          }}
        >
          <Text style={{ fontSize: 18, color: "#0a0a23", fontWeight: "700" }}>
            Settings
          </Text>
        </View>
      </Pressable>
      <Modal
        animationType="slide"
        transparent={true}
        visible={openSetting}
        onRequestClose={() => {
          setOpenSetting(false);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 22,
            width: "100%",
          }}
        >
          <View
            style={{
              margin: 20,
              backgroundColor: "white",
              borderRadius: 20,
              paddingHorizontal: 10,
              paddingVertical: 20,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
              width: "80%",
              height: 400,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                borderBottomColor: "purple",
                borderBottomWidth: 5,
                paddingBottom: 5,
              }}
            >
              <Text style={{ fontSize: 24, fontWeight: 700, color: "purple" }}>
                Settings
              </Text>
              <Pressable onPress={() => setOpenSetting(false)}>
                <Text
                  style={{ fontSize: 18, fontWeight: 700, color: "purple" }}
                >
                  ✕
                </Text>
              </Pressable>
            </View>
            <View style={{ marginTop: 20, flex: 1 }}>
              <Text
                style={{
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  color: "purple",
                }}
              >
                Time (Minutes)
              </Text>
              <TextInput
                style={{
                  height: 40,
                  marginVertical: 12,
                  borderWidth: 1,
                  padding: 10,
                }}
                keyboardType="numeric"
                value={text}
                onChangeText={onChangeText}
                inputMode="numeric"
              />
            </View>
            <Pressable
              onPress={() => {
                const time = Number(text);
                if (Number.isNaN(time)) {
                  setTimerCount(FOCUS_TIME_MINUTES);
                } else {
                  setTimerCount(time * 60 * 1000);
                }
                setOpenSetting(false);
                clearTimer();
              }}
            >
              <View
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: 5,
                  backgroundColor: "purple",
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: "white",
                    fontWeight: "700",
                    textAlign: "center",
                  }}
                >
                  Okay
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      </Modal>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a23",
    alignItems: "center",
    justifyContent: "center",
  },
});
