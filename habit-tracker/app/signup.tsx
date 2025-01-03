import React from "react";
import { View, Text, Button, StyleSheet, TextInput, Alert } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Signup() {
  const router = useRouter();

  const [username, onChangeUsername] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const [confirmPassword, onChangeConfirmPassword] = React.useState("");

  const handleSignup = async () => {
    if (!username || !password || !confirmPassword) {
        Alert.alert("Error", "Fill in all fields.");
        return;
    }
    if (password != confirmPassword) {
        Alert.alert("Error", "Passwords does not match.")
        return;
    }
    try {
        const existingUser = await AsyncStorage.getItem(username);

        if (existingUser) {
            Alert.alert("Error", "Username already taken.");
            return;
        }

        await AsyncStorage.setItem(username, JSON.stringify({ password }));
        Alert.alert("Success", "Account created successfully!");
        onChangeUsername("");
        onChangePassword("");
        onChangeConfirmPassword("");
        router.push("/login");
    } catch (error) {
        Alert.alert("Error", "Failed to create accound.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.input}
        onChangeText={onChangeUsername}
        value={username}
        placeholder="Username"
      />
      <TextInput 
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
        placeholder="Password"
      />
      <TextInput 
        style={styles.input}
        onChangeText={onChangeConfirmPassword}
        value={confirmPassword}
        placeholder="Confirm password"
      />
      <View style={styles.buttonContainer}>
        <Button title="Register account" onPress={handleSignup} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#151718",
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