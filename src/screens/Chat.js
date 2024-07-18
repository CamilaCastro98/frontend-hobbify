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
import React, { Profiler, useContext, useEffect, useState } from "react";
import ChatHeader from "../components/ChatHeader/ChatHeader";
import ChatInput from "../components/ChatInput/ChatInput";
import ChatMessages from "../components/ChatMessages/ChatMessages";
import { io } from "socket.io-client";
import axios from "axios";
import { Context } from "../contexts/Context";
import { useRoute } from "@react-navigation/native";

const API_URL = "https://c9knnnk6-3017.use2.devtunnels.ms/"

const socket= io("https://c9knnnk6-3017.use2.devtunnels.ms/", {
  autoConnect: false,
});

const mainColor1 = "#151515"
///////////////////////////////////////////////////////////////////////////////////////////
const Chat = ({ navigation }) => {
  const route = useRoute(); 
  const { userPara } = route.params;
  const { user, isPremium,token, updateHobbies } = useContext(Context); 
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
  const [messages, setMessages] = useState([]);
  const [userFrom, setUserFrom] = useState(user);
  const [userTo, setUserTo] = useState(userPara);
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("start", {
        userFrom: userFrom.userId,
      });
      console.log("askdpoaskdopsa")
    });

    socket.on(`contacts_${userFrom.userId}`, (e) => {
      setContacts(e);
    });
    const newUser123 = user;
    newUser123.contacts1 = contacts;
    updateHobbies(newUser123);
    setUserFrom(newUser123);
    console.log(contacts[0]?.username+"----------------------")
    socket.connect();
  }, []);
  useEffect(() => {
    console.log(contacts);
  }, [contacts])





  useEffect(() => {
    console.log(userFrom.userId," ", userTo.userId)
    if (userTo) {
      socket.emit("joinRoom", {
        userFrom: userFrom.userId,
        userTo: userTo.userId,
      });

      let messageEvent;
      if (userTo.userId > userFrom.userId)
        messageEvent = `chat_${userFrom.userId}_${userTo.userId}`;
      else messageEvent = `chat_${userTo.userId}_${userFrom.userId}`;

      socket.on(messageEvent, (e) => {
        console.log("********LLEGO MENSAJE********");
        setMessages((messages) => [...messages, e]);
      });

      socket.on("roomMessages", (e) => {
        console.log("*******MENSAJES DE LA SALA*********", e);
        setMessages(e);
      });
      // Aquí es donde te desuscribes de los eventos
      return () => {
        socket.off("connect");
        socket.off("disconnect");
        socket.off(messageEvent);
      };
    }
    socket.on("disconnect", () => {
      setIsConnected(false);
    });
  }, [ userFrom, userTo]);

  const sendMessage = (message) => {
    console.log("OS"+userFrom.userId)
    console.log("OeS"+userTo)
    socket.emit("chat", {
      message,
      userFrom: userFrom.userId,
      userTo: userTo.userId,
    });
  };



  useEffect(() => {
    console.log(user.contacts1+"---------------------------------------------------------------");
    updateHobbies(userFrom);
  }, [touched])
  



  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={{ flex: 1 }} onTouchEnd={handleTouching}>
        <StatusBar backgroundColor={mainColor1} />
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
          messages={messages}
          socket={socket}
          style={{flex:1}}
          user={user}
        />
        <ChatInput sendMessage={sendMessage}  />
        </KeyboardAvoidingView>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: mainColor1,
    flex: 1,
  },
});

export default Chat;
