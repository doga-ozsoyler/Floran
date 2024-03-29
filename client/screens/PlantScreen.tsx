import React, { useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Center, Heading, Box, Image, Button, Icon } from "native-base";
import { PlantScreenI } from "./types";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlant } from "../redux/slices/plantReducer";
import { AppDispatch } from "../redux/store";
import { selectPlant } from "../redux/selector/plantsSelector";
import { fertilizer, sunExposureValue } from "../helpers/constants";
import AddRemovePlantButton from "../components/AddRemovePlantButton";
import { selectToken } from "../redux/selector/authSelector";
import { useNavigation } from "@react-navigation/native";
import { generalScreenProp } from "../navigation/types";
import ValueBar from "../components/ValueBar";
import InfoHeaderText from "../components/InfoHeaderText";

const PlantScreen = (props: PlantScreenI) => {
  const plantID = props?.route?.params?.plantID;
  const navigation = useNavigation<generalScreenProp>();
  const dispatch = useDispatch<AppDispatch>();
  const plant = useSelector(selectPlant);
  const token = useSelector(selectToken);

  useEffect(() => {
    if (plantID) dispatch(fetchPlant(plantID));
  }, [plantID]);
  return (
    <Center flex={1}>
      <Image
        borderRadius="md"
        size="2xl"
        alt="Leaf"
        source={require("../assets/images/illustration-summer-leaf.png")}
      />
      <Heading size="2xl">{plant?.name}</Heading>
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
        <Box w="90%">
          <InfoHeaderText
            header="Pet Friendly"
            text={plant?.petFriendly ? "Yes" : "No"}
          />
          <InfoHeaderText
            header="Water"
            text={`Every ${plant?.whenToWater?.min}-${plant?.whenToWater?.max} Days`}
          />
          <ValueBar
            header="Sun Exposure"
            value={plant?.sunExposure}
            valueObject={sunExposureValue}
          />
          <ValueBar
            header="Fertilizer"
            value={plant?.fertilizer}
            valueObject={fertilizer}
          />
          <Box w="100%" alignItems="center" mt={3}>
            <AddRemovePlantButton plantID={plantID} />
          </Box>
          <Box w="100%" alignItems="center" mt={3}>
            <Button
              leftIcon={
                <Icon
                  as={MaterialCommunityIcons}
                  name="clock-time-four-outline"
                  size="sm"
                />
              }
              colorScheme={"green"}
              width="60%"
              size="sm"
              onPress={() => {
                if (token) {
                  console.log("own plant");
                } else {
                  navigation.navigate("Sign in");
                }
              }}
            >
              Add Reminders
            </Button>
          </Box>
        </Box>
      </Box>
    </Center>
  );
};

export default PlantScreen;
