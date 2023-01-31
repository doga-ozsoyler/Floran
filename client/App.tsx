import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AllPlantsScreen from "./screens/AllPlantsScreen";
import store from "./redux/store";
import { Provider } from "react-redux";

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <AllPlantsScreen />
      </NativeBaseProvider>
      <StatusBar />
    </Provider>
  );
}
