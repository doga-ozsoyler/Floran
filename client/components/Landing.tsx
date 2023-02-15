import React, { useEffect } from "react";
import { Button, Center, Text, Icon, VStack, Heading } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { selectToken } from "../redux/selector/authSelector";
import { useSelector } from "react-redux";
import { LandingI } from "../types";

const Landing = (props: LandingI) => {
  const { children } = props;

  const token = useSelector(selectToken);
  console.log(token);

  useEffect(() => {}, []);
  return (
    <Center flex={1}>
      {token ? (
        children
      ) : (
        <VStack alignItems="center" width="100%">
          <Heading style={{ marginBottom: 20 }} bold>
            Are you a user?
          </Heading>
          <Button
            leftIcon={<Icon as={Ionicons} name="enter-outline" />}
            colorScheme="green"
            width="60%"
            size="sm"
          >
            Signin
          </Button>
          <Text color="light.500" bold>
            or
          </Text>
          <Button
            leftIcon={<Icon as={AntDesign} name="form" />}
            colorScheme="green"
            width="60%"
            size="sm"
          >
            Signup
          </Button>
        </VStack>
      )}
    </Center>
  );
};

export default Landing;
