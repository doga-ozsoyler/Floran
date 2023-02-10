import React, { FC, useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import {
  Center,
  FlatList,
  Box,
  Image,
  HStack,
  VStack,
  Heading,
  Icon,
  Button,
  Pressable,
} from "native-base";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPlant } from "../redux/slices/plantReducer";
import getSearchDataSource from "../hooks/getSearchDataSource";
import SearchBar from "../components/SearchBar";

const AllPlantsScreen: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [search, setSearch] = useState<string>(() => "");

  const allPlantList = useSelector((state: RootState) => {
    return state.plant.allPlantRes?.allPlant;
  });

  const searchedDataSource = getSearchDataSource(
    search,
    allPlantList ? allPlantList : []
  );

  useEffect(() => {
    dispatch(fetchAllPlant());

    return () => {};
  }, []);

  return (
    <Center bg="coolGray.50" flex={1}>
      <SearchBar setSearch={setSearch} />
      <FlatList
        style={{ width: "90%" }}
        data={searchedDataSource}
        renderItem={({ item }) => (
          <Pressable onPress={() => console.log(item._id)}>
            {({ isPressed }) => {
              return (
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
                    <VStack
                      justifyContent="space-between"
                      m="10px"
                      width="100%"
                    >
                      <Heading bold>{item.name}</Heading>

                      <Button
                        leftIcon={
                          <Icon as={Feather} name="plus-square" size="sm" />
                        }
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
        )}
        keyExtractor={(item) => item._id}
      />
    </Center>
  );
};

export default AllPlantsScreen;
