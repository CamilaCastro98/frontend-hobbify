import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
const mainColor1 = "#151515"
const ChatHeader = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.arrow}>{"<"}</Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity>
            <Image
              style={styles.profile}
              source={require("../../../assets/no-pic13.png")}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Text style={{ color: "#7E78D2", fontSize: 20 }}>... </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: mainColor1,
    height: 70,
  },
  mainContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 20,
  },
  arrow: {
    color: "#7E78D2",
    fontSize: 40,
  },
  profile: {
    width: 40,
    height: 40,
    borderRadius: 999,
  },
});

export default ChatHeader;
