import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Center, Button, Icon } from "native-base";
import FormController from "../components/InputFormController";
import PasswordVisibility from "../components/PasswordVisibility";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAuthError,
  selectAuthLoading,
  selectSignupRes,
} from "../redux/selector/authSelector";
import { useNavigation } from "@react-navigation/native";
import { generalScreenProp } from "../navigation/types";
import { signup } from "../redux/slices/authReducer";
import { AppDispatch } from "../redux/store";
import { validateEmail } from "../helpers/validation";

const SignupScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [show, setShow] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [emailValidation, setEmailValidation] = useState<boolean>(true);
  const [password, setPassword] = useState<string>("");
  const [passwordValidation, setPasswordValidation] = useState<boolean>(true);
  const navigation = useNavigation<generalScreenProp>();

  const authLoading = useSelector(selectAuthLoading);
  const authError = useSelector(selectAuthError);
  const signupRes = useSelector(selectSignupRes);

  const handleSignup = () => {
    dispatch(signup({ nickname: nickname, email: email, password: password }));
  };

  const onChangeEmail = (text: string) => {
    setEmailValidation(validateEmail(text));
    setEmail(text);
  };

  useEffect(() => {
    if (!authError && signupRes) {
      navigation.navigate("Sign in");
    }
  }, [authError]);

  return (
    <Center flex={1}>
      <FormController
        label="Nickname"
        message={authError?.message}
        errorMessageShow={authError.status === 400 && !nickname}
        value={nickname}
        onChangeText={setNickname}
      />
      <FormController
        label="Email"
        message={emailValidation ? authError?.message : "Email is Not Correct!"}
        errorMessageShow={
          (authError.status === 400 && !email) ||
          authError.status === 404 ||
          !emailValidation
        }
        value={email}
        onChangeText={onChangeEmail}
      />
      <FormController
        label="Password"
        message={authError?.message}
        errorMessageShow={authError.status === 400 && !password}
        value={password}
        onChangeText={setPassword}
        type={show ? "text" : "password"}
        InputRightElement={<PasswordVisibility show={show} setShow={setShow} />}
      />
      <Button
        isLoading={authLoading}
        leftIcon={<Icon as={AntDesign} name="form" />}
        colorScheme="green"
        width="60%"
        size="sm"
        onPress={handleSignup}
      >
        Sign up
      </Button>
    </Center>
  );
};

export default SignupScreen;
