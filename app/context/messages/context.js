import React, { useEffect, useState, createContext } from "react";

import logger from "../../utility/logger";
import messagesApi from "../../api/messages";
import routes from "../../navigation/routes";

const MessagesContext = createContext();

export const MessageContextProvider = ({ children }) => {
  const { data: messages, request: loadMessages } = useApi(messagesApi.get);

  const [messageRemovalFailed, setMessageRemovalFailed] = useState(false);
  const [messageUpdateFailed, setMessageUpdateFailed] = useState(false);

  useEffect(() => {
    loadMessages();
  }, []);

  const handleDelete = async (message) => {
    try {
      const result = await messagesApi.deleteMessage(message._id);
      if (!result.ok) return setMessageRemovalFailed(true);

      setMessageRemovalFailed(false);
      loadMessages();
    } catch (error) {
      logger.log("There was and error", error);
    }
  };

  const handleMessagePress = async (item, navigation) => {
    if (item.read === "true") return navigation.navigate(routes.MESSAGE, item);

    const result = await messagesApi.update(item._id);
    if (!result.ok) {
      logger.log(result.data);
      return setMessageUpdateFailed(true);
    }

    navigation.navigate(routes.MESSAGE, item);
    setMessageUpdateFailed(false);
    loadMessages();
  };

  return (
    <MessagesContext.Provider
      value={{
        messages,
        loadMessages,
        handleMessagePress,
        handleDelete,
        messageRemovalFailed,
        messageUpdateFailed,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

export default MessagesContext;
