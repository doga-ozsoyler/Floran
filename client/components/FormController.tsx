import React from "react";
import { Box, FormControl } from "native-base";
import { FormControllerI } from "./types";

const FormController = (props: FormControllerI) => {
  const { label, message, errorMessageShow, children } = props;

  return (
    <Box style={{ marginBottom: errorMessageShow ? 0 : 15 }}>
      <FormControl isInvalid={errorMessageShow}>
        <FormControl.Label>{label}</FormControl.Label>
        {children}
        <FormControl.ErrorMessage>{message}</FormControl.ErrorMessage>
      </FormControl>
    </Box>
  );
};

export default FormController;
