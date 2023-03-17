import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Center, Button } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../redux/slices/authReducer";
import { AppDispatch } from "../redux/store";
import {
  selectAuthError,
  selectAuthLoading,
  selectSigninRes,
  selectToken,
} from "../redux/selector/authSelector";
import { useNavigation } from "@react-navigation/native";
import { generalScreenProp } from "../navigation/types";
import FormController from "../components/InputFormController";
import PasswordVisibility from "../components/PasswordVisibility";
import BasicButton from "../components/BasicButton";

const SigninScreen = () => {
  const [show, setShow] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<generalScreenProp>();

  const authLoading = useSelector(selectAuthLoading);
  const authError = useSelector(selectAuthError);
  const signinRes = useSelector(selectSigninRes);
  const token = useSelector(selectToken);

  const handleSignin = () => {
    dispatch(signin({ email: email, password: password }));
  };

  useEffect(() => {
    if (!authError && signinRes) {
      navigation.navigate("Plants");
    }
  }, [token]);

  return (
    <Center flex={1}>
      <FormController
        label="Email"
        message={authError?.message}
        errorMessageShow={authError?.status === 404}
        value={email}
        onChangeText={setEmail}
      />
      <FormController
        label="Password"
        message={authError?.message}
        errorMessageShow={authError?.status === 400}
        value={password}
        onChangeText={setPassword}
        type={show ? "text" : "password"}
        InputRightElement={<PasswordVisibility show={show} setShow={setShow} />}
      />
      <BasicButton
        iconLib={Ionicons}
        iconName="enter-outline"
        onPress={handleSignin}
        discription="Sign in"
      />
      <Button
        variant="link"
        onPress={() => {
          navigation.navigate("Sign up");
        }}
      >
        Don't have an account?
      </Button>
    </Center>
  );
};

export default SigninScreen;
