import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext, useEffect, useState } from "react"
import { Context } from "../src/contexts/Context";
import MainFeed, { mainColor } from "../src/screens/MainFeed";
import Messages from "../src/screens/Messages";
import Chat from "../src/screens/Chat";
import HobbySelector from "../src/screens/HobbySelector";
import Login from "../src/screens/Login";
import Profile from "../src/screens/Profile";
import EProfile from "../src/screens/EProfile";
import Register from "../src/screens/Register";
import SubscriptionScreen from "../src/screens/SubscriptionScreen";
import Landing from "../src/screens/Landing";
import CreateHobby from "../src/screens/CreateHobby";
import SubmitedHobby from "../src/screens/SubmitedHobby";
import SuccessScreen from "../src/screens/SuccessScreen";
import CancelScreen from "../src/screens/CancelScreen";
import * as Linking from 'expo-linking'
import DeepLinkingHandler from "../src/helpers/deepLinkingHandler";
import Loading from "../src/screens/Loading";
import TempLogOut from "../src/screens/TempLogOut";
import ChatPrueba from "../src/screens/ChatPrueba";
import { NavigationContainer } from "@react-navigation/native";
import QuestionScreen from "../src/screens/QuestionsScreen";
const Stack = createNativeStackNavigator();
const screenOptions = {
  headerShown: false,
  navigationBarColor:mainColor
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

const SignedInStack = ({initialRoute}) => (
  <NavigationContainer linking={linking}>
    <DeepLinkingHandler />
    <Stack.Navigator initialRouteName={initialRoute} screenOptions={screenOptions}>
      <Stack.Screen name="MainFeed" component={MainFeed} />
      <Stack.Screen name="QuestionScreen" component={QuestionScreen} />
      <Stack.Screen name="HobbySelector" component={HobbySelector} />
      <Stack.Screen name="Messages" component={Messages} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="Loading" component={Loading} />
      <Stack.Screen name="CreateHobby" component={CreateHobby} />
      <Stack.Screen name="SubmitedHobby" component={SubmitedHobby} />
      <Stack.Screen name="SubscriptionScreen" component={SubscriptionScreen} />
      <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
      <Stack.Screen name="CancelScreen" component={CancelScreen} />
      <Stack.Screen name="TempLogOut" component={TempLogOut} />
      <Stack.Screen name="Profile" component={Profile}></Stack.Screen>
    <Stack.Screen name="EProfile" component={EProfile}></Stack.Screen>
    </Stack.Navigator>
</NavigationContainer>
);


const SignedOutStack = () => (
  <NavigationContainer>

    <Stack.Navigator
      initialRouteName="Landing"
      screenOptions={screenOptions}
      >
       <Stack.Screen name="Landing" component={Landing} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
      </NavigationContainer>
);
const AppNavigation = () => {

  const { isAuthenticated, user, isLoading, setIsLoading } = useContext(Context);
  const [initialRoute, setInitialRoute] = useState(null);

    useEffect(() => {
      if (isAuthenticated !== undefined) {
        setIsLoading(false);
        let name;
        if (isAuthenticated) {
          if (user.hobbies && user.hobbies.length > 0) {
            name = "MainFeed";
          } else {
            name = "HobbySelector";
          }
        }
        setInitialRoute(name);
      }
    }, [isAuthenticated, user.hobbies]);


  if (isLoading) {
    return <Loading />;
  }

    return <>{isAuthenticated !== false ? <SignedInStack initialRoute={initialRoute} /> : <SignedOutStack />}</>;
};

export default AppNavigation;