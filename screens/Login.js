import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import { Formik } from "formik";
import * as Yup from "yup";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

validationSchema = Yup.object({
  password: Yup.string()
    .max(8, "Must be 8 characters or less")
    .required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
});

const inValidForm = () => {
  Alert.alert("Invalid Form", "Please enter a valid fields", [
    {
      text: "Cancel",
      onPress: () => console.log("cancle press"),
    },
    {
      text: "Continue",
      onPress: () => console.log("Clear press"),
    },
    { defaulIndex: 1 },
  ]);
};

const Login = () => {
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [obsecureText, setObsecureText] = useState(true);

  const login = async (values) => {
    setLoader(true);
    try {
      const endpoint = "http://localhost:3000/api/login";
      const data = values;
      const response = await axios.post(endpoint, data);
      console.log(response.data);
      if (response.status === 200) {
        setLoader(false);
        setResponseData(response.data);

        await AsyncStorage.setItem(
          `user${responseData._id}`,
          JSON.stringify(responseData)
        );

        await AsyncStorage.setItem("id", JSON.stringify(responseData._id));

        navigation.replace("Bottom Navigation");
      } else {
        Alert.alert("Error Loging In", "Please enter a valid fields", [
          {
            text: "Cancel",
            onPress: () => console.log("cancle press"),
          },
          {
            text: "Continue",
            onPress: () => console.log("Clear press"),
          },
          { defaulIndex: 1 },
        ]);
      }
    } catch (error) {
      Alert.alert("Error", "Error logging in", [
        {
          text: "Cancel",
          onPress: () => console.log("cancle press"),
        },
        {
          text: "Continue",
          onPress: () => console.log("Clear press"),
        },
        { defaulIndex: 1 },
      ]);
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <ScrollView>
      <SafeAreaView style={{ marginHorizontal: 20 }}>
        <View>
          <Ionicons
            style
            onPress={() => navigation.goBack()}
            name="chevron-back-circle"
            size={30}
            color={COLORS.primary}
          />

          <Image
            style={{
              height: SIZES.height / 2.4,
              width: SIZES.width - 40,
              resizeMode: "contain",
              marginBottom: SIZES.xxLarge,
            }}
            source={require("../assets/images/bk.png")}
          />

          <Text
            style={{
              fontFamily: "bold",
              fontSize: 30,
              color: COLORS.primary,
              textAlign: "center",
            }}
          >
            Luxurios Furiture
          </Text>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => login(values)}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              touched,
              values,
              errors,
              isValid,
              setFieldTouched,
            }) => (
              <View>
                <View
                  style={
                    {
                      // marginHorizontal: 20,
                      // marginBottom: 20,
                    }
                  }
                >
                  <Text
                    style={{
                      fontFamily: "regular",
                      fontSize: SIZES.xSmall,
                      marginBottom: 5,
                      marginEnd: 5,
                      textAlign: "right",
                    }}
                  >
                    Email
                  </Text>
                  <View
                    style={{
                      backgroundColor: COLORS.lightWhite,
                      height: 55,
                      borderWidth: 1,
                      borderRadius: 12,
                      flexDirection: "row",
                      paddingHorizontal: 15,
                      alignItems: "center",
                    }}
                  >
                    <MaterialIcons
                      name="email"
                      size={24}
                      color={COLORS.primary}
                    />
                    <TextInput
                      value={values.email}
                      onChangeText={handleChange("email")}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ marginLeft: 10 }}
                      placeholder="Enter your Email"
                      onFocus={() => {
                        setFieldTouched("email");
                      }}
                      onBlur={() => {
                        setFieldTouched("email", "");
                      }}
                    />
                  </View>

                  {touched.email && errors.email && (
                    <Text
                      style={{
                        color: "red",
                        fontFamily: "regular",
                        marginTop: 5,
                        fontSize: SIZES.small,
                        marginLeft: 5,
                      }}
                    >
                      {errors.email}
                    </Text>
                  )}
                </View>
                <View
                  style={{
                    // marginHorizontal: 20,
                    marginBottom: 20,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "regular",
                      fontSize: SIZES.xSmall,
                      marginBottom: 5,
                      marginEnd: 5,
                      textAlign: "right",
                    }}
                  >
                    Password
                  </Text>
                  <View
                    style={{
                      backgroundColor: COLORS.lightWhite,
                      height: 55,
                      borderWidth: 1,
                      borderRadius: 12,
                      flexDirection: "row",
                      paddingHorizontal: 15,
                      alignItems: "center",
                    }}
                  >
                    <MaterialIcons
                      name="lock"
                      size={24}
                      color={COLORS.primary}
                    />
                    <TextInput
                      secureTextEntry={obsecureText}
                      value={values.password}
                      onChangeText={handleChange("password")}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ marginLeft: 10, flex: 1 }}
                      placeholder="Enter your Password"
                      onFocus={() => {
                        setFieldTouched("password");
                      }}
                      onBlur={() => {
                        setFieldTouched("password", "");
                      }}
                    />

                    <TouchableOpacity
                      onPress={() => setObsecureText(!obsecureText)}
                    >
                      <MaterialCommunityIcons
                        name={obsecureText ? "eye-outline" : "eye-off-outline"}
                        size={18}
                        color={COLORS.primary}
                      />
                    </TouchableOpacity>
                  </View>

                  {touched.password && errors.password && (
                    <Text
                      style={{
                        color: "red",
                        fontFamily: "regular",
                        marginTop: 5,
                        fontSize: SIZES.small,
                        marginLeft: 5,
                      }}
                    >
                      {errors.password}
                    </Text>
                  )}
                </View>

                <TouchableOpacity
                  style={{
                    padding: 15,
                    backgroundColor: COLORS.primary,
                    width: 250,
                    alignItems: "center",
                    borderRadius: 20,
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                  onPress={handleSubmit}
                >
                  {!loader ? (
                    <Text
                      style={{
                        fontFamily: "bold",
                        fontSize: 20,
                        color: COLORS.lightWhite,
                      }}
                    >
                      Đăng nhập
                    </Text>
                  ) : (
                    <ActivityIndicator />
                  )}
                </TouchableOpacity>

                <Text
                  onPress={() => navigation.navigate("Register")}
                  style={{
                    textAlign: "center",
                    marginTop: 10,
                    color: COLORS.primary,
                    fontFamily: "regular",
                  }}
                >
                  Nếu chưa có Tài Khoản? Đăng kí ngay!
                </Text>
              </View>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Login;
