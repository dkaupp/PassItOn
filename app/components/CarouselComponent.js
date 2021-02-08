import React from "react";
import { View, StyleSheet } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";

import CarouselItem, { ITEM_WIDTH, SLIDER_WIDTH } from "./CarouselItem";

function CarouselComponent({ images }) {
  const [index, setIndex] = React.useState(0);

  const isCarousel = React.useRef();
  return (
    <>
      <Carousel
        layout="default"
        layoutCardOffset={40}
        ref={isCarousel}
        data={images}
        renderItem={CarouselItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={(index) => setIndex(index)}
        useScrollView={true}
        inactiveSlideScale={1}
      />
      <Pagination
        dotsLength={images.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          backgroundColor: "rgba(0, 0, 0, 0.92)",
        }}
        containerStyle={{
          marginVertical: 5,
          paddingVertical: 10,
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots={true}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default CarouselComponent;
