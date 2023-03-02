import React from "react";
import { Heading, Text, Progress, View } from "native-base";
import { ValueBarI } from "./types";

const ValueBar = (props: ValueBarI) => {
  const { header, value, valueObject } = props;

  return (
    <View>
      <Heading>{header}</Heading>
      <Progress
        colorScheme={header === "Fertilizer" ? "yellow" : "orange"}
        value={value}
      />
      <Text mb={3} bold alignSelf="center">
        {value ? valueObject[value] : valueObject[0]}
      </Text>
    </View>
  );
};

export default ValueBar;
