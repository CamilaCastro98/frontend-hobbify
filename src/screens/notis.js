
import { useState, useEffect, useRef } from "react";
import { Text, View } from "react-native";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
export default function App() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState("");
  const responseListener = useRef();
  const notificationListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      if (token) {
        setExpoPushToken(token);
      }
    });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });
    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const registerForPushNotificationsAsync = async () => {
    let token;
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      alert(
        "No se pudo obtener el token de notificación para las notificaciones push."
      );
      return;
    }

    const projectId = Constants.expoConfig.extra.projectId;
    token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;

    return token;
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>App con Expo y Notificaciones</Text>
    </View>
  );
}

-------------------------------App.json----------------------------------------

Se agrega una propiedad extra con el projectId para usarla en la extracción del token

 "extra": {
      "projectId": "*****-*******-******"
    }

El Project id se saca del dashboard de la pagina de expo, en tu proyecto hay una columna id.
