import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";

import Button from "../components/Button";
import CategoriesContext from "../context/categories/context";
import FormListing from "../components/FormListing";
import listingsApi from "../api/listings";
import ListingsContext from "../context/listings/context";
import logger from "../utility/logger";
import Screen from "../components/Screen.js";
import UploadScreen from "./UploadScreen";

function EditListingScreen({ route, navigation }) {
  const { loadListings } = useContext(ListingsContext);
  let { getCategory } = useContext(CategoriesContext);

  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [listingDeleError, setListingDeleteError] = useState(false);

  let {
    title,
    price,
    description,
    location,
    categoryId,
    images: allImages,
    _id,
  } = route.params;

  price = price.toString();
  const images = allImages.map((image) => image.url);
  const category = getCategory(categoryId);

  const handleSubmit = async (listing, { resetForm }) => {
    setProgress(0);
    setUploadVisible(true);
    const result = await listingsApi.editListing(
      { ...listing },
      _id,
      (progress) => setProgress(progress)
    );
    if (!result.ok) {
      logger.log(result.data);
      setUploadVisible(false);
      return alert("Could not save the listing.");
    }
    resetForm();
    loadListings();
    navigation.pop();
  };

  const handleDelete = async (id) => {
    setListingDeleteError(false);

    const result = await listingsApi.deleteListing(id);

    if (!result.ok) {
      logger.log(result.data);
      return setListingDeleteError(true);
    }

    loadListings();
    navigation.pop();
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
                title,
                price,
                description,
                location,
                category,
                images,
              }}
              listingDeleteError={listingDeleError}
              buttonTitle="Update"
              categoryId={categoryId}
            />
            <Button onPress={() => handleDelete(_id)} title="Delete"></Button>
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
export default EditListingScreen;
