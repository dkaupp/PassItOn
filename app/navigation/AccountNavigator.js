import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/AccountScreen";
import MessagesScreen from "../screens/MessagesScreen";
import MyListingsScreen from "../screens/MyListingsScreen";
import MessageScreen from "../screens/MessageScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ProfilePhotoScreen from "../screens/ProfilePhotoScreen";
import EmailEditScreen from "../screens/EmailEditScreen";
import PassWordEditScreen from "../screens/PasswordEditScreen";
import LocationEditScreen from "../screens/LocationEditScreen";
import EditListingScreen from "../screens/EditListingScreen";

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Account" component={AccountScreen} />
    <Stack.Screen name="Messages" component={MessagesScreen} />
    <Stack.Screen
      options={{ headerTitle: "My Listings" }}
      name="MyListingsScreen"
      component={MyListingsScreen}
    />
    <Stack.Screen
      options={{ headerTitle: "My Messages" }}
      name="Message"
      component={MessageScreen}
    />
    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen
      options={{ title: "Photo" }}
      name="ProfilePhoto"
      component={ProfilePhotoScreen}
    />
    <Stack.Screen name="Email" component={EmailEditScreen} />
    <Stack.Screen name="Password" component={PassWordEditScreen} />
    <Stack.Screen name="Location" component={LocationEditScreen} />
    <Stack.Screen
      options={{ headerShown: false }}
      name="EditListing"
      component={EditListingScreen}
    />
  </Stack.Navigator>
);

export default AccountNavigator;
