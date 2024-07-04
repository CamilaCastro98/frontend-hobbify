import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import MainFeed from "../src/screens/MainFeed";
import Messages from "../src/screens/Messages";
import Chat from "../src/screens/Chat";
import HobbySelector from "../src/screens/HobbySelector";
import Login from "../src/screens/Login";
import Perfil from "../src/screens/Perfil";
import Register from "../src/screens/Register";
import SubscriptionScreen from "../src/screens/SubscriptionScreen";
import Landing from "../src/screens/Landing";
import CreateHobby from "../src/screens/CreateHobby";
import SubmitedHobby from "../src/screens/SubmitedHobby";
const Stack = createStackNavigator();
const screenOptions = {
  headerShown: false,
};

const AppNavigation = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Landing" screenOptions={screenOptions}>
    <Stack.Screen name="Login" component={Login}></Stack.Screen>
      <Stack.Screen name="HobbySelector" component={HobbySelector}></Stack.Screen>
      <Stack.Screen name="Messages" component={Messages}></Stack.Screen>
      <Stack.Screen name="Chat" component={Chat}></Stack.Screen>
      <Stack.Screen name="MainFeed"component={MainFeed}></Stack.Screen>
      <Stack.Screen name="Perfil" component={Perfil}></Stack.Screen>
      <Stack.Screen name="Register" component={Register}></Stack.Screen>
      <Stack.Screen name="Landing" component={Landing}></Stack.Screen>
      <Stack.Screen name="CreateHobby" component={CreateHobby}></Stack.Screen>
      <Stack.Screen name="SubmitedHobby" component={SubmitedHobby}></Stack.Screen>
      <Stack.Screen
        name="SubscriptionScreen"
        component={SubscriptionScreen}
      ></Stack.Screen>
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigation;
