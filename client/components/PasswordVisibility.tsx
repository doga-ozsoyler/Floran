import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Icon, Pressable } from "native-base";
import { PasswordVisibilityI } from "./types";

const PasswordVisibility = (props: PasswordVisibilityI) => {
  const { show, setShow } = props;

  return (
    <Pressable onPress={() => setShow(!show)}>
      <Icon
        as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />}
        size={5}
        mr="2"
        color="muted.400"
      />
    </Pressable>
  );
};

export default PasswordVisibility;
