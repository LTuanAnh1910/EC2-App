import { View, Text, Image, Alert, Modal, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, SIZES } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../CartReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const ProductionDetail = () => {
  const route = useRoute();
  const { item } = route.params;
  const { userLogin } = route.params;
  console.log(userLogin);

  // if (route.params.userLogin === "true") {
  // }

  console.log("item", item);
  const navigation = useNavigation();
  const [count, setCount] = useState(1);

  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  const [userData, setUserData] = useState(null);
  const [userIds, setUserIds] = useState("");
  const [userLogins, setUserLogins] = useState(null);
  const [selectMethod, setSelectMethod] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getUserId();
  }, [userIds]);

  const getUserId = async () => {
    try {
      const id = await AsyncStorage.getItem("id");
      const userId = JSON.parse(id);
      setUserIds(userId);
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(() => {
  //   checkExistingUser();
  // }, []);
  // const checkExistingUser = async () => {
  //   const id = await AsyncStorage.getItem("id");
  //   const userId = JSON.parse(id);
  //   const userIds = `user${userId}`;
  //   setUserIds(userId);
  //   console.log(userIds);

  //   try {
  //     const currentUser = await AsyncStorage.getItem(userIds);

  //     if (currentUser !== null) {
  //       const parseData = JSON.parse(currentUser);
  //       setUserData(parseData);
  //       // setUserLogin(true);
  //       console.log(userData);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // console.log("userIds:", userIds);
  // console.log("item._id:", item._id);
  // console.log("count", count);
  // console.log("method", selectMethod);

  const addCart = async () => {
    const cart = {
      userId: userIds,
      cartItem: item._id,
      quantity: count,
      payment_status: selectMethod,
    };
    await axios
      .post("http://localhost:3000/api/cart", cart)
      .then((response) => {
        if (response.status === 200) {
          Alert.alert("Cart added successfully");
          console.log(cart);
        } else {
          console.log(error);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handlePaymentMethodSelection = (method) => {
    setSelectMethod(method);
    console.log(selectMethod);
  };

  const handleBuy = () => {
    setModalVisible(true);
  };

  const handleContinue = async () => {
    setModalVisible(false);
    const order = {
      userId: userIds,
      productId: item._id,
      quantity: count,
      payment_status: selectMethod,
    };

    await axios
      .post("http://localhost:3000/api/order/buynow", order)
      .then((response) => {
        if (response.status === 200) {
          Alert.alert("Order create successfully");
          navigation.navigate("Orders");
          console.log("order");
        } else
          (error) => {
            console.log(error);
          };
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <View
        style={{
          marginHorizontal: 12,
          flexDirection: "row",
          justifyContent: "space-between",
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

        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="heart" size={30} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <Image
        style={{ aspectRatio: 1, resizeMode: "cover" }}
        source={{
          uri: item.imageUrl,
        }}
      />

      <View
        style={{
          marginTop: -SIZES.large,
          backgroundColor: COLORS.lightWhite,
          width: SIZES.width,
          borderTopLeftRadius: SIZES.medium,
          borderTopRightRadius: SIZES.medium,
        }}
      >
        <View
          style={{
            marginHorizontal: 20,
            paddingBottom: SIZES.small,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: SIZES.width - 44,
            top: 20,
          }}
        >
          <Text style={{ fontFamily: "bold", fontSize: SIZES.large }}>
            {item.title}
          </Text>
          <View
            style={{
              backgroundColor: COLORS.secondary,
              borderRadius: SIZES.large,
              paddingHorizontal: 10,
            }}
          >
            <Text style={{ fontFamily: "semiBold", fontSize: SIZES.large }}>
              {item.price}
            </Text>
          </View>
        </View>

        <View
          style={{
            paddingBottom: SIZES.small,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: SIZES.width - 10,
            top: 5,
          }}
        >
          <View
            style={{
              top: SIZES.large,
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              marginHorizontal: SIZES.large,
            }}
          >
            {[1, 2, 3, 4, 5].map((index) => (
              <Ionicons key={index} name="star" size={24} color="gold" />
            ))}
            <Text style={{ color: COLORS.gray, fontFamily: "medium" }}>
              (4.9)
            </Text>
          </View>
          <View
            style={{
              top: SIZES.large,
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              marginHorizontal: SIZES.large,
              gap: 10,
            }}
          >
            <TouchableOpacity onPress={() => increment()}>
              <SimpleLineIcons name="plus" size={20} color="black" />
            </TouchableOpacity>
            <Text style={{ color: COLORS.gray, fontFamily: "medium" }}>
              {count}
            </Text>
            <TouchableOpacity onPress={() => decrement()}>
              <SimpleLineIcons name="minus" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            marginTop: SIZES.large * 2,
            marginHorizontal: SIZES.large,
          }}
        >
          <Text style={{ fontSize: SIZES.large - 2, fontFamily: "medium" }}>
            Mô tả
          </Text>
          <Text
            style={{
              fontSize: SIZES.small,
              fontFamily: "regular",
              textAlign: "justify",
              marginBottom: SIZES.small,
            }}
          >
            {item.description}
          </Text>
        </View>

        <View style={{ marginBottom: SIZES.small }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: COLORS.secondary,
              padding: 5,
              borderRadius: SIZES.large,
            }}
          >
            <View style={{ flexDirection: "row", gap: 6 }}>
              <Ionicons name="location-outline" size={20} />
              <Text>Ha Noi</Text>
            </View>
            <View style={{ flexDirection: "row", gap: 6 }}>
              <MaterialCommunityIcons name="truck-delivery-outline" size={20} />
              <Text>Free delivery</Text>
            </View>
          </View>
        </View>

        <View
          style={{
            marginHorizontal: 20,
            paddingBottom: SIZES.small,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: SIZES.width - 44,
          }}
        >
          <TouchableOpacity
            onPress={handleBuy}
            style={{
              width: SIZES.width * 0.7,
              backgroundColor: COLORS.black,
              padding: SIZES.small / 2,
              borderRadius: SIZES.large,
              marginLeft: 12,
            }}
          >
            <Text
              style={{
                fontFamily: "semiBold",
                fontSize: SIZES.medium,
                color: COLORS.lightWhite,
                textAlign: "center",
              }}
            >
              Thanh Toán
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={addCart}
            style={{
              width: 37,
              height: 37,
              padding: SIZES.small / 2,
              borderRadius: 50,
              backgroundColor: COLORS.black,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Fontisto name="shopping-bag" size={20} color={COLORS.lightWhite} />
          </TouchableOpacity>
        </View>
      </View>

      {modalVisible && (
        <Modal
          animationType="slide"
          transparent={true}
          // visible={isVisible}
          // onRequestClose={onClose}
        >
          <View
            style={{
              marginTop: 400,
              marginHorizontal: 12,
              backgroundColor: COLORS.lightWhite,
            }}
          >
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
                style={{
                  fontFamily: "bold",
                  fontSize: 18,
                  color: COLORS.lightWhite,
                }}
              >
                Tiếp tục
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default ProductionDetail;
