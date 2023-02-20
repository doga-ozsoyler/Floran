import React from "react";
import { Feather } from "@expo/vector-icons";
import {
  Box,
  Image,
  HStack,
  VStack,
  Heading,
  Icon,
  Button,
  Pressable,
} from "native-base";
import { PressablePlantCardI } from "./types";
import { StyleSheet } from "react-native";

const PressablePlantCard = (props: PressablePlantCardI) => {
  const { plantData } = props;

  return (
    <Pressable onPress={() => console.log(plantData._id)}>
      {({ isPressed }) => {
        return (
          <Box
            style={{
              ...style.container,
              transform: [
                {
                  scale: isPressed ? 0.98 : 1,
                },
              ],
            }}
            borderRadius="md"
            m="5px"
          >
            <HStack>
              <Image
                borderRadius="md"
                size="xl"
                alt="Leaf"
                source={require("../assets/images/illustration-summer-leaf.png")}
              />
              <VStack justifyContent="space-between" m="10px" width="100%">
                <Heading bold>{plantData.name}</Heading>

                <Button
                  leftIcon={<Icon as={Feather} name="plus-square" size="sm" />}
                  colorScheme="green"
                  width="60%"
                  size="sm"
                >
                  Add My Plants
                </Button>
              </VStack>
            </HStack>
          </Box>
        );
      }}
    </Pressable>
  );
};

const style = StyleSheet.create({
  container: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    backgroundColor: "white",
  },
});

export default PressablePlantCard;
