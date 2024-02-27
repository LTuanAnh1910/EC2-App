import { View, Text, Image } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS, SIZES } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ProductCartView = ({ item, userLogin }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ProductDetail", { item, userLogin })}
    >
      <View
        style={{
          width: SIZES.width / 2 - 26,
          height: 240,
          marginEnd: 18,
          borderRadius: SIZES.medium,
          backgroundColor: COLORS.secondary,
        }}
      >
        <View
          style={{
            flex: 1,
            width: 170,
            marginLeft: SIZES.small / 2,
            marginTop: SIZES.small / 2,
            borderRadius: SIZES.small,
            overflow: "hidden",
          }}
        >
          <Image
            style={{ aspectRatio: 1, resizeMode: "cover" }}
            source={{
              uri: item.imageUrl,
            }}
          />
        </View>
        <View style={{ padding: SIZES.small }}>
          <Text
            style={{
              fontFamily: "bold",
              fontSize: SIZES.large,
              marginBottom: 2,
            }}
            numberOfLines={1}
          >
            {item.title}
          </Text>
          <Text
            style={{
              fontFamily: "regular",
              fontSize: SIZES.small,
              color: COLORS.gray,
            }}
            numberOfLines={1}
          >
            {item.supplier}
          </Text>
          <Text
            style={{
              fontFamily: "bold",
              fontSize: SIZES.medium,
              marginBottom: 2,
            }}
          >
            {item.price}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            position: "absolute",
            bottom: SIZES.xSmall,
            right: SIZES.xSmall,
          }}
        >
          <Ionicons name="add-circle" size={35} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCartView;
