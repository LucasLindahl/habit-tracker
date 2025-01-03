import { Stack } from "expo-router";
import Header from "./Header";
import { HabitProvider } from "@/contexts/HabitContext";

export default function RootLayout() {
  return (
    <HabitProvider>
      <Stack>
        <Stack.Screen name="login" options={{ 
          //title: "Login", 
          headerLeft: undefined,
          header: ({ route }) => <Header title={route.name} />
          }} />
        <Stack.Screen name="signup" options={{ 
          //title: "Sign Up", 
          header: ({ route }) => <Header title={route.name || "signup"} />
          }} />
        <Stack.Screen name="home" options={{ 
          //title: "Home",
          headerLeft: undefined,
          headerShown: false,
          header: ({ route }) => <Header title={route.name || "home"} />
          }} />
      </Stack>
    </HabitProvider>
  );
}
