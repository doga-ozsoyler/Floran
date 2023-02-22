import React from "react";
import { Center, Text } from "native-base";
import { PlantScreenI } from "./types";

const PlantScreen = (props: PlantScreenI) => {
  const { plantID } = props.route.params;
  console.log(plantID);
  return (
    <Center flex={1}>
      <Text>Plant Screen</Text>
    </Center>
  );
};

export default PlantScreen;
