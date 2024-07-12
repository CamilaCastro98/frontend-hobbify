import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { Profiler, useEffect, useState } from "react";
import ChatHeader from "../components/ChatHeader/ChatHeader";
import ChatInput from "../components/ChatInput/ChatInput";
import ChatMessages from "../components/ChatMessages/ChatMessages";
import { io } from "socket.io-client";
import axios from "axios";
import {
  API_URLTEST
} from "@env";
const socket = io("https://backend-hobbify.onrender.com/");

const Chat = ({ navigation }) => {
  const [touched, setTouched] = useState(0);
  const [disableTouch, setDisableTouch] = useState(false);
  const [block, setBlock] = useState(false);
  const handleTouching = () => {
    if (!disableTouch) {
      touched === 0 ? setTouched(1) : setTouched(0);
      setBlock(false);
    }
    setDisableTouch(false);
  };
  useEffect(() => {
    console.log(touched);
  }, [touched]);

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


  useEffect(() => {
    console.log(API_URLTEST);
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={{ flex: 1 }} onTouchEnd={handleTouching}>
        <StatusBar backgroundColor="#7E78D2" />
        <ChatHeader navigation={navigation} />
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={60} 
          >
        <ChatMessages
          touched={touched}
          setDisableTouch={setDisableTouch}
          disableTouch={disableTouch}
          block={block}
          setBlock={setBlock}
          messagesHistory={messagesHistory}
          socket={socket}
          style={{flex:1}}
        />
        <ChatInput sendMessage={sendMessage} messageFromFront={messageFromFront} setMessageFromFront={setMessageFromFront} />
        </KeyboardAvoidingView>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1D1E2C",
    flex: 1,
  },
});

export default Chat;
