import React, { useEffect } from "react";
import { Text } from "native-base";
import Landing from "../components/Landing";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { fetchUser } from "../redux/slices/userReducer";
import { selectUser } from "../redux/selector/userSelector";

const MyPlantsScreen = () => {
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector(selectUser);
  console.log(user);
  console.log(user?.user?.addedPlants);

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return (
    <Landing>
      <Text>My Plants</Text>
    </Landing>
  );
};

export default MyPlantsScreen;
