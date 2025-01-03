import { Stack } from "expo-router";
import Header from "../Header";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "../menu/CustomDrawer";
import Home from "./index"
import ProfileScreen from "./profile";
import AddHabit from "./add-habit";

const Drawer = createDrawerNavigator();

export default function HomeLayout() {
  return (
    <Drawer.Navigator
        drawerContent={(props) => <CustomDrawer {...props} />} // Custom Drawer
        screenOptions={{
            headerShown: true,
            headerStyle: { backgroundColor: "#202124" },
            headerTintColor: "#FFD700",
            drawerStyle: { backgroundColor: "#151718" },
            drawerActiveTintColor: "#FFD700",
            drawerInactiveTintColor: "#FFF",
        }}
    >
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
        <Drawer.Screen name="Add habit" component={AddHabit} />
    </Drawer.Navigator>
  );
}