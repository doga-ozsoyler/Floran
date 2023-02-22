import { RouteProp } from "@react-navigation/native";

export interface PlantScreenI {
  route: RouteProp<{ params: { plantID: string } }, "params">;
}
