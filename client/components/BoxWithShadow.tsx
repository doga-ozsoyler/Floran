import React from "react";
import { Box } from "native-base";
import { ChildrenI } from "./types";

const BoxWithShadow = (props: ChildrenI) => {
  const { children } = props;

  return (
    <Box
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        backgroundColor: "white",
        alignItems: "center",
        padding: 30,
      }}
      width="80%"
      borderRadius="md"
      m="5px"
    >
      {children}
    </Box>
  );
};

export default BoxWithShadow;
