import React, { useState, useContext } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
  FlatList,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import Text from "./Text";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "../config/styles";
import colors from "../config/colors";
import ListingContext from "../context/listings/context";

const filters = [
  {
    id: "1",
    name: "Title",
    key: "title",
    order: "desc",
  },
  {
    id: "2",
    name: "Price",
    key: "price",
    order: "desc",
  },
  {
    id: "3",
    name: "Posted",
    key: "createdAt",
    order: "desc",
  },
];

function SortListPicker({
  onSelectedCategory,
  selectedCategory,
  icon,
  width = "100%",
  placeholder,
  selectedFilter,
  onSelectedFilter,
  ...otherProps
}) {
  const [visible, setVisible] = useState(false);

  const handleSelectedItem = (item) => {
    onSelectedFilter(item);
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
          {selectedFilter ? (
            <Text style={styles.text}>{selectedFilter.name}</Text>
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
            data={filters}
            keyExtractor={(filter) => filter.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSelectedItem(item)}>
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

export default SortListPicker;
