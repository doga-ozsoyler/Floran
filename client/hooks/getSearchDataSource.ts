import { useEffect, useState } from "react";
import { plantDataI } from "../redux/types";

const getSearchDataSource = (
  search: string,
  isUpdate: any[],
  allPlantList: plantDataI[]
) => {
  const [searchedDataSource, setSearchedDataSource] =
    useState<plantDataI[]>(allPlantList);

  useEffect(() => {
    const filteredPlants = allPlantList?.filter(function (item) {
      //search
      const itemData = item.name.toUpperCase();
      const textData = search.toUpperCase();

      return itemData.indexOf(textData) === -1 ? false : true;
    });

    setSearchedDataSource(filteredPlants ? filteredPlants : []);
  }, [search, ...isUpdate]);

  return searchedDataSource;
};

export default getSearchDataSource;
