import React, { useEffect, useState } from "react";
import { FlatList } from "native-base";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import PressablePlantCard from "./PressablePlantCard";
import SearchBar from "./SearchBar";
import getSearchDataSource from "../hooks/getSearchDataSource";
import { PlantListI } from "./types";

const PlantList = (props: PlantListI) => {
  const { isUpdate, list, fetchAction } = props;
  const dispatch = useDispatch<AppDispatch>();
  const [search, setSearch] = useState<string>(() => "");

  const searchedDataSource = getSearchDataSource(
    search,
    [isUpdate],
    list ? list : []
  );

  useEffect(() => {
    dispatch(fetchAction);

    return () => {};
  }, [dispatch, isUpdate]);

  return (
    <>
      <SearchBar setSearch={setSearch} />
      <FlatList
        style={{ width: "90%" }}
        data={searchedDataSource}
        renderItem={({ item }) => <PressablePlantCard plantData={item} />}
        keyExtractor={(item) => item._id}
      />
    </>
  );
};

export default PlantList;
