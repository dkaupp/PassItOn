import React, { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import * as Yup from "yup";

import { Form, SubmitButton } from "../components/forms";
import colors from "../config/colors";
import FormSingleImagePicker from "../components/forms/FormSingleImagePicker.js";
import logger from "../utility/logger";
import routes from "../navigation/routes.js";
import Screen from "../components/Screen.js";
import UploadScreen from "./UploadScreen";
import usersApi from "../api/users.js";
import UserContext from "../context/user/contex.js";

let re = new RegExp(/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i);

const validationSchema = Yup.object().shape({
  image: Yup.mixed()
    .required("You need to provide a file")
    .test(
      "type",
      "Only image types supported",
      (value) => value && re.test(value)
    ),
});

function ProfilePhotoScreen({ navigation }) {
  const { loadUserProfile } = useContext(UserContext);

  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (image, { resetForm }) => {
    setProgress(0);
    setUploadVisible(true);
    const result = await usersApi.addUserPhoto({ ...image }, (progress) =>
      setProgress(progress)
    );
    if (!result.ok) {
      logger.log(result.data);
      setUploadVisible(false);
      return alert("Could not upload the photo.");
    }
    resetForm();
    loadUserProfile();
    navigation.navigate(routes.ACCOUNT);
  };

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <UploadScreen
          onDone={() => setUploadVisible(false)}
          progress={progress}
          visible={uploadVisible}
        />
        <Form
          initialValues={{
            image: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <View style={styles.photo}>
            <FormSingleImagePicker name="image" />
          </View>
          <SubmitButton style={styles.button} title="Add Photo" />
        </Form>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  photo: {
    alignSelf: "center",
    marginBottom: 10,
  },
  screen: {
    backgroundColor: colors.white,
    padding: 10,
  },
});

export default ProfilePhotoScreen;
