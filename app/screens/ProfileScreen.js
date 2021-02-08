import React from "react";
import { View, StyleSheet } from "react-native";

import { ListItem, ListItemSeparator } from "../components/lists";
import { FlatList } from "react-native-gesture-handler";

import colors from "../config/colors.js";
import Icon from "../components/Icon";
import routes from "../navigation/routes";
import Screen from "../components/Screen.js";

const menuItems = [
  {
    name: "ProfilePhoto",
    title: "Change/Add Profile Photo",
    icon: {
      name: "camera",
      backgroundColor: colors.primary,
    },
    targetScreen: routes.PROFILEPHOTO,
  },
  {
    name: "ProfileEmail",
    title: "Change Email",
    icon: {
      name: "email",
      backgroundColor: colors.secondary,
    },
    targetScreen: routes.EMAIL,
  },
  {
    name: "ProfilePassword",
    title: "Change Password",
    icon: {
      name: "lock",
      backgroundColor: "aqua",
    },
    targetScreen: routes.PASSWORD,
  },
  {
    name: "ProfileLocation",
    title: "Change/Add Location",
    icon: {
      name: "map-marker",
      backgroundColor: colors.yellow,
    },
    targetScreen: routes.LOCATION,
  },
];

function ProfileScreen({ navigation }) {
  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              onPress={() => navigation.navigate(item.targetScreen)}
            />
          )}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  container: {
    marginVertical: 20,
  },
});

export default ProfileScreen;
