import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import MainFeed from "../src/screens/MainFeed";
import Messages from "../src/screens/Messages";
import Chat from "../src/screens/Chat";
import HobbySelector from "../src/screens/HobbySelector";
import Login from "../src/screens/Login";
import Profile from "../src/screens/Profile";
import EProfile from "../src/screens/EProfile";
import Register from "../src/screens/Register";
import SubscriptionScreen from "../src/screens/SubscriptionScreen";
import ChatPrueba from "../src/screens/ChatPrueba";
const Stack = createStackNavigator();
const screenOptions = {
  headerShown: false,
};

const AppNavigation = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="MainFeed" screenOptions={screenOptions}>
      <Stack.Screen name="MainFeed" component={MainFeed}></Stack.Screen>
      <Stack.Screen name="Messages" component={Messages}></Stack.Screen>
      <Stack.Screen name="Chat" component={Chat}></Stack.Screen>
      <Stack.Screen
        name="HobbySelector"
        component={HobbySelector}
      ></Stack.Screen>
      <Stack.Screen name="Login" component={Login}></Stack.Screen>
      <Stack.Screen name="Profile" component={Profile}></Stack.Screen>
      <Stack.Screen name="EProfile" component={EProfile}></Stack.Screen>
      <Stack.Screen name="Register" component={Register}></Stack.Screen>
      <Stack.Screen
        name="SubscriptionScreen"
        component={SubscriptionScreen}
      ></Stack.Screen>
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigation;
