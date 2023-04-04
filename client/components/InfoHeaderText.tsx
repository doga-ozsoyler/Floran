import React from "react";
import { View, Heading, Text } from "native-base";
import { InfoHeaderTextI } from "./types";

const InfoHeaderText = (props: InfoHeaderTextI) => {
  const { header, text } = props;
  return (
    <View>
      <Heading>{header}</Heading>
      <Text mb={3} marginLeft={8}>
        {text}
      </Text>
    </View>
  );
};

export default InfoHeaderText;
