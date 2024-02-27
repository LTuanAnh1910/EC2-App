import { View, Text } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";
import OrderCart from "./OrderCart";
import { COLORS } from "../../constants";

const OrderItem = ({ item }) => {
  console.log(item.products);

  return (
    <View
      style={{
        backgroundColor: COLORS.gray2,
        marginBottom: 16,
        borderRadius: 12,
        paddingBottom: 8,
      }}
    >
      <FlatList
        data={item.products}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <OrderCart item={item} />}
      />
      <View style={{ marginHorizontal: 12 }}>
        <Text
          style={{
            fontFamily: "regular",
            fontSize: 14,
            color: COLORS.primary,
            marginBottom: 4,
          }}
        >
          Trạng thái đơn hàng: {item.delivery_status}
        </Text>
        <Text
          style={{
            fontFamily: "regular",
            fontSize: 14,
            color: COLORS.primary,
            marginBottom: 4,
          }}
        >
          Phương thúc thanh toán: ({item.payment_status})
        </Text>
        <Text
          style={{
            fontFamily: "regular",
            fontSize: 14,
            color: COLORS.primary,
            marginBottom: 4,
          }}
        >
          Total: ${item.total.toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

export default OrderItem;
