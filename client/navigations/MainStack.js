import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import DasboardScreen from "../screens/DasboardScreen";
import Detail from "../screens/Detail";
import MovieTab from "./MovieTab";
import Genre from "../screens/Genre";

const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dasboard"
        component={DasboardScreen}
        options={{ headerShown: false, statusBarHidden: true }}
      ></Stack.Screen>
      <Stack.Screen
        name="MovieTab"
        component={MovieTab}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="Genres"
        component={Genre}
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
