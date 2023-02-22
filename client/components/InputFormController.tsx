import React from "react";
import { Box, FormControl, Input } from "native-base";
import { FormControllerI } from "./types";

const FormController = (props: FormControllerI) => {
  const {
    label,
    message,
    errorMessageShow,
    value,
    onChangeText,
    type,
    InputRightElement,
  } = props;

  return (
    <Box style={{ marginBottom: errorMessageShow ? 0 : 15 }}>
      <FormControl isInvalid={errorMessageShow}>
        <FormControl.Label>{label}</FormControl.Label>
        <Input
          value={value}
          onChangeText={onChangeText}
          type={type}
          width="70%"
          variant="outline"
          placeholder={label}
          InputRightElement={InputRightElement}
        />
        <FormControl.ErrorMessage>{message}</FormControl.ErrorMessage>
      </FormControl>
    </Box>
  );
};

export default FormController;
