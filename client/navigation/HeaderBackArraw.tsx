import React from "react";
import { useNavigation } from "@react-navigation/native";
import { HeaderBackButton } from "@react-navigation/elements";

const HeaderBackArraw = () => {
  const navigation = useNavigation();

  return (
    <HeaderBackButton
      style={{ marginLeft: 10 }}
      tintColor="green"
      onPress={() => {
        navigation.goBack();
      }}
    />
  );
};

export default HeaderBackArraw;
