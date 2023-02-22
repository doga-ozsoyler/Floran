import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { selectUserPlants } from "../redux/selector/userSelector";
import { ownPlant } from "../redux/slices/userReducer";
import { AppDispatch } from "../redux/store";
import { useNavigation } from "@react-navigation/native";
import { generalScreenProp } from "../navigation/types";

const PressablePlantCard = (props: PressablePlantCardI) => {
  const { plantData } = props;
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<generalScreenProp>();
  const [isBelongUser, setIsBelongUser] = useState(false);

  const userPlantsList = useSelector(selectUserPlants);

  useEffect(() => {
    const plantObj = userPlantsList?.find(
      (userPlant) => userPlant._id === plantData._id
    );

    setIsBelongUser(plantObj ? true : false);
  }, []);

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

                <Button
                  leftIcon={<Icon as={Feather} name="plus-square" size="sm" />}
                  colorScheme={isBelongUser ? "amber" : "green"}
                  width="60%"
                  size="sm"
                  onPress={() => {
                    dispatch(ownPlant(plantData._id));
                    setIsBelongUser(!isBelongUser);
                  }}
                >
                  {isBelongUser ? "Remive My Plants" : "Add My Plants"}
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
