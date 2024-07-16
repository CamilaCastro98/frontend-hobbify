import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
const mainColor1 = "#151515"
const ChatInput = ({sendMessage, messageFromFront,setMessageFromFront}) => {
  const [height, setHeight] = useState(40);
  const sendHandler=() =>{
    sendMessage();
    setMessageFromFront("");
  }
  return (
    <View style={[styles.container, { height: Math.max(50, height + 15) }]}>
      <View style={styles.mainContainer}>
        <TouchableOpacity>
          <Image
            style={styles.icon}
            source={require("../../../assets/plus.png")}
          />
        </TouchableOpacity>
        <View
          style={[styles.inputContainer, { height: Math.max(30, height + 5) }]}
        >
          <TextInput
            value={messageFromFront}
            onChangeText={setMessageFromFront}
            multiline={true}
            style={[styles.input, { height: Math.max(30, height) }]}
            onContentSizeChange={(event) => {
              if (event.nativeEvent.contentSize.height < 135) {
                setHeight(event.nativeEvent.contentSize.height);
                console.log(event.nativeEvent.contentSize.height);
              }
            }}
          />
        </View>
        <TouchableOpacity  onPress={()=>sendHandler()}>
          <Image
            style={styles.icon}
            source={require("../../../assets/send-chat.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor:mainColor1,
  },
  mainContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  icon: {
    height: 30,
    width: 30,
    tintColor: "white",
    marginTop: 5,
    marginBottom: 5,
  },
  input: {
    width: 250,
    fontSize: 16,
    color: "white",
  },
  inputContainer: {
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: "white",
    paddingLeft: 5,
    paddingRight: 5,
  },
});

export default ChatInput;
