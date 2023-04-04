import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Box, Input, Icon } from "native-base";
import { SearchBarI } from "./types";

const SearchBar = (props: SearchBarI) => {
  const { setSearch } = props;
  return (
    <Box mb="10px" width="90%">
      <Input
        placeholder="Search Plant"
        borderRadius="md"
        fontSize="14"
        m="5px"
        onChangeText={(text) => setSearch(text)}
        InputLeftElement={
          <Icon
            m="2"
            ml="3"
            size="6"
            color="gray.400"
            as={<MaterialIcons name="search" />}
          />
        }
      />
    </Box>
  );
};

export default SearchBar;
