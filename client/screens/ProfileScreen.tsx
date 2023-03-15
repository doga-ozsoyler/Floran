import React, { useEffect } from "react";
import { Heading, Text } from "native-base";
import Landing from "../components/Landing";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../redux/selector/userSelector";
import { AppDispatch } from "../redux/store";
import { fetchUser } from "../redux/slices/userReducer";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import BasicButton from "../components/BasicButton";
import BoxWithShadow from "../components/BoxWithShadow";
import { useNavigation } from "@react-navigation/native";
import { generalScreenProp } from "../navigation/types";

const ProfileScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<generalScreenProp>();
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(fetchUser);
  }, []);
  return (
    <Landing>
      <BoxWithShadow>
        <Heading size="2xl">{user?.user?.nickname}</Heading>
        <Text mb={3}>{user?.user?.email}</Text>
        <BasicButton
          iconLib={AntDesign}
          iconName="form"
          onPress={() => console.log("update info")}
          discription="Update Info"
        />
        <BasicButton
          iconLib={AntDesign}
          iconName="form"
          onPress={() => console.log("update password")}
          discription="Update Password"
        />
        <BasicButton
          iconLib={Ionicons}
          iconName="md-leaf-outline"
          onPress={() => navigation.navigate("Plants You Add")}
          discription="Plants You Add"
        />
      </BoxWithShadow>
    </Landing>
  );
};

export default ProfileScreen;
