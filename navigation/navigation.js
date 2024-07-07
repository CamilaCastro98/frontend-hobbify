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
import SuccessScreen from "../src/screens/SuccessScreen";
import CancelScreen from "../src/screens/CancelScreen";
import * as Linking from 'expo-linking'
import DeepLinkingHandler from "../src/helpers/deepLinkingHandler";
const Stack = createStackNavigator();
const screenOptions = {
  headerShown: false,
};

const linking = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      SuccessScreen: 'success',
      CancelScreen: 'cancel',
    },
  },
}

const AppNavigation = () => {

  return (
    <NavigationContainer linking={linking}>
      {/* <DeepLinkingHandler /> */}
      <Stack.Navigator initialRouteName="Landing" screenOptions={screenOptions}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="HobbySelector" component={HobbySelector} />
        <Stack.Screen name="Messages" component={Messages} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="MainFeed" component={MainFeed} />
        <Stack.Screen name="Perfil" component={Perfil} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Landing" component={Landing} />
        <Stack.Screen name="CreateHobby" component={CreateHobby} />
        <Stack.Screen name="SubmitedHobby" component={SubmitedHobby} />
        <Stack.Screen name="SubscriptionScreen" component={SubscriptionScreen} />
        <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
        <Stack.Screen name="CancelScreen" component={CancelScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;