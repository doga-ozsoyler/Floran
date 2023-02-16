import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";

import { IconButton, Icon } from "native-base";

const HeaderAddPlantButton = () => {
  return (
    <IconButton
      icon={<Icon as={FontAwesome5} name="plus" />}
      style={{ marginRight: 10 }}
      colorScheme="green"
    />
  );
};

export default HeaderAddPlantButton;
