import React from "react";
import { Center } from "native-base";
import { useSelector } from "react-redux";
import {
  selectPlantsUserAdd,
  selectUserUpdate,
} from "../redux/selector/userSelector";
import { fetchUser } from "../redux/slices/userReducer";
import PlantList from "../components/PlantList";

const PlantsYouAdd = () => {
  const plantsUserAdd = useSelector(selectPlantsUserAdd);
  const userIsUpdate = useSelector(selectUserUpdate);

  return (
    <Center flex={1}>
      <PlantList
        isUpdate={userIsUpdate}
        list={plantsUserAdd}
        fetchAction={fetchUser()}
      />
    </Center>
  );
};

export default PlantsYouAdd;
