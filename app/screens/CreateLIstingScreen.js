import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";

import FormListing from "../components/FormListing";
import listingsApi from "../api/listings";
import ListingsContext from "../context/listings/context";
import logger from "../utility/logger";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import UploadScreen from "./UploadScreen";

function CreateListingScreen({ navigation }) {
  const { loadListings } = useContext(ListingsContext);

  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (listing, { resetForm }) => {
    setProgress(0);
    setUploadVisible(true);
    const result = await listingsApi.addListing({ ...listing }, (progress) =>
      setProgress(progress)
    );
    if (!result.ok) {
      logger.log(result.data);
      setUploadVisible(false);
      return alert("Could not save the listing.");
    }
    resetForm();
    loadListings();
    navigation.navigate(routes.FEED);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <Screen style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView style={styles.innerContainer}>
            <UploadScreen
              onDone={() => setUploadVisible(false)}
              progress={progress}
              visible={uploadVisible}
            />
            <FormListing
              onSubmit={handleSubmit}
              initialValues={{
                category: null,
                description: "",
                images: [],
                title: "",
                price: "",
                location: "",
              }}
            />
          </ScrollView>
        </TouchableWithoutFeedback>
      </Screen>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  innerContainer: {
    flex: 1,
  },
});
export default CreateListingScreen;
