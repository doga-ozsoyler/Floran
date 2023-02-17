import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Center, Button, Icon } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../redux/slices/authReducer";
import { AppDispatch } from "../redux/store";
import {
  selectAuthError,
  selectAuthLoading,
  selectSigninRes,
} from "../redux/selector/authSelector";
import { useNavigation } from "@react-navigation/native";
import { generalScreenProp } from "../navigation/types";
import FormController from "../components/InputFormController";
import PasswordVisibility from "../components/PasswordVisibility";

const SigninScreen = () => {
  const [show, setShow] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<generalScreenProp>();

  const authLoading = useSelector(selectAuthLoading);
  const authError = useSelector(selectAuthError);
  const signinRes = useSelector(selectSigninRes);

  const onSignin = () => {
    dispatch(signin({ email: email, password: password }));
  };

  useEffect(() => {
    if (!authError && signinRes) {
      navigation.navigate("Plants");
    }
  }, [authError]);

  return (
    <Center flex={1}>
      <FormController
        label="Email"
        message={"Error message"}
        errorMessageShow={false}
        value={email}
        onChangeText={setEmail}
      />
      <FormController
        label="Password"
        message={"Error message"}
        errorMessageShow={false}
        value={password}
        onChangeText={setPassword}
        type={show ? "text" : "password"}
        InputRightElement={<PasswordVisibility show={show} setShow={setShow} />}
      />
      <Button
        isLoading={authLoading}
        leftIcon={<Icon as={Ionicons} name="enter-outline" />}
        colorScheme="green"
        width="60%"
        size="sm"
        onPress={onSignin}
      >
        Sign in
      </Button>
    </Center>
  );
};

export default SigninScreen;
