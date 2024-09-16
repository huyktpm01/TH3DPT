import React from "react";
import { View, Text } from "react-native";
import Contacts from "./screens/Contacts";
import Profile from "./screens/Profile";
import DrawerNavigator from "./4/routes";
import Favorites from "./3/screens/Favorites";
import User from "./3/screens/User";
import Options from "./3/screens/Options";
import Store from "./store";
import { Provider } from "react-redux";
const App = () => {
  return (
    <Provider store={Store}>
      <DrawerNavigator />
    </Provider>
  );
};
export default App;
