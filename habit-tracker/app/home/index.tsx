import React from "react";
import { useRouter } from "expo-router";
import HabitList from "../HabitList";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useHabitContext } from "@/contexts/HabitContext";
import { CheckBox } from "react-native-elements";

export default function Home() {
  const router = useRouter();
  const { habits, toggleHabitCompletion } = useHabitContext();
  const today = new Date().toISOString().split("T")[0];

  // Filter habits for the day
  const todaysHabits = habits.filter((habit) => {
    const habitStartDate = new Date(habit.startDate).toISOString().split("T")[0];
    const isValidFrequency = () => {
      if (habit.frequency === "daily") return true;
      if (habit.frequency === "weekly")
        return new Date(habitStartDate).getDay() === new Date(today).getDay();
      return true;
    };
    return isValidFrequency() && new Date(habitStartDate) <= new Date(today);
  });

  const renderHabit = ({ item }: { item: any }) => {
    const isCompleted = item.completedDates.includes(today);

    return (
      <View style={[styles.habitCard, { backgroundColor: item.color }]}>
        <View style={styles.row}>
          <CheckBox
            checked={isCompleted}
            onPress={() => toggleHabitCompletion(item.id, today)}
            containerStyle={styles.checkbox}
          />
          <View>
            <Text style={styles.habitTitle}>{item.title}</Text>
            <Text style={styles.habitDetails}>Frequency: {item.frequency}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Today's Habits</Text>
      <FlatList
        data={todaysHabits}
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
  header: {
    fontSize: 20,
    color: "#FFF",
    fontWeight: "bold",
    marginBottom: 16,
  },
  habitCard: {
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    marginRight: 12,
    padding: 0,
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