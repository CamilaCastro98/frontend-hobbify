import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TextInput,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("https://backend-hobbify.onrender.com/");
const ChatPrueba = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [messageFromFront, setMessageFromFront] = useState("");
  const [messagesHistory, setMessagesHistory] = useState([]);

  const handleConnection = () => {
    setIsConnected(true);
  };

  const handleNewMessage = (event) => {
    setMessageFromFront(event.target.value);
  };

  useEffect(() => {
    socket.on("connect", handleConnection);
    // socket.emit("join-room", { room: "GENERAL" });
    socket.on("newMessage", (payload) => {
      console.log("En el front recibo:");
      console.log("payload:", payload);
      console.log("messagesHistory:", messagesHistory);
      setMessagesHistory((messagesHistory) => [...messagesHistory, payload]);
    });

    return () => {
      socket.off("connect");
      socket.off("newMessage");
    };
  }, []);

  const sendMessage = () => {
    socket.emit("message-sent", {
      client: socket.id,
      room: "GENERAL",
      message: messageFromFront,
    });
  };

  return (
    <SafeAreaView
      style={{ backgroundColor: "white", flex: 1, flexDirection: "column" }}
    >
      <StatusBar />
      <View>
        <Text style={{ fontSize: 40 }}>Sala de chat general</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          value={messageFromFront}
          onChangeText={setMessageFromFront}
          style={{ borderWidth: 5, flex: 1 }}
        />
        <TouchableOpacity onPress={sendMessage}>
          <Image
            style={{
              height: 30,
              width: 30,
              tintColor: "red",
              marginTop: 5,
              marginBottom: 5,
              marginLeft: 10,
              marginRight: 10,
            }}
            source={require("../../assets/send-chat.png")}
          />
        </TouchableOpacity>
      </View>
      <View>
        {messagesHistory.map((payload, index) => (
          <Text style={{ color: "black" }} key={index}>
            {payload.client == socket.id ? "Yo" : "Otro"}:{payload.message}
          </Text>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default ChatPrueba;
