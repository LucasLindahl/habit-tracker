import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Header({ title }: { title: string }) {
    const capitalizeFirstLetter = (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
      };

  return (
    <View style={styles.header}>
      <Text style={styles.title}>{capitalizeFirstLetter(title)} Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#202124", // Header background
    padding: 16,
    borderBottomColor: "#FFD700"
  },
  title: {
    color: "#FF6F61", // Header text color
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
});

/*
Header background: #202124
Background: #151718
Header text: #FF6F61
Accent: #28A745
Error/Alert: #E63946
Card background: #2C2E30
Input fields: #3A3D40
Active slate: #6C5CE7

Users:
    - hans, hasse
*/