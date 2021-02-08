import React from "react";
import { View, StyleSheet, Image, TouchableHighlight } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";

import Text from "../Text";
import colors from "../../config/colors";

function ListItem({
  title,
  subTitle,
  image,
  IconComponent,
  onPress,
  renderRightActions,
  read,
  message,
  numberOfListings,
  numberOfMessages,
}) {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
        <View style={styles.container}>
          {IconComponent}
          {image && image !== "noImage" ? (
            <Image style={styles.image} source={image} />
          ) : image === "noImage" ? (
            <View style={styles.noImage}>
              <MaterialCommunityIcons
                name="camera"
                size={40}
                color={colors.medium}
              />
            </View>
          ) : null}
          <View style={styles.detailsContainer}>
            <Text
              style={message && !read ? styles.titleRead : styles.title}
              numberOfLines={1}
            >
              {title}
            </Text>
            {subTitle && (
              <Text style={styles.subTitle} numberOfLines={2}>
                {subTitle}
              </Text>
            )}
          </View>
          {numberOfListings && (
            <View style={styles.numberOfListingsContainer}>
              <Text style={styles.numberOfListings}>{numberOfListings}</Text>
            </View>
          )}
          {numberOfMessages && (
            <View style={styles.numberOfMessagesContainer}>
              <Text style={styles.numberOfListings}>{numberOfMessages}</Text>
            </View>
          )}
          <MaterialCommunityIcons
            color={colors.medium}
            name="chevron-right"
            size={25}
          />
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    padding: 15,
    backgroundColor: colors.white,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  noImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.light,
    justifyContent: "center",
    alignItems: "center",
  },
  numberOfListingsContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    width: 30,
    height: 30,
    borderRadius: 35,
    backgroundColor: colors.secondary,
  },
  numberOfMessagesContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    width: 30,
    height: 30,
    borderRadius: 35,
    backgroundColor: colors.orange,
  },
  numberOfListings: {
    color: "white",
    fontWeight: "bold",
  },
  subTitle: {
    color: colors.medium,
  },
  title: {
    fontWeight: "500",
  },
  titleRead: {
    fontWeight: "500",
    color: colors.orange,
  },
});

export default ListItem;
