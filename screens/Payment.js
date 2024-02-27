import { View, Text, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { COLORS, SIZES } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Payment = ({}) => {
  const [userId, setUserId] = useState(null);
  const [selectMethod, setSelectMetod] = useState("");

  const navigation = useNavigation();
  const route = useRoute();
  const order = route.params.data;

  console.log("order", order);

  const cartItemIds = order.flatMap((order) =>
    order.products.map((product) => product.cartItem._id)
  );

  const totalAmount = order.reduce((acc, order) => {
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

  const handlePaymentMethodSelection = (method) => {
    setSelectMetod(method);
    console.log(selectMethod);
  };

  const handleContinue = async () => {
    try {
      if (selectMethod === "") {
        Alert.alert("Vui lòng chọn phương thức thanh toán trước khi tiếp tục.");
      } else {
        // Chuyển hướng đến trang tương ứng
        if (selectMethod === "cash") {
          const order = {
            userId: userId,

            payment_status: selectMethod,
          };
          await axios
            .post("http://localhost:3000/api/order", order)
            .then((response) => {
              if (response.status === 200) {
                Alert.alert("Success", "Đơn hàng đã được tạo thành công");
                navigation.navigate("Orders");
              } else
                (error) => {
                  console.log(error);
                };
            })
            .catch((error) => {
              console.log(error);
            });
        } else if (selectMethod === "card") {
          // Navigation.navigate('TrangCard'); // Thay thế bằng cách điều hướng trong ứng dụng của bạn
          Alert.alert("Chuyển hướng đến trang Card");
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <View style={{ marginTop: 10 }}>
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
          Thanh toán
        </Text>
      </View>

      <View style={{ marginTop: 80, marginLeft: 12 }}>
        <Text
          style={{
            fontFamily: "bold",
            color: COLORS.gray,
            fontSize: 16,
          }}
        >
          Chọn hình thức thanh toán:
        </Text>
        <TouchableOpacity
          onPress={() => handlePaymentMethodSelection("card")}
          style={{
            flexDirection: "row",
            marginTop: 16,
            alignItems: "center",
            gap: 10,
          }}
        >
          <Feather
            name={selectMethod === "card" ? "check-circle" : "circle"}
            size={24}
            color="black"
          />
          <Text style={{ fontSize: 16, fontFamily: "regular" }}>
            Thanh toán qua VNPAY
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handlePaymentMethodSelection("cash")}
          style={{
            flexDirection: "row",
            marginTop: 16,
            alignItems: "center",
            gap: 10,
          }}
        >
          <Feather
            name={selectMethod === "cash" ? "check-circle" : "circle"}
            size={24}
            color="black"
          />
          <Text style={{ fontSize: 16, fontFamily: "regular" }}>
            Thanh toán bằng tiền mặt
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={handleContinue}
        style={{
          height: 46,
          width: 260,
          backgroundColor: COLORS.primary,
          borderRadius: 12,
          marginTop: 20,
          marginLeft: "auto",
          marginRight: "auto",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{ fontFamily: "bold", fontSize: 18, color: COLORS.lightWhite }}
        >
          Tiếp tục
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Payment;
