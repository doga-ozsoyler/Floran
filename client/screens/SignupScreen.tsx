import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Center, Button, Icon } from "native-base";
import FormController from "../components/InputFormController";
import PasswordVisibility from "../components/PasswordVisibility";

const SignupScreen = () => {
  const [show, setShow] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <Center flex={1}>
      <FormController
        label="Nickname"
        message={"Error message"}
        errorMessageShow={false}
        value={nickname}
        onChangeText={setNickname}
      />
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
        isLoading={false}
        leftIcon={<Icon as={Ionicons} name="enter-outline" />}
        colorScheme="green"
        width="60%"
        size="sm"
        onPress={() => console.log("Sign up")}
      >
        Sign up
      </Button>
    </Center>
  );
};

export default SignupScreen;
