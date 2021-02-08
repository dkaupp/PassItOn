import React, { useContext } from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AccountNavigator from "./AccountNavigator";
import FeedNavigator from "./FeedNavigator";
import CreateListingScreen from "../screens/CreateLIstingScreen";
import navigation from "../navigation/rootNavigation";
import NewListingButton from "./NewListingButton";
import useNotifications from "../hooks/useNotifications";
import MessagesContext from "../context/messages/context";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const { loadMessages } = useContext(MessagesContext);
  useNotifications((notification) => {
    loadMessages();
    navigation.navigate("Account");
  });

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={FeedNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="CreateListing"
        component={CreateListingScreen}
        options={({ navigation }) => ({
          tabBarButton: () => (
            <NewListingButton
              onPress={() => navigation.navigate("CreateListing")}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Account"
        component={AccountNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
