import React from "react";
import Landing from "../components/Landing";
import { useSelector } from "react-redux";
import { fetchUser } from "../redux/slices/userReducer";
import {
  selectUserPlants,
  selectUserUpdate,
} from "../redux/selector/userSelector";
import PlantList from "../components/PlantList";

const MyPlantsScreen = () => {
  const userPlantsList = useSelector(selectUserPlants);
  const userIsUpdate = useSelector(selectUserUpdate);

  return (
    <Landing>
      <PlantList
        isUpdate={userIsUpdate}
        list={userPlantsList}
        fetchAction={fetchUser()}
      />
    </Landing>
  );
};

export default MyPlantsScreen;
