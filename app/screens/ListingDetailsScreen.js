import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

import usersApi from "../api/users";
import CarouselComponent from "../components/CarouselComponent";
import Messages from "../components/Messages";
import ListingDetails from "../components/ListingDetails";
import UserDetails from "../components/UserDetails";

function ListingDetailsScreen({ route }) {
  const { images, userId, _id } = route.params;

  const { data: userProfile, error, request: loadUserDetails } = useApi(
    usersApi.getUser
  );

  useEffect(() => {
    loadUserDetails(userId);
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
      >
        <View style={styles.carouselContainer}>
          <CarouselComponent images={images} />
        </View>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.detailsContainer}>
            <ListingDetails data={route.params} />
            <UserDetails userProfile={userProfile} />
            <Messages id={_id} error={error} listUserId={userId} />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  carouselContainer: {
    height: Platform.OS === "ios" ? 300 : 300,
  },
});

export default ListingDetailsScreen;
