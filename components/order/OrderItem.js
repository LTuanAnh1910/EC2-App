import { View, Text } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";

const OrderItem = ({ item }) => {
  console.log("item", item);
  return (
    <View>
      <Text>OrderItem</Text>
    </View>
  );
};

export default OrderItem;
