import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Center, Input, Box, Button, Icon, FormControl } from "native-base";
import PasswordVisibility from "../components/PasswordVisibility";
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
      <Box style={{ marginBottom: 15 }}>
        <FormControl isInvalid={authError && authError.status === 404}>
          <FormControl.Label>Email</FormControl.Label>
          <Input
            value={email}
            onChangeText={setEmail}
            width="70%"
            variant="outline"
            placeholder="Email"
          />
          <FormControl.ErrorMessage>
            {authError?.data?.message}
          </FormControl.ErrorMessage>
        </FormControl>
      </Box>
      <Box style={{ marginBottom: 15 }}>
        <FormControl isInvalid={authError && authError.status === 400}>
          <FormControl.Label>Password</FormControl.Label>
          <Input
            value={password}
            onChangeText={setPassword}
            type={show ? "text" : "password"}
            width="70%"
            variant="outline"
            placeholder="Password"
            InputRightElement={
              <PasswordVisibility show={show} setShow={setShow} />
            }
          />
          <FormControl.ErrorMessage>
            {authError?.data?.message}
          </FormControl.ErrorMessage>
        </FormControl>
      </Box>
      <Button
        disabled={authLoading}
        leftIcon={<Icon as={Ionicons} name="enter-outline" />}
        colorScheme="green"
        width="60%"
        size="sm"
        onPress={onSignin}
      >
        Signin
      </Button>
    </Center>
  );
};

export default SigninScreen;
