import React, { useState } from "react";
import { Center, HStack, Text, Switch } from "native-base";
import FormController from "../components/InputFormController";

const AddPlantScreen = () => {
  const [plantName, setPlantName] = useState<string>("");

  return (
    <Center flex={1}>
      <FormController
        label="Plant Name"
        message={"userError?.message"}
        errorMessageShow={false}
        value={plantName}
        onChangeText={setPlantName}
      />
      <HStack width="70%" alignItems="center" justifyContent="space-between">
        <Text>Pet Friendly</Text>
        <Switch
          size="sm"
          colorScheme="emerald"
          onToggle={() => console.log("checked")}
        />
      </HStack>
    </Center>
  );
};
export default AddPlantScreen;
