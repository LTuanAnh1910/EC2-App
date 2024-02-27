import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Button,
  Alert,
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

validationSchema = Yup.object({
  password: Yup.string()
    .max(8, "Must be 8 characters or less")
    .required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  location: Yup.string()
    .min(3, "Provided avalid location address")
    .required("Required"),
  username: Yup.string()
    .min(3, "Provided avalid username")
    .required("Required"),
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

const Register = () => {
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  const [response, setResponse] = useState(null);
  const [obsecureText, setObsecureText] = useState(true);

  const registerUser = async (values) => {
    setLoader(true);

    try {
      const endpoint = "http://localhost:3000/api/register";
      const data = values;

      const response = await axios.post(endpoint, data);

      if (response.status === 201) {
        navigation.replace("Login");
      }
    } catch (error) {
      console.log(error);
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
              height: SIZES.height / 4,
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
            initialValues={{
              email: "",
              password: "",
              location: "",
              username: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => registerUser(values)}
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
                    Username
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
                    <Ionicons
                      name="person-outline"
                      size={24}
                      color={COLORS.primary}
                    />
                    <TextInput
                      value={values.username}
                      onChangeText={handleChange("username")}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ marginLeft: 10 }}
                      placeholder="Enter your username"
                      onFocus={() => {
                        setFieldTouched("username");
                      }}
                      onBlur={() => {
                        setFieldTouched("username", "");
                      }}
                    />
                  </View>

                  {touched.username && errors.username && (
                    <Text
                      style={{
                        color: "red",
                        fontFamily: "regular",
                        marginTop: 5,
                        fontSize: SIZES.small,
                        marginLeft: 5,
                      }}
                    >
                      {errors.username}
                    </Text>
                  )}
                </View>
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
                    Location
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
                    <Ionicons
                      name="location-outline"
                      size={24}
                      color={COLORS.primary}
                    />
                    <TextInput
                      value={values.location}
                      onChangeText={handleChange("location")}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ marginLeft: 10 }}
                      placeholder="Enter your location"
                      onFocus={() => {
                        setFieldTouched("location");
                      }}
                      onBlur={() => {
                        setFieldTouched("location", "");
                      }}
                    />
                  </View>

                  {touched.location && errors.location && (
                    <Text
                      style={{
                        color: "red",
                        fontFamily: "regular",
                        marginTop: 5,
                        fontSize: SIZES.small,
                        marginLeft: 5,
                      }}
                    >
                      {errors.location}
                    </Text>
                  )}
                </View>
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
                  onPress={isValid ? handleSubmit : inValidForm}
                >
                  <Text
                    style={{
                      fontFamily: "bold",
                      fontSize: 20,
                      color: COLORS.lightWhite,
                    }}
                  >
                    Đăng ký
                  </Text>
                </TouchableOpacity>

                <Text
                  onPress={() => navigation.goBack()}
                  style={{
                    textAlign: "center",
                    marginTop: 10,
                    color: COLORS.primary,
                    fontFamily: "regular",
                  }}
                >
                  Đã có Tài Khoản? Đăng Nhập!
                </Text>
              </View>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Register;
