import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../../constants";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Welcome = () => {
  const navigation = useNavigation();
  return (
    <View>
      <View style={{ width: "100%" }}>
        <Text
          style={{
            fontFamily: "bold",
            fontSize: SIZES.xxLarge - 5,
            marginTop: SIZES.xSmall,
            color: COLORS.black,
            marginHorizontal: 12,
          }}
        >
          Find The Most
        </Text>
        <Text
          style={{
            fontFamily: "bold",
            fontSize: SIZES.xxLarge - 8,
            marginTop: SIZES.xSmall,
            color: COLORS.primary,
            marginHorizontal: 12,
          }}
        >
          Luxurious Furniture
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: COLORS.secondary,
          borderRadius: SIZES.medium,
          marginVertical: SIZES.medium,
          height: 50,
        }}
      >
        <TouchableOpacity>
          <Ionicons
            name="ios-search-outline"
            size={24}
            color="black"
            style={{ marginHorizontal: 12, color: COLORS.gray }}
          />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.secondary,
            marginRight: SIZES.small,
            borderRadius: SIZES.small,
          }}
        >
          <TextInput
            style={{
              width: "100%",
              height: "100%",
              paddingHorizontal: SIZES.small,
              fontFamily: "regular",
            }}
            value=""
            onPressIn={() => navigation.navigate("Search")}
            placeholder="Bạn đang tìm kiếm gì ???"
          />
        </View>
        <View>
          <TouchableOpacity
            style={{
              width: 50,
              height: "100%",
              backgroundColor: COLORS.primary,
              borderRadius: SIZES.medium,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons
              name="camera-outline"
              size={SIZES.xLarge}
              color={COLORS.offwhite}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Welcome;
