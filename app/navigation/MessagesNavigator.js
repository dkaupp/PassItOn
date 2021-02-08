import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import MessagesScreen from "../screens/MessagesScreen.js";
import MessageScreen from "../screens/MessageScreen.js";

const Stack = createStackNavigator();

const MessagesNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Messages" component={MessagesScreen} />
    <Stack.Screen name="Message" component={MessageScreen} />
  </Stack.Navigator>
);

export default MessagesNavigator;
