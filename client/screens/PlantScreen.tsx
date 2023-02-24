import React, { useEffect } from "react";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Center,
  Heading,
  Box,
  Image,
  Text,
  Progress,
  Button,
  Icon,
} from "native-base";
import { PlantScreenI } from "./types";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlant } from "../redux/slices/plantReducer";
import { AppDispatch } from "../redux/store";
import { selectPlant } from "../redux/selector/plantsSelector";
import { fertilizer, sunExposureValue } from "../helpers/constants";
import AddRemovePlantButton from "../components/addRemovePlantButton";

const PlantScreen = (props: PlantScreenI) => {
  const plantID = props?.route?.params?.plantID;
  const dispatch = useDispatch<AppDispatch>();
  const plant = useSelector(selectPlant);

  useEffect(() => {
    if (plantID) dispatch(fetchPlant(plantID));
  }, [plantID]);
  return (
    <Center flex={1}>
      <Image
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,
        }}
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
          <Heading>Pet Friendly</Heading>
          <Text mb={3} marginLeft={8}>
            {plant?.petFriendly ? "Yes" : "No"}
          </Text>
          <Heading>Water</Heading>
          <Text
            mb={3}
            marginLeft={8}
          >{`Every ${plant?.whenToWater?.min}-${plant?.whenToWater?.max} Days`}</Text>
          <Heading>Sun Exposure</Heading>
          <Progress colorScheme="orange" value={plant?.sunExposure} />
          <Text mb={3} bold alignSelf="center">
            {plant?.sunExposure
              ? sunExposureValue[plant?.sunExposure]
              : sunExposureValue[0]}
          </Text>
          <Heading>Fertilizer</Heading>
          <Progress colorScheme="yellow" value={plant?.fertilizer} />
          <Text mb={3} bold alignSelf="center">
            {plant?.fertilizer ? fertilizer[plant?.fertilizer] : fertilizer[0]}
          </Text>
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
              onPress={() => console.log("own plant")}
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
