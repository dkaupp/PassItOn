import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../config/colors";

import Text from "./Text";
import timePosted from "../utility/timePosted";

function ListingDetails({
  data: { title, location, description, price, updatedAt },
}) {
  const date = timePosted(updatedAt);
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{`${title}  (${location})`}</Text>
        <Text style={styles.title}>{date}</Text>
      </View>
      <Text style={styles.para}>{description}</Text>
      <Text style={styles.price}>{`$${price}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 0,
  },
  title: {
    fontSize: 22,
    fontWeight: "500",
  },
  para: {
    color: colors.medium,
  },
});

export default ListingDetails;
