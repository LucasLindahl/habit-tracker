import AsyncStorage from "@react-native-async-storage/async-storage";

// Save habits for a specific user
export const saveHabits = async (username: string, habits: any[]) => {
  try {
    await AsyncStorage.setItem(username, JSON.stringify(habits));
  } catch (error) {
    console.error("Error saving habits:", error);
  }
};

// Get habits for a specific user
export const getHabits = async (username: string) => {
  try {
    const storedHabits = await AsyncStorage.getItem(username);
    return storedHabits ? JSON.parse(storedHabits) : [];
  } catch (error) {
    console.error("Error loading habits:", error);
    return [];
  }
};