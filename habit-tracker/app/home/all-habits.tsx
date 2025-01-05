import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import HabitList from "../HabitList";

export default function AllHabits() {
  return (
    <View style={styles.container}>
      <HabitList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#151718"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});