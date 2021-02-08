import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";

import colors from "../config/colors";
import ListingsContext from "../context/listings/context";
import Messages from "../components/Messages";
import Screen from "../components/Screen";
import Text from "../components/Text";

function MessageScreen({ route }) {
  const message = route.params;

  const { listings } = useContext(ListingsContext);

  const list = listings.find((l) => l._id === message.listingId);

  return (
    <Screen>
      <View style={styles.container}>
        <View>
          <Text style={styles.item}>
            Item: <Text style={styles.text}> {list.title}</Text>
          </Text>
          <Text style={styles.user1}>
            {message.fromUser.name}:{" "}
            <Text style={styles.text}> {message.content}</Text>
          </Text>
        </View>
        <View>
          <Messages
            text="reply"
            id={list._id}
            preMessage={message}
            listUserId={list.userId}
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  text: {
    paddingLeft: 20,
  },
  item: {
    color: colors.orange,
    padding: 10,
  },
  user1: {
    padding: 10,
    color: colors.secondary,
  },
});

export default MessageScreen;
