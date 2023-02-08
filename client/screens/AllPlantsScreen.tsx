import React, { FC, useEffect } from "react";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import {
  Center,
  FlatList,
  Box,
  Image,
  HStack,
  VStack,
  Heading,
  Input,
  Icon,
  Button,
} from "native-base";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPlant } from "../redux/slices/plantReducer";

const AllPlantsScreen: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const allPlantList = useSelector((state: RootState) => {
    return state.plant.allPlantRes?.allPlant;
  });
  console.log(allPlantList);

  useEffect(() => {
    dispatch(fetchAllPlant());

    return () => {};
  }, []);

  return (
    <Center bg="coolGray.50" flex={1}>
      <Box mb="10px" width="90%">
        <Input
          placeholder="Search Plant"
          borderRadius="md"
          fontSize="14"
          m="5px"
          InputLeftElement={
            <Icon
              m="2"
              ml="3"
              size="6"
              color="gray.400"
              as={<MaterialIcons name="search" />}
            />
          }
        />
      </Box>
      <FlatList
        style={{ width: "90%" }}
        data={allPlantList}
        renderItem={({ item }) => (
          <Box
            style={{
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.23,
              shadowRadius: 2.62,
              elevation: 4,
              backgroundColor: "white",
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
                <Heading bold>{item.name}</Heading>

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
        )}
        keyExtractor={(item) => item._id}
      />
    </Center>
  );
};

export default AllPlantsScreen;
