import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Lap = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.lapCountHolder}>
        <Text style={styles.lapCount}>{props.lapCount}</Text>
      </View>
      <Text style={styles.time}>{props.time}</Text>
    </View>
  );
};

export default Lap;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 20,
    borderColor: "#8B0000",
    borderBottomWidth: 0.2,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  time: {
    color: "#D3D3D3",
    fontSize: 25,
    textAlign: "right",
  },

  lapCountHolder: {
    height: 30,
    width: 30,
    backgroundColor: "#8B0000",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  lapCount: {
    color: "#D3D3D3",
    textAlign: "center",
    fontSize: 22,
  },
});
