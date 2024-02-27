import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { COLORS, SIZES } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import CartItem from "../components/cart/CartItem";
import OrderItem from "../components/order/OrderItem";

const Orders = () => {
  const [userId, setUserId] = useState(null);
  const [orderData, setOrderData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    getUserId();
  }, []);

  const getUserId = async () => {
    try {
      const id = await AsyncStorage.getItem("id");
      const userId = JSON.parse(id);
      setUserId(userId);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/order/${userId}`
        );

        if (isMounted) {
          setOrderData(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [userId]);

  console.log("orderData", orderData);

  return (
    <View style={{ marginTop: 10, height: "100%" }}>
      <View
        style={{
          marginHorizontal: 12,
          flexDirection: "row",

          alignContent: "center",
          position: "absolute",
          top: SIZES.xxLarge,
          width: SIZES.width - 44,
          zIndex: 999,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-circle" size={30} color="black" />
        </TouchableOpacity>
        <Text
          style={{
            color: COLORS.primary,
            fontFamily: "bold",
            fontSize: SIZES.large,
            marginLeft: 10,
          }}
        >
          Đơn hàng
        </Text>
      </View>

      <ScrollView style={{ marginTop: 80 }}>
        <View style={{}}>
          {orderData.map((item, index) => (
            <OrderItem item={item} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Orders;
