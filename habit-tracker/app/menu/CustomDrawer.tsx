import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";

export default function CustomDrawer(props: any) {
  return (
    <View style={styles.container}>
        <DrawerContentScrollView {...props} contentContainerStyle={styles.scrollContainer}>
            <View style={styles.header}>
                <Text style={styles.title}>Habit Tracker</Text>        
            </View>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
        <TouchableOpacity style={styles.logoutButton} onPress={() => props.navigation.navigate("login")}>
            <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.99,
    backgroundColor: "#151718",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#3A3D40",
    marginBottom: 2,
  },
  title: {
    fontSize: 20,
    color: "#FFD700",
    fontWeight: "bold",
  },
  logoutButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#E63946",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  logoutText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});