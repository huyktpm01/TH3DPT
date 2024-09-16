import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Contacts from "../screens/Contacts";
import Profile from "../screens/Profile";
import Favorites from "../3/screens/Favorites";
import User from "../3/screens/User";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../utils/colors";
import Options from "../3/screens/Options";

const getDrawerItemIcon =
  (icon) =>
  ({ tintColor }) =>
    <MaterialIcons name={icon} size={22} style={{ color: tintColor }} />;

const Stack = createNativeStackNavigator();

const ContactsScreens = () => {
  return (
    <Stack.Navigator
      initialRouteName="Contacts"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Contacts" component={Contacts} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Options" component={Options} />
    </Stack.Navigator>
  );
};

const FavoritesScreens = () => {
  return (
    <Stack.Navigator
      initialRouteName="Favorites"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Favorites" component={Favorites} />
    </Stack.Navigator>
  );
};

const UserScreens = () => {
  return (
    <Stack.Navigator
      initialRouteName="User"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="User" component={User} />
    </Stack.Navigator>
  );
};

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="ContactsScreens">
        <Drawer.Screen
          name="ContactsScreens"
          component={ContactsScreens}
          options={{
            drawerIcon: getDrawerItemIcon("list"),
          }}
        />
        <Drawer.Screen
          name="FavoritesScreens"
          component={FavoritesScreens}
          options={{
            drawerIcon: getDrawerItemIcon("star"),
          }}
        />
        <Drawer.Screen
          name="UserScreens"
          component={UserScreens}
          options={{
            drawerIcon: getDrawerItemIcon("person"),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DrawerNavigator;
