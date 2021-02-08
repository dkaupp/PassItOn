import React, { useContext, useEffect } from "react";
import * as Yup from "yup";

import {
  Form,
  FormField,
  FormPicker as Picker,
  FormImagePicker,
  SubmitButton,
  ErrorMessage,
} from "./forms";
import CategoryPickerItem from "./CategoryPickerItem";
import CategoriesContext from "../context/categories/context";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().min(1).max(10000).label("Price"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  images: Yup.array().min(1, "Please select at least one image."),
});

function FormListing({
  initialValues,
  onSubmit,
  buttonTitle,
  listingDeleteError,
}) {
  const { categories } = useContext(CategoriesContext);

  return (
    <>
      <Form
        initialValues={{ ...initialValues }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <FormImagePicker name="images" />
        <FormField maxLength={255} name="title" placeholder="Title" />
        <FormField
          keyboardType="numeric"
          maxLength={8}
          name="price"
          placeholder="Price"
          width={120}
        />
        <Picker
          items={categories}
          name="category"
          numberOfColumns={3}
          PickerItemComponent={CategoryPickerItem}
          placeholder="Category"
          width="52%"
        />
        <FormField
          maxLength={255}
          multiline
          name="description"
          numberOfLines={3}
          placeholder="Description"
        />
        <FormField maxLength={20} name="location" placeholder="Location" />
        <ErrorMessage
          error="There was and error deleting the list"
          visible={listingDeleteError}
        />
        <SubmitButton title={buttonTitle ? buttonTitle : "Post"} />
      </Form>
    </>
  );
}

export default FormListing;
