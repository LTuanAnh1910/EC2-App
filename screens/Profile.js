import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, SIZES } from "../constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {
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
      } else {
        navigation.navigate("Login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const userLogout = async () => {
    const id = await AsyncStorage.getItem("id");
    const userId = `user${JSON.parse(id)}`;

    try {
      await AsyncStorage.multiRemove([userId, "id"]);
      navigation.replace("Bottom Navigation");
    } catch (error) {
      console.log(error);
    }
  };
  const clearCache = () => {
    Alert.alert(
      "Clear cache",
      "Are you sure you want to delete all data save on your device",
      [
        {
          text: "Cancel",
          onPress: () => console.log("cancle press"),
        },
        {
          text: "Continue",
          onPress: () => console.log("Clear press"),
        },
        { defaulIndex: 1 },
      ]
    );
  };

  const deleteAcount = () => {
    Alert.alert("Delete account", "Are you sure you want to delete account", [
      {
        text: "Cancel",
        onPress: () => console.log("cancle press"),
      },
      {
        text: "Continue",
        onPress: () => console.log("Delete press"),
      },
      { defaulIndex: 1 },
    ]);
  };
  const logout = () => {
    Alert.alert("Logout", "Are you sure you want to log out", [
      {
        text: "Cancel",
        onPress: () => console.log("cancle press"),
      },
      {
        text: "Continue",
        onPress: () => userLogout(),
      },
      { defaulIndex: 1 },
    ]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <View style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
        <StatusBar style={{ backgroundColor: COLORS.gray }} />

        <View style={{ width: "100%" }}>
          <Image
            style={{ height: 290, width: "100%", resizeMode: "cover" }}
            source={require("../assets/images/space.jpg")}
          />
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Image
            style={{
              height: 155,
              width: 155,
              borderRadius: 100,
              borderColor: COLORS.primary,
              resizeMode: "cover",
              marginTop: -90,
              borderWidth: 2,
            }}
            source={require("../assets/images/profile.jpeg")}
          />
          <Text
            style={{
              fontFamily: "bold",
              color: COLORS.primary,
              marginVertical: 5,
            }}
          >
            {userLogin === true
              ? `${userData.username}`
              : "Please login in your account"}
          </Text>
          {userLogin === false ? (
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <View
                style={{
                  backgroundColor: COLORS.secondary,
                  padding: 2,
                  borderWidth: 0.4,
                  borderColor: COLORS.primary,
                  borderRadius: SIZES.xxLarge,
                }}
              >
                <Text
                  style={{
                    fontFamily: "regular",
                    fontSize: 14,
                    color: COLORS.gray,
                    fontWeight: "600",
                    lineHeight: 26,
                    marginHorizontal: 20,
                  }}
                >
                  L o g i n
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View
              style={{
                backgroundColor: COLORS.secondary,
                padding: 2,
                borderWidth: 0.4,
                borderColor: COLORS.primary,
                borderRadius: SIZES.xxLarge,
              }}
            >
              <Text
                style={{
                  fontFamily: "regular",
                  fontSize: 14,
                  color: COLORS.gray,
                  fontWeight: "600",
                  lineHeight: 26,
                  marginHorizontal: 20,
                }}
              >
                {userData.email}
              </Text>
            </View>
          )}

          {userLogin === false ? (
            <View></View>
          ) : (
            <View
              style={{
                marginTop: SIZES.xxLarge - 30,
                width: SIZES.width - SIZES.large,
                borderRadius: 12,
                backgroundColor: COLORS.lightWhite,
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("Favorites")}
              >
                <View
                  style={{
                    borderBottomWidth: 0.2,
                    flexDirection: "row",
                    paddingVertical: 15,
                    paddingHorizontal: 30,
                    borderColor: COLORS.gray,
                  }}
                >
                  <MaterialCommunityIcons
                    name="heart-outline"
                    size={24}
                    color={COLORS.primary}
                  />
                  <Text
                    style={{
                      fontFamily: "regular",
                      fontSize: 14,
                      color: COLORS.gray,
                      fontWeight: "600",
                      lineHeight: 26,
                      marginHorizontal: 20,
                    }}
                  >
                    Favorites
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("Orders")}>
                <View
                  style={{
                    borderBottomWidth: 0.2,
                    flexDirection: "row",
                    paddingVertical: 15,
                    paddingHorizontal: 30,
                    borderColor: COLORS.gray,
                  }}
                >
                  <MaterialCommunityIcons
                    name="truck-delivery-outline"
                    size={24}
                    color={COLORS.primary}
                  />
                  <Text
                    style={{
                      fontFamily: "regular",
                      fontSize: 14,
                      color: COLORS.gray,
                      fontWeight: "600",
                      lineHeight: 26,
                      marginHorizontal: 20,
                    }}
                  >
                    Order
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
                <View
                  style={{
                    borderBottomWidth: 0.2,
                    flexDirection: "row",
                    paddingVertical: 15,
                    paddingHorizontal: 30,
                    borderColor: COLORS.gray,
                  }}
                >
                  <Feather
                    name="shopping-bag"
                    size={24}
                    color={COLORS.primary}
                  />
                  <Text
                    style={{
                      fontFamily: "regular",
                      fontSize: 14,
                      color: COLORS.gray,
                      fontWeight: "600",
                      lineHeight: 26,
                      marginHorizontal: 20,
                    }}
                  >
                    Cart
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => clearCache()}>
                <View
                  style={{
                    borderBottomWidth: 0.2,
                    flexDirection: "row",
                    paddingVertical: 15,
                    paddingHorizontal: 30,
                    borderColor: COLORS.gray,
                  }}
                >
                  <MaterialCommunityIcons
                    name="cached"
                    size={24}
                    color={COLORS.primary}
                  />
                  <Text
                    style={{
                      fontFamily: "regular",
                      fontSize: 14,
                      color: COLORS.gray,
                      fontWeight: "600",
                      lineHeight: 26,
                      marginHorizontal: 20,
                    }}
                  >
                    Clear Cache
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteAcount()}>
                <View
                  style={{
                    borderBottomWidth: 0.2,
                    flexDirection: "row",
                    paddingVertical: 15,
                    paddingHorizontal: 30,
                    borderColor: COLORS.gray,
                  }}
                >
                  <Ionicons
                    name="person-outline"
                    size={24}
                    color={COLORS.gray}
                  />
                  <Text
                    style={{
                      fontFamily: "regular",
                      fontSize: 14,
                      color: COLORS.gray,
                      fontWeight: "600",
                      lineHeight: 26,
                      marginHorizontal: 20,
                    }}
                  >
                    Delete Account
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => logout()}>
                <View
                  style={{
                    borderBottomWidth: 0.2,
                    flexDirection: "row",
                    paddingVertical: 15,
                    paddingHorizontal: 30,
                    borderColor: COLORS.gray,
                  }}
                >
                  <AntDesign name="logout" size={24} color={COLORS.gray} />
                  <Text
                    style={{
                      fontFamily: "regular",
                      fontSize: 14,
                      color: COLORS.gray,
                      fontWeight: "600",
                      lineHeight: 26,
                      marginHorizontal: 20,
                    }}
                  >
                    Log out
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default Profile;
