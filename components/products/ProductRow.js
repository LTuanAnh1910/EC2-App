import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { FlatList } from "react-native-gesture-handler";
import { COLORS, SIZES } from "../../constants";
import ProductCartView from "./ProductCartView";
import useFetch from "../../hook/useFetch";

const ProductRow = ({ userLogin }) => {
  const { data, isLoading, error } = useFetch();

  // console.log(userLogin);
  return (
    <View style={{ marginTop: SIZES.medium }}>
      {isLoading ? (
        <ActivityIndicator size={SIZES.large} color={COLORS.primary} />
      ) : error ? (
        <Text>Some things wrong</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <ProductCartView item={item} userLogin={userLogin} />
          )}
          horizontal
          contentContainerStyle={{ columnGap: SIZES.medium }}
        />
      )}
    </View>
  );
};

export default ProductRow;
