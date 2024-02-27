import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";

import { COLORS, SIZES } from "../constants/index";

import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Welcome } from "../components";
import Carousel from "../components/home/Carousel";
import Heading from "../components/home/Heading";
import ProductRow from "../components/products/ProductRow";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const [userData, setUserData] = useState(null);
  const [userLogin, setUserLogin] = useState(false);

  const navigation = useNavigation();
  useEffect(() => {
    checkExistingUser();
  }, []);
  const checkExistingUser = async () => {
    const id = await AsyncStorage.getItem("id");
    const userId = `user${JSON.parse(id)}`;

    try {
      const currentUser = await AsyncStorage.getItem(userId);

      if (currentUser !== null) {
        const parseData = JSON.parse(currentUser);
        setUserData(parseData);
        setUserLogin(true);
        // console.log(userLogin);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView>
      <View style={{ marginHorizontal: 22, marginTop: SIZES.small }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Ionicons name="location-outline" size={24} color="black" />
          <Text
            style={{
              fontFamily: "semiBold",
              fontSize: SIZES.medium,
              color: COLORS.gray,
            }}
          >
            {userData ? userData.location : "Ha Tinh"}
          </Text>

          <View style={{ alignItems: "flex-end" }}>
            <View
              style={{
                position: "absolute",
                bottom: 16,
                width: 16,
                height: 16,
                borderRadius: 8,
                alignItems: "center",
                backgroundColor: "green",
                justifyContent: "center",
                zIndex: 99,
              }}
            >
              <Text
                style={{
                  fontFamily: "regular",
                  color: COLORS.lightWhite,
                  fontSize: 10,
                  fontWeight: "600",
                }}
              >
                8
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("Cart", { userLogin })}
            >
              <FontAwesome5 name="shopping-bag" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView style={{ marginBottom: 75 }}>
        <Welcome />
        <Carousel />
        <Heading />
        <ProductRow userLogin={userLogin} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
