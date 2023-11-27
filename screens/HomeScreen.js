import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { useState, useRef } from "react";
import Lap from "./Lap";

const HomeScreen = () => {
  const [ms, setMs] = useState(0);
  const [sec, setSec] = useState(0);
  const [min, setMin] = useState(0);
  const [laps, setLaps] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef(null);
  const scrollViewRef = useRef();
  const [focusedButton, setFocusedButton] = useState(null);

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  const startHandler = (buttonId) => {
    setFocusedButton(buttonId);

    if (!isActive) {
      setIsActive(true);
      intervalRef.current = setInterval(() => {
        setMs((prevMs) => {
          if (prevMs === 60) {
            setSec((prevSec) => prevSec + 1);
            return 0;
          } else {
            return prevMs + 1;
          }
        });
        setSec((prevSec) => {
          if (prevSec === 60) {
            setMin((prevMin) => prevMin + 1);
            return 0;
          } else {
            return prevSec;
          }
        });
      }, 1);
    } else {
      setIsActive(false);
      clearInterval(intervalRef.current);
    }
  };

  const lapHandler = (buttonId) => {
    setFocusedButton(buttonId);
    let currentTime = `0${min}:${sec < 10 ? `0${sec}` : sec}.${
      ms < 10 ? `0${ms}` : ms
    }`;
    setLaps([...laps, currentTime]);
    scrollToBottom();
  };
  const clearHandler = (buttonId) => {
    setFocusedButton(buttonId);

    clearInterval(intervalRef.current);
    setIsActive(false);
    setMs(0);
    setSec(0);
    setMin(0);
    setLaps([]);
  };

  return (
    <SafeAreaView style={styles.areaView}>
      <View style={styles.container}>
        <View style={styles.clockHolder}>
          <EvilIcons
            style={styles.clock}
            name="clock"
            size={24}
            color="white"
          />
        </View>
        <View style={styles.timeHolder}>
          {/* <Text style={styles.time}>
            0{min}:{sec < 10 ? `0${sec}` : sec}.{ms < 10 ? `0${ms}` : ms}
          </Text> */}
          <Text style={styles.time}>0{min}</Text>
          <Text style={styles.time}>:</Text>
          <Text style={styles.time}>{sec < 10 ? `0${sec}` : sec}</Text>
          <Text style={[styles.time, styles.ms]}>.</Text>
          <Text style={[styles.time, styles.ms]}>
            {ms < 10 ? `0${ms}` : ms}
          </Text>
        </View>
        <ScrollView
          ref={scrollViewRef}
          style={{ width: "100%", marginBottom: 60, marginTop: 30 }}
        >
          <View style={styles.lapHolder}>
            {laps.map((item, index) => (
              <Lap key={index} time={item} lapCount={index + 1} />
            ))}
          </View>
        </ScrollView>

        <View style={styles.btnsHolder}>
          <Pressable style={styles.btns} onPress={() => clearHandler(3)}>
            <Text
              style={[
                styles.btnTxt,
                focusedButton === 3 && styles.focusedButton,
              ]}
            >
              Reset
            </Text>
          </Pressable>
          <Pressable
            style={styles.btns}
            onPress={() => lapHandler(2)}
            disabled={min === 0 && sec === 0 && ms === 0 ? true : false}
          >
            <Text
              style={[
                styles.btnTxt,
                focusedButton === 2 && styles.focusedButton,
              ]}
            >
              Lap
            </Text>
          </Pressable>

          <Pressable style={[styles.btns]} onPress={() => startHandler(1)}>
            <Text
              style={[
                styles.btnTxt,
                focusedButton === 1 && styles.focusedButton,
                isActive === true && styles.stopBtn,
              ]}
            >
              {!isActive ? "Start" : "Stop"}
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  areaView: {
    flex: 1,
    backgroundColor: "black",
  },
  container: {
    backgroundColor: "black",
    flex: 1,
    color: "white",
    alignItems: "center",
  },
  clockHolder: {},
  clock: {
    fontSize: 190,
    marginTop: 70,
    color: "#8B0000",
  },
  btnsHolder: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    position: "absolute",
    bottom: 0,
  },
  btns: {
    padding: 20,
  },
  btnTxt: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },
  timeHolder: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "center",
    width: "20%",
    alignItems: "center",
  },
  time: {
    color: "white",
    fontSize: 50,
    textAlign: "center",
  },
  ms: {
    color: "#8B0000",
  },

  lapHolder: {
    width: "100%",
  },
  focusedButton: {
    color: "green",
  },
  stopBtn: {
    color: "#8B0000",
  },
});
