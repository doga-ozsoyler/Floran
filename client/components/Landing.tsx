import React, { useEffect } from "react";
import { Button, Center, Text, Icon, VStack, Heading } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { selectToken } from "../redux/selector/authSelector";
import { useSelector } from "react-redux";
import { LandingI } from "../types";
import { useNavigation } from "@react-navigation/native";
import { generalScreenProp } from "../navigation/types";

const Landing = (props: LandingI) => {
  const { children } = props;
  const navigation = useNavigation<generalScreenProp>();

  const token = useSelector(selectToken);

  useEffect(() => {}, []);
  return (
    <Center flex={1}>
      {false ? (
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
            onPress={() => {
              navigation.navigate("Sign in");
            }}
          >
            Sign in
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
            Sign up
          </Button>
        </VStack>
      )}
    </Center>
  );
};

export default Landing;
