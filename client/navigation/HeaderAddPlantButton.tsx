import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";

import { IconButton, Icon } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { generalScreenProp } from "./types";

const HeaderAddPlantButton = () => {
  const navigation = useNavigation<generalScreenProp>();

  return (
    <IconButton
      icon={<Icon as={FontAwesome5} name="plus" />}
      style={{ marginRight: 10 }}
      colorScheme="green"
      onPress={() => navigation.navigate("Add Plant")}
    />
  );
};

export default HeaderAddPlantButton;
