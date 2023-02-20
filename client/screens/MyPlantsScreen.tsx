import React, { useEffect, useState } from "react";
import { FlatList } from "native-base";
import Landing from "../components/Landing";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { fetchUser } from "../redux/slices/userReducer";
import {
  selectUserPlants,
  selectUserUpdate,
} from "../redux/selector/userSelector";
import getSearchDataSource from "../hooks/getSearchDataSource";
import SearchBar from "../components/SearchBar";
import PressablePlantCard from "../components/PressablePlantCard";

const MyPlantsScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [search, setSearch] = useState<string>(() => "");

  const userPlantsList = useSelector(selectUserPlants);
  const userIsUpdate = useSelector(selectUserUpdate);

  const searchedDataSource = getSearchDataSource(
    search,
    userPlantsList ? userPlantsList : []
  );

  useEffect(() => {
    dispatch(fetchUser());

    return () => {};
  }, [userIsUpdate]);

  return (
    <Landing>
      <SearchBar setSearch={setSearch} />
      <FlatList
        style={{ width: "90%" }}
        data={searchedDataSource}
        renderItem={({ item }) => <PressablePlantCard plantData={item} />}
        keyExtractor={(item) => item._id}
      />
    </Landing>
  );
};

export default MyPlantsScreen;
