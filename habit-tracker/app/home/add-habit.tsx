import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { useHabitContext } from "@/contexts/HabitContext";

export default function AddHabit() {
  const { addHabit } = useHabitContext();
  const [title, setTitle] = useState("");

  const handleAdd = () => {
    addHabit({
      id: Date.now().toString(),
      title,
      frequency: "daily",
      color: "#FFD700",
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Habit Title"
        value={title}
        onChangeText={setTitle}
      />
      <View style={styles.buttonContainer}>
        <Button title="Add Habit" onPress={handleAdd} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16,
    backgroundColor: "#151718"
    },
  input: { 
    backgroundColor: "#3A3D40",
    color: "#FFF",
    height: 40,
    margin: 2,
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
  },
  buttonContainer: {
    paddingVertical: 16
  },
});