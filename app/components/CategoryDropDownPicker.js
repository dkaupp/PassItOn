import React, { useState, useContext } from "react";
import { View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import {
  FlatList,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import Text from "./Text";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "../config/styles";
import colors from "../config/colors";
import CategoriesContext from "../context/categories/context";

function CategoryDropDownPicker({
  icon,
  width = "100%",
  placeholder,
  selectedCategory,
  onSelectedCategory,
  ...otherProps
}) {
  const { categories } = useContext(CategoriesContext);
  const [visible, setVisible] = useState(false);

  const category = selectedCategory;

  const handleSelectedItem = (id) => {
    onSelectedCategory(id);
    setVisible(false);
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setVisible(!visible)}>
        <View style={[styles.container, { width }]}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={20}
              color={defaultStyles.colors.primary}
              style={styles.icon}
            />
          )}
          {category ? (
            <Text style={styles.text}>{category.name}</Text>
          ) : (
            <Text style={styles.text}>{placeholder}</Text>
          )}
          <MaterialCommunityIcons
            name="chevron-down"
            size={20}
            color={defaultStyles.colors.primary}
            style={styles.icon}
          />
        </View>
      </TouchableWithoutFeedback>
      {visible && (
        <View style={styles.listContainer}>
          <FlatList
            data={categories}
            keyExtractor={(category) => category._id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSelectedItem(item._id)}>
                <Text style={styles.text}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    flexDirection: "row",
    paddingTop: 0,
    paddingLeft: 5,
    paddingBottom: 10,
    marginVertical: 0,
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
  text: {
    color: colors.primary,
  },
  listContainer: {
    marginLeft: 6,
    paddingBottom: 10,
  },
});

export default CategoryDropDownPicker;
