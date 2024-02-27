import { View, Text } from "react-native";
import React from "react";
import { SliderBox } from "react-native-image-slider-box";
import { COLORS } from "../../constants";

const Carousel = () => {
  const slides = [
    "https://res.cloudinary.com/dwszjdztz/image/upload/v1703756739/Rectangle8_tq6sg5.png",
    "https://res.cloudinary.com/dwszjdztz/image/upload/v1703756739/Rectangle7_p3jedj.png",
    "https://res.cloudinary.com/dwszjdztz/image/upload/v1703756739/Rectangle5_esukt5.png",
  ];
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <SliderBox
        images={slides}
        dotColor={COLORS.primary}
        inactiveDotColor={COLORS.secondary}
        ImageCoComponentStyle={{ boderRadius: 15, with: "92%", marginTop: 15 }}
        autoplay
        circleLoop
      />
    </View>
  );
};

export default Carousel;
