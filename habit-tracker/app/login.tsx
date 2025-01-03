import React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity, TextInput, Alert } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  const router = useRouter();

  const [username, onChangeUsername] = React.useState("");
  const [password, onChangePassword] = React.useState("");

  const handleLogin = async () => {
    if (!username || !password) {
        Alert.alert("Error", "Fill in all fields");
        return;
    }
    try {
        const storedUser = await AsyncStorage.getItem(username);

        if (!storedUser) {
            Alert.alert("Error", "User does not exist");
            return;
        }

        const { password: storedPassword } = JSON.parse(storedUser);
        if (storedPassword === password) {
            Alert.alert("Success", "Logged in successfully!");
            onChangeUsername("");
            onChangePassword("");
            router.push("/home");
        } else {
            Alert.alert("Error", "Incorrect password");
        }
    } catch (error) {
        Alert.alert("Error", "Failed to log in")
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
      <View style={styles.buttonContainer}>
        <Button color="#007BFF" title="Log in" onPress={handleLogin} />
      </View>
      <TouchableOpacity onPress={() => router.push("/signup")}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF6F61",
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
  buttonText: {
    color: "#007BFF",
    fontSize: 16,
    //fontWeight: "regular",
  }
});