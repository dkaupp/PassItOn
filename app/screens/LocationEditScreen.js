import React, { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import * as Yup from "yup";

import logger from "../utility/logger";
import Text from "../components/Text";
import usersApi from "../api/users";
import UserContext from "../context/user/contex";

import {
  Form,
  FormField,
  SubmitButton,
  ErrorMessage,
} from "../components/forms";
import Screen from "../components/Screen.js";

const validationSchema = Yup.object().shape({
  location: Yup.string().required().min(4).label("Location"),
});

function LocationEditScreen({ navigation }) {
  const { loadUserProfile } = useContext(UserContext);

  const [updateError, setUpdateError] = useState(false);
  const [locationUpdated, setLocationUpdated] = useState(false);

  const handleSubmit = async ({ location }, { resetForm }) => {
    setUpdateError(false);
    const result = await usersApi.updateUserLocation(location);
    if (!result.ok) {
      logger.log(result.data);
      return setUpdateError(true);
    }
    setLocationUpdated(true);
    resetForm();
    loadUserProfile();

    setTimeout(() => navigation.navigate("Account"), 2000);
  };
  return (
    <Screen style={styles.container}>
      <View>
        <ErrorMessage
          error="There was a problem with the request."
          visible={updateError}
        />
        <Form
          initialValues={{
            location: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <FormField
            autoCorrect={false}
            name="location"
            placeholder="Add Location"
          />
          <SubmitButton title="Add/Update Location" />
        </Form>
        {locationUpdated && (
          <Text style={styles.text}>Location added successfully</Text>
        )}
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
    color: "green",
    marginLeft: 10,
  },
});

export default LocationEditScreen;
