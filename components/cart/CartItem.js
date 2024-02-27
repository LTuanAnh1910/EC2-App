import React, { useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SIZES, SHADOWS, COLORS } from "../../constants";
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Text, Image, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const CartItem = ({ items, onDeleteItem }) => {
  const navigation = useNavigation();
  const item = items.cartItem;
  const itemId = items._id;
  console.log("itemId", items);

  const handleDeleteItem = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/cart/${itemId}`);
      onDeleteItem(itemId);
      Alert.alert("Xoá sản phẩm công");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate("ProductDetail", { item })}
        style={{
          flex: 1,
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: SIZES.small,
          flexDirection: "row",
          padding: SIZES.medium,
          borderRadius: SIZES.small,
          backgroundColor: "#fff",
          ...SHADOWS.medium,
          shadowColor: COLORS.lightWhite,
        }}
      >
        <View
          style={{
            width: 70,
            backgroundColor: COLORS.secondary,
            borderRadius: SIZES.medium,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={{
              width: "100%",
              height: 65,
              resizeMode: "cover",
              borderRadius: SIZES.small,
            }}
            source={{ uri: item.imageUrl }}
          />
        </View>
        <View style={{ flex: 1, marginHorizontal: SIZES.small }}>
          <Text
            style={{
              fontSize: SIZES.medium,
              color: COLORS.primary,
              fontFamily: "bold",
            }}
          >
            {item.title}
          </Text>
          <Text
            style={{
              fontSize: SIZES.small + 2,
              color: COLORS.gray2,
              fontFamily: "regular",
              marginTop: 3,
            }}
          >
            {item.supplier}
          </Text>
          <Text
            style={{
              fontSize: SIZES.small + 2,
              color: COLORS.gray2,
              fontFamily: "regular",
              marginTop: 3,
            }}
          >
            {item.price} * {items.quantity}
          </Text>
        </View>

        <View style={{ gap: 16, alignItems: "center" }}>
          <TouchableOpacity onPress={handleDeleteItem}>
            <Ionicons name="trash-outline" size={24} color="red" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {}}
            style={{
              backgroundColor: COLORS.primary,
              width: 88,
              height: 28,
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: COLORS.lightWhite,
                fontFamily: "regular",
                fontSize: 14,
              }}
            >
              Thanh toán
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CartItem;
