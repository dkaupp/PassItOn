import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import * as Yup from "yup";

import usersApi from "../api/users";
import useAuth from "../auth/useAuth";
import Text from "../components/Text";
import logger from "../utility/logger";

import {
  Form,
  FormField,
  SubmitButton,
  ErrorMessage,
} from "../components/forms";
import Screen from "../components/Screen.js";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  email2: Yup.string().required().email().label("Email"),
});

function EmailEditScreen() {
  const { logOut } = useAuth();

  const [emailDontMatch, setEmailDontMatch] = useState(false);
  const [updateError, setUpdateError] = useState(false);

  const handleSubmit = async (emails, { resetForm }) => {
    const { email, email2 } = emails;
    setUpdateError(false);
    if (email !== email2) return setEmailDontMatch(true);
    setEmailDontMatch(false);
    const result = await usersApi.updateUserEmail(email);
    if (!result.ok) {
      logger.log(result.data);
      return setUpdateError(true);
    }

    resetForm();
    logOut();
  };
  return (
    <Screen style={styles.container}>
      <View>
        <ErrorMessage
          error="There was a problem with the request."
          visible={updateError}
        />
        <ErrorMessage
          error="The emails do not match ."
          visible={emailDontMatch}
        />
        <Form
          initialValues={{
            email: "",
            email2: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            name="email"
            placeholder="New Email Address"
            textContentType="emailAddress"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            name="email2"
            placeholder="Confirm New Email Address"
            textContentType="emailAddress"
          />
          <SubmitButton title="Change Email" />
        </Form>
        <Text style={styles.text}>
          * You will be logged out after performing the change.
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  text: {
    marginTop: 10,
    color: "grey",
  },
});

export default EmailEditScreen;
