import React from "react";
import { Box, Image, HStack, VStack, Heading, Pressable } from "native-base";
import { PressablePlantCardI } from "./types";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { generalScreenProp } from "../navigation/types";
import AddRemovePlantButton from "./AddRemovePlantButton";

const PressablePlantCard = (props: PressablePlantCardI) => {
  const { plantData } = props;
  const navigation = useNavigation<generalScreenProp>();

  return (
    <Pressable
      onPress={() => navigation.navigate("Plant", { plantID: plantData._id })}
    >
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

                <AddRemovePlantButton plantID={plantData._id} />
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
