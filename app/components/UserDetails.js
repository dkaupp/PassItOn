import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";

import ListItem from "./lists/ListItem.js";
import ListingsContext from "../context/listings/context";

function UserDetails({ userProfile, onPress }) {
  const { listings } = useContext(ListingsContext);

  const numberOfListings = listings.filter(
    (listing) => listing.userId === userProfile._id
  ).length;

  const userImageUrl = { ...userProfile.image }.url;

  return (
    <View style={styles.userContainer}>
      <ListItem
        image={userImageUrl ? { uri: userImageUrl } : "noImage"}
        title={userProfile.name}
        subTitle={
          numberOfListings > 1
            ? `${numberOfListings} listings`
            : `${numberOfListings} listing`
        }
        onPress={onPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  userContainer: {
    marginVertical: 20,
  },
});

export default UserDetails;
