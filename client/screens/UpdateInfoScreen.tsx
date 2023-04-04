import React, { useState } from "react";
import { Center } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import FormController from "../components/InputFormController";
import BasicButton from "../components/BasicButton";
import { validateEmail } from "../helpers/validation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { updateUserInfo } from "../redux/slices/userReducer";
import {
  selectInfoUpdateRes,
  selectUserError,
  selectUserLoading,
} from "../redux/selector/userSelector";
import { UserUpdateInfoPropsI } from "../redux/types";
import showToast from "../hooks/showToast";

const UpdateInfoScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [nickname, setNickname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [emailValidation, setEmailValidation] = useState<boolean>(true);

  const userIsLoading = useSelector(selectUserLoading);
  const userError = useSelector(selectUserError);
  const infoUpdateRes = useSelector(selectInfoUpdateRes);

  const handleUpdateInfo = () => {
    let updateData: UserUpdateInfoPropsI = {};
    if (nickname) updateData["nickname"] = nickname;
    if (email) updateData["email"] = email;

    if (emailValidation) {
      dispatch(updateUserInfo(updateData));
    }
    setNickname("");
    setEmail("");
  };

  const onChangeEmail = (text: string) => {
    if (text === "") {
      setEmailValidation(true);
    } else {
      setEmailValidation(validateEmail(text));
    }
    setEmail(text);
  };

  showToast(infoUpdateRes, userError);

  return (
    <Center flex={1}>
      <FormController
        label="Nickname"
        message={userError?.message}
        errorMessageShow={false}
        value={nickname}
        onChangeText={setNickname}
      />
      <FormController
        label="Email"
        message={userError?.message}
        errorMessageShow={!emailValidation}
        value={email}
        onChangeText={onChangeEmail}
      />
      <BasicButton
        isLoading={userIsLoading}
        iconLib={AntDesign}
        iconName="form"
        onPress={handleUpdateInfo}
        discription="Update Info"
      />
    </Center>
  );
};

export default UpdateInfoScreen;
