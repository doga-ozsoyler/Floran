import React, { FC } from "react";
import { Center } from "native-base";
import { useSelector } from "react-redux";
import { fetchAllPlant } from "../redux/slices/plantReducer";
import {
  selectAllPlant,
  selectPlantUpdate,
} from "../redux/selector/plantsSelector";
import PlantList from "../components/PlantList";

const AllPlantsScreen: FC = () => {
  const allPlantList = useSelector(selectAllPlant);
  const plantIsUpdate = useSelector(selectPlantUpdate);

  return (
    <Center flex={1}>
      <PlantList
        isUpdate={plantIsUpdate}
        list={allPlantList}
        fetchAction={fetchAllPlant()}
      />
    </Center>
  );
};

export default AllPlantsScreen;
