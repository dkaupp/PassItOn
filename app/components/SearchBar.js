import React, { useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import CategoryDropDownPicker from "./CategoryDropDownPicker";
import { TouchableOpacity } from "react-native-gesture-handler";
import SortListPicker from "./SortListPicker";

function SearchBar({
  input,
  onSearch,
  selectedFilter,
  selectedCategory,
  onSelectedFilter,
  onSelectedCategory,
  onClearFilters,
}) {
  const [visible, setVisible] = useState(false);

  const clearFilters = () => {
    onClearFilters();
    setVisible(false);
  };

  const onOrderChange = () => {
    selectedFilter.order === "desc" ? "asc" : "desc";
    let sortParam = {
      key: selectedFilter.key,
      name: selectedFilter.name,
      order: selectedFilter.order === "desc" ? "asc" : "desc",
    };
    onSelectedFilter(sortParam);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <View style={styles.inputContainer}>
          <FontAwesome5
            name="search"
            size={23}
            color={colors.medium}
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={onSearch}
            placeholder="Search..."
          />
        </View>
        <TouchableOpacity onPress={() => setVisible(!visible)}>
          <View style={styles.filterIconContainer}>
            <Octicons
              name="settings"
              size={32}
              color={!visible ? colors.medium : colors.primary}
              style={styles.filterIcon}
            />
          </View>
        </TouchableOpacity>
      </View>
      {visible && (
        <View style={styles.filtersContainer}>
          <View style={{ width: "50%" }}>
            <CategoryDropDownPicker
              placeholder="Categories"
              selectedCategory={selectedCategory}
              onSelectedCategory={onSelectedCategory}
            />
          </View>
          <View>
            <SortListPicker
              placeholder="SortBy"
              onSelectedFilter={onSelectedFilter}
              selectedFilter={selectedFilter}
            />
          </View>
          <View style={styles.iconsContainer}>
            <View style={styles.orderIconContainer}>
              <TouchableOpacity onPress={() => onOrderChange()}>
                {selectedFilter.order === "desc" ? (
                  <MaterialCommunityIcons
                    name="arrow-down-drop-circle"
                    size={26}
                    color={colors.primary}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="arrow-up-drop-circle"
                    size={26}
                    color={colors.primary}
                  />
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.closeIconContainer}>
              <TouchableOpacity onPress={() => clearFilters()}>
                <MaterialCommunityIcons
                  name="close-circle"
                  size={26}
                  color={colors.primary}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  filtersContainer: {},
  searchBarContainer: {
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  inputContainer: {
    justifyContent: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors.medium,
    borderRadius: 10,
    padding: 3,
    flex: 1,
  },

  input: {
    fontSize: 18,
    flex: 1,
  },
  icon: {
    paddingHorizontal: 4,
  },
  filterIcon: {
    paddingLeft: 10,
    // transform: [{ rotate: "90deg" }],
  },
  filterIconContainer: {
    width: 50,
  },
  filtersContainer: {
    flexDirection: "row",
    width: "100%",
  },
  iconsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  closeIconContainer: {
    paddingLeft: 5,
  },
});

export default SearchBar;
