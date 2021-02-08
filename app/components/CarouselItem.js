import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Image } from "react-native-expo-image-cache";

export const SLIDER_WIDTH = Dimensions.get("window").width + 80;
export const ITEM_WIDTH = SLIDER_WIDTH;

function CarouselItem({ item, index }) {
  return (
    <View style={styles.imageContainer} key={index}>
      <Image
        style={styles.image}
        preview={{ uri: item.thumbnailUrl }}
        tint="light"
        uri={item.url}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: ITEM_WIDTH,
    height: 300,
  },
  imageContainer: {
    flex: 1,
    // height: 300,
    width: ITEM_WIDTH,
  },
});

export default CarouselItem;
