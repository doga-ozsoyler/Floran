import { useEffect, useState } from "react";
import { plantData } from "../redux/types";

const getSearchDataSource = (
  search: string,
  isUpdate: any[],
  allPlantList: plantData[]
) => {
  const [searchedDataSource, setSearchedDataSource] =
    useState<plantData[]>(allPlantList);

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
