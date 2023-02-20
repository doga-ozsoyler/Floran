import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import store from "./redux/store";
import { Provider } from "react-redux";
import Tabs from "./navigation/Tabs";

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <NavigationContainer>
          <Tabs />
        </NavigationContainer>
      </NativeBaseProvider>
      <StatusBar />
    </Provider>
  );
}
