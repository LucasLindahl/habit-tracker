import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useHabitContext } from "@/contexts/HabitContext";

export default function HabitList() {
  const { habits } = useHabitContext();

  const renderHabit = ({ item }: { item: any }) => (
    <View style={[styles.habitCard, { backgroundColor: item.color }]}>
      <Text style={styles.habitTitle}>{item.title}</Text>
      <Text style={styles.habitDetails}>Frequency: {item.frequency}</Text>
      <Text style={styles.habitDetails}>Notification: {item.notificationTime}</Text>
      <Text style={styles.habitDetails}>Start Date: {item.startDate}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={habits}
        keyExtractor={(item) => item.id}
        renderItem={renderHabit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#151718",
    padding: 16,
  },
  habitCard: {
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
  },
  habitTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
  habitDetails: {
    fontSize: 14,
    color: "#FFF",
    marginTop: 4,
  },
});