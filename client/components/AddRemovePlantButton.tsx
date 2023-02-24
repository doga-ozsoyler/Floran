import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { Icon, Button } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserPlants,
  selectUserUpdate,
} from "../redux/selector/userSelector";
import { ownPlant } from "../redux/slices/userReducer";
import { AppDispatch } from "../redux/store";
import { fetchUser } from "../redux/slices/userReducer";
import { AddRemovePlantButtonI } from "./types";

const AddRemovePlantButton = (props: AddRemovePlantButtonI) => {
  const { plantID } = props;
  const dispatch = useDispatch<AppDispatch>();
  const [isBelongUser, setIsBelongUser] = useState(false);

  const userPlantsList = useSelector(selectUserPlants);
  const userIsUpdate = useSelector(selectUserUpdate);

  useEffect(() => {
    dispatch(fetchUser());
  }, [userIsUpdate]);

  useEffect(() => {
    const plantObj = userPlantsList?.find(
      (userPlant) => userPlant._id === plantID
    );

    setIsBelongUser(plantObj ? true : false);
  }, [userPlantsList?.length]);
  return (
    <Button
      leftIcon={<Icon as={Feather} name="plus-square" size="sm" />}
      colorScheme={isBelongUser ? "amber" : "green"}
      width="60%"
      size="sm"
      onPress={() => {
        dispatch(ownPlant(plantID ? plantID : ""));
        setIsBelongUser(!isBelongUser);
      }}
    >
      {isBelongUser ? "Remive My Plants" : "Add My Plants"}
    </Button>
  );
};

export default AddRemovePlantButton;
