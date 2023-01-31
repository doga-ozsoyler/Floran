import React, { FC, useEffect } from "react";
import { Center, FlatList, Text, Box, View } from "native-base";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPlant } from "../redux/slices/plantReducer";

const AllPlantsScreen: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const allPlantList = useSelector((state: RootState) => {
    return state.plant.allPlantRes?.allPlant;
  });

  useEffect(() => {
    dispatch(fetchAllPlant());

    return () => {};
  }, []);

  return (
    <Center flex={1} pt="70px">
      <FlatList
        data={allPlantList}
        renderItem={({ item }) => (
          <Box>
            <Text>{item.name}</Text>
          </Box>
        )}
      />
    </Center>
  );
};

export default AllPlantsScreen;
