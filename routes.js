import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Contacts from "./screens/Contacts";
import Profile from "./screens/Profile";
import colors from "../utils/colors"; // Ensure this path is correct

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Contacts">
        <Stack.Screen
          name="Contacts"
          component={Contacts}
          options={{
            title: "Contacts",
            headerStyle: { backgroundColor: colors.primary }, // Example of using colors
            headerTintColor: colors.white,
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            title: "Profile",
            headerStyle: { backgroundColor: colors.primary }, // Example of using colors
            headerTintColor: colors.white,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
