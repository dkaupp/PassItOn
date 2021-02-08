import React, { useState } from "react";
import { View, StyleSheet, Keyboard } from "react-native";
import * as Yup from "yup";

import messageApi from "../api/messages";
import logger from "../utility/logger";

import {
  Form,
  ErrorMessage,
  FormField,
  SubmitButton,
} from "../components/forms";
import SuccessMessage from "../components/SuccessMessage";

const MessageSchema = Yup.object().shape({
  message: Yup.string().required().label("Message"),
});

function Messages({
  id,
  error,
  text = "Send Message",
  preMessage,
  listUserId,
}) {
  const [sendMessageFailed, setSendMessageFailed] = useState(false);
  const [messageSend, setMessageSend] = useState(false);

  const handleSubmit = async (values, { resetForm }) => {
    const { message, listingId } = values;

    let targetUserId = preMessage ? preMessage.fromUserId : listUserId;
    Keyboard.dismiss();
    setMessageSend(false);
    const result = await messageApi.send(message, listingId, targetUserId);

    if (!result.ok) {
      logger.log(result.data);
      setMessageSend(false);
      return setSendMessageFailed(true);
    }

    setSendMessageFailed(false);
    resetForm();
    setMessageSend(true);
  };

  return (
    <View style={styles.container}>
      <Form
        initialValues={{ message: "", listingId: id }}
        onSubmit={handleSubmit}
        validationSchema={MessageSchema}
      >
        <ErrorMessage
          error="Something whent wrong while sending the message."
          visible={sendMessageFailed}
        />
        <FormField
          // icon="message"
          name="message"
          keyboardType="default"
          placeholder="Message seller...."
          multiline={true}
        />
        <SuccessMessage
          success={`Message send successfully`}
          visible={messageSend}
          errors={error}
        />
        <SubmitButton title={text} />
      </Form>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Messages;
