import { View, Text, SafeAreaView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, SIZES } from "../constants";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CartItem from "../components/cart/CartItem";

const Cart = () => {
  const navigation = useNavigation();
  const [userId, setUserId] = useState(null);
  const [data, setData] = useState([]);
  const route = useRoute();
  const userLogin = route.params;
  console.log("data", data);
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
    const fetchData = async () => {
      await axios
        .get(`http://localhost:3000/api/cart/find/${userId}`)
        .then((response) => {
          if (response.status === 200) {
            setData(response.data);
          } else {
            console.log(error);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, [userId]);

  const handleDeleteItem = (itemId) => {
    // Filter out the deleted item from the cart items
    const updatedData = data.map((item) => ({
      ...item,
      products: item.products.filter((product) => product._id !== itemId),
    }));

    setData(updatedData);
  };

  console.log("cart", data);

  const totalAmount = data.reduce((acc, order) => {
    return (
      acc +
      order.products.reduce((orderAcc, product) => {
        return (
          orderAcc +
          parseFloat(product.cartItem.price.replace("$", "")) * product.quantity
        );
      }, 0)
    );
  }, 0);

  console.log(totalAmount);

  return (
    <View
      style={{ flex: 1, backgroundColor: COLORS.lightWhite, marginTop: 10 }}
    >
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
          Giỏ hàng
        </Text>
      </View>

      <ScrollView style={{ marginTop: 80 }}>
        <View style={{}}>
          {data.map((item, index) => (
            <View>
              {item.products.map((product, index) => (
                <CartItem
                  items={product}
                  userId={userId}
                  key={index}
                  onDeleteItem={handleDeleteItem}
                />
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={{ marginBottom: 40 }}>
        <Text
          style={{
            fontSize: SIZES.large,
            fontFamily: "bold",
            color: COLORS.primary,
            marginBottom: 12,
            marginLeft: 12,
          }}
        >
          Thông tin thanh toán
        </Text>
        <View style={{ flexDirection: "row", gap: 200 }}>
          <Text style={{ marginLeft: 12, fontSize: 16 }}>Tổng cộng</Text>
          <Text
            style={{ fontSize: 18, fontFamily: "bold", color: COLORS.primary }}
          >
            ${totalAmount.toFixed(2)}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("Payment", { data, totalAmount })}
          style={{
            backgroundColor: COLORS.primary,
            width: 320,
            height: 48,
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 12,
            borderRadius: 20,
          }}
        >
          <Text
            style={{
              color: COLORS.lightWhite,
              fontFamily: "bold",
              fontSize: 16,
            }}
          >
            Thanh Toán
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Cart;
