import React, { useEffect, useState } from "react";
import { Center, FlatList, Text } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import {
  selectPlantsUserAdd,
  selectUser,
  selectUserUpdate,
} from "../redux/selector/userSelector";
import getSearchDataSource from "../hooks/getSearchDataSource";
import { fetchUser } from "../redux/slices/userReducer";
import SearchBar from "../components/SearchBar";
import PressablePlantCard from "../components/PressablePlantCard";

const PlantsYouAdd = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [search, setSearch] = useState<string>(() => "");

  const plantsUserAdd = useSelector(selectPlantsUserAdd);
  const userIsUpdate = useSelector(selectUserUpdate);

  const searchedDataSource = getSearchDataSource(
    search,
    [plantsUserAdd?.length],
    plantsUserAdd ? plantsUserAdd : []
  );

  useEffect(() => {
    dispatch(fetchUser());

    return () => {};
  }, [dispatch, userIsUpdate]);

  return (
    <Center flex={1}>
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

export default PlantsYouAdd;
