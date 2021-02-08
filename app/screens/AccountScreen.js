import React, { useContext, useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";

import { ListItem, ListItemSeparator } from "../components/lists";

import colors from "../config/colors";
import Icon from "../components/Icon";
import MessagesContext from "../context/messages/context";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import UserContext from "../context/user/contex";
import useAuth from "../auth/useAuth";
import UserDetails from "../components/UserDetails";

const menuItems = [
  {
    name: "listingsScreen",
    title: "My Listings",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: colors.primary,
    },
    targetScreen: routes.MYLISTINGS,
  },
  {
    name: "messagesScreen",
    title: "My Messages",
    icon: {
      name: "email",
      backgroundColor: colors.secondary,
    },
    targetScreen: routes.MESSAGES,
  },
];

function AccountScreen({ navigation }) {
  const { logOut } = useAuth();
  const { userProfile } = useContext(UserContext);
  const { messages } = useContext(MessagesContext);

  const unreadMessages = messages.filter((message) => message.read === false)
    .length;
  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <UserDetails
          userProfile={userProfile}
          onPress={() => navigation.navigate(routes.PROFILE)}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              numberOfMessages={
                item.targetScreen === "Messages" && unreadMessages
                  ? unreadMessages
                  : null
              }
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
      <ListItem
        title="Log Out"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        onPress={() => logOut()}
      />
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

export default AccountScreen;
