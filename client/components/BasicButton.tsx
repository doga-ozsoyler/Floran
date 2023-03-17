import React from "react";
import { Button, Icon } from "native-base";
import { BasicButtonI } from "./types";

const BasicButton = (props: BasicButtonI) => {
  const { iconLib, iconName, onPress, discription, isLoading } = props;

  return (
    <Button
      isLoading={isLoading}
      leftIcon={<Icon as={iconLib} name={iconName} />}
      colorScheme={"green"}
      width="60%"
      size="sm"
      m={2}
      onPress={onPress}
    >
      {discription}
    </Button>
  );
};

export default BasicButton;
