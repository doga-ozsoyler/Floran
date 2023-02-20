import React, { FC, useEffect, useState } from "react";
import { Center, FlatList } from "native-base";
import { AppDispatch } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPlant } from "../redux/slices/plantReducer";
import getSearchDataSource from "../hooks/getSearchDataSource";
import SearchBar from "../components/SearchBar";
import PressablePlantCard from "../components/PressablePlantCard";
import {
  selectAllPlant,
  selectPlantUpdate,
} from "../redux/selector/plantsSelector";

const AllPlantsScreen: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [search, setSearch] = useState<string>(() => "");

  const allPlantList = useSelector(selectAllPlant);
  const plantIsUpdate = useSelector(selectPlantUpdate);

  const searchedDataSource = getSearchDataSource(
    search,
    allPlantList ? allPlantList : []
  );

  useEffect(() => {
    dispatch(fetchAllPlant());

    return () => {};
  }, [plantIsUpdate]);

  return (
    <Center bg="coolGray.50" flex={1}>
      <SearchBar setSearch={setSearch} />
      <FlatList
        style={{ width: "90%" }}
        data={searchedDataSource}
        renderItem={({ item }) => <PressablePlantCard plantData={item} />}
        keyExtractor={(item) => item._id}
      />
    </Center>
  );
};

export default AllPlantsScreen;
