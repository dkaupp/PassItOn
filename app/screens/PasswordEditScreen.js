import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import * as Yup from "yup";

import logger from "../utility/logger.js";
import usersApi from "../api/users";
import useAuth from "../auth/useAuth";
import Text from "../components/Text";

import {
  Form,
  FormField,
  SubmitButton,
  ErrorMessage,
} from "../components/forms";
import Screen from "../components/Screen.js";

const validationSchema = Yup.object().shape({
  password: Yup.string().required().min(4).label("Password"),
  password2: Yup.string().required().min(4).label("Password"),
});

function PasswordEditScreen() {
  const { logOut } = useAuth();

  const [passwordDontMatch, setPasswordDontMatch] = useState(false);
  const [updateError, setUpdateError] = useState(false);

  const handleSubmit = async (passwords, { resetForm }) => {
    const { password, password2 } = passwords;
    setUpdateError(false);
    if (password !== password2) return setPasswordDontMatch(true);
    setPasswordDontMatch(false);

    const result = await usersApi.updateUserPassword(password);

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
          error="The passwords do not match ."
          visible={passwordDontMatch}
        />
        <Form
          initialValues={{
            password: "",
            password2: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            name="password"
            placeholder="Enter New Password"
            secureTextEntry
            textContentType="password"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            name="password2"
            placeholder="Confirm New Password"
            secureTextEntry
            textContentType="password"
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

export default PasswordEditScreen;
