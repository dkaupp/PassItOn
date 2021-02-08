import React from "react";
import { View, StyleSheet } from "react-native";

import { useFormikContext } from "formik";
import ErrorMessage from "./ErrorMessage";
import ImageInput from "../ImageInput";

function FormSingleImagePicker({ name }) {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  const imageUri = values[name];

  const handleAdd = (uri) => {
    setFieldValue(name, uri);
  };

  const handleRemove = (uri) => setFieldValue(name, null);

  return (
    <View>
      <>
        {imageUri ? (
          <ImageInput
            imageUri={imageUri}
            onChangeImage={(uri) => handleRemove(uri)}
          />
        ) : (
          <ImageInput onChangeImage={(uri) => handleAdd(uri)} />
        )}
        <ErrorMessage error={errors[name]} visible={touched[name]} />
      </>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default FormSingleImagePicker;
