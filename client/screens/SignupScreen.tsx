import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Center, useToast } from "native-base";
import FormController from "../components/InputFormController";
import PasswordVisibility from "../components/PasswordVisibility";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAuthError,
  selectAuthLoading,
  selectSignupRes,
} from "../redux/selector/authSelector";
import { signup } from "../redux/slices/authReducer";
import { AppDispatch } from "../redux/store";
import { validateEmail, validatePassword } from "../helpers/validation";
import BasicButton from "../components/BasicButton";

const SignupScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast();
  const [show, setShow] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [emailValidation, setEmailValidation] = useState<boolean>(true);
  const [password, setPassword] = useState<string>("");
  const [passwordValidation, setPasswordValidation] = useState<boolean>(true);

  const authLoading = useSelector(selectAuthLoading);
  const authError = useSelector(selectAuthError);
  const signupRes = useSelector(selectSignupRes);

  const handleSignup = () => {
    if (emailValidation && passwordValidation) {
      dispatch(
        signup({ nickname: nickname, email: email, password: password })
      );
    }
  };

  const onChangeEmail = (text: string) => {
    setEmailValidation(validateEmail(text));
    setEmail(text);
  };
  const onChangePassword = (text: string) => {
    setPasswordValidation(validatePassword(text));
    setPassword(text);
  };

  useEffect(() => {
    if (!authError && signupRes) {
      toast.show({
        description: signupRes.message,
        duration: 3000,
      });
    }
  }, [authError, signupRes]);

  return (
    <Center flex={1}>
      <FormController
        label="Nickname"
        message={authError?.message}
        errorMessageShow={authError?.status === 400 && !nickname}
        value={nickname}
        onChangeText={setNickname}
      />
      <FormController
        label="Email"
        message={emailValidation ? authError?.message : "Email is Not Correct!"}
        errorMessageShow={
          (authError?.status === 400 && !email) ||
          authError?.status === 404 ||
          !emailValidation
        }
        value={email}
        onChangeText={onChangeEmail}
      />
      <FormController
        label="Password"
        message={
          passwordValidation
            ? authError?.message
            : "Atleast 6 characters are required."
        }
        errorMessageShow={
          (authError?.status === 400 && !password) || !passwordValidation
        }
        value={password}
        onChangeText={onChangePassword}
        type={show ? "text" : "password"}
        InputRightElement={<PasswordVisibility show={show} setShow={setShow} />}
      />
      <BasicButton
        isLoading={authLoading}
        iconLib={AntDesign}
        iconName="form"
        onPress={handleSignup}
        discription="Sign up"
      />
    </Center>
  );
};

export default SignupScreen;
