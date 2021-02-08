import React, { useState, useContext } from "react";
import { FlatList } from "react-native";

import Screen from "../components/Screen";
import {
  ListItem,
  ListItemDeleteAction,
  ListItemSeparator,
} from "../components/lists";
import { ErrorMessage } from "../components/forms";
import MessagesContext from "../context/messages/context";

function MessagesScreen({ navigation }) {
  const {
    messages,
    loadMessages,
    handleDelete,
    handleMessagePress,
    messageRemovalFailed,
    messageUpdateFailed,
  } = useContext(MessagesContext);

  const [refreshing, setRefreshing] = useState(false);

  return (
    <Screen>
      <ErrorMessage
        error="There was and error deleting the message."
        visible={messageRemovalFailed}
      />
      <ErrorMessage
        error="There was and error updating the message."
        visible={messageUpdateFailed}
      />
      <FlatList
        data={messages}
        keyExtractor={(message) => message._id}
        renderItem={({ item }) => (
          <ListItem
            message={true}
            title={`From: ${item.fromUser.name}`}
            subTitle={item.content}
            image={item.image}
            read={item.read}
            onPress={() => handleMessagePress(item, navigation)}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={() => loadMessages()}
      />
    </Screen>
  );
}

export default MessagesScreen;
