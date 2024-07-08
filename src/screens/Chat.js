import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";
import React, { Profiler, useEffect, useState } from "react";
import ChatHeader from "../components/ChatHeader/ChatHeader";
import ChatInput from "../components/ChatInput/ChatInput";
import ChatMessages from "../components/ChatMessages/ChatMessages";

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

  useEffect(() => {}, []);

  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={{ flex: 1 }} onTouchEnd={handleTouching}>
        <StatusBar backgroundColor="#7E78D2" />
        <ChatHeader navigation={navigation} />
        <ChatMessages
          touched={touched}
          setDisableTouch={setDisableTouch}
          disableTouch={disableTouch}
          block={block}
          setBlock={setBlock}
        />
        <ChatInput />
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
