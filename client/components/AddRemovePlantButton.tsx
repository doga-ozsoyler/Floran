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
import { selectToken } from "../redux/selector/authSelector";
import { useNavigation } from "@react-navigation/native";
import { generalScreenProp } from "../navigation/types";

const AddRemovePlantButton = (props: AddRemovePlantButtonI) => {
  const { plantID } = props;
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<generalScreenProp>();
  const [isBelongUser, setIsBelongUser] = useState(false);

  const userPlantsList = useSelector(selectUserPlants);
  const userIsUpdate = useSelector(selectUserUpdate);
  const token = useSelector(selectToken);

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
        if (token) {
          dispatch(ownPlant(plantID ? plantID : ""));
          setIsBelongUser(!isBelongUser);
        } else {
          navigation.navigate("Sign in");
        }
      }}
    >
      {isBelongUser ? "Remive My Plants" : "Add My Plants"}
    </Button>
  );
};

export default AddRemovePlantButton;
