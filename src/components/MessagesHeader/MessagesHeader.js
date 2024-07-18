import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { mainColor } from "../../screens/MainFeed";

const MessagesHeader = ({ navigation, searched, setSearched }) => {
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.arrow}>{"<"}</Text>
        </TouchableOpacity>
        <TextInput
            value={searched}
            onChangeText={setSearched}
            style={styles.input}
            placeholder="Search..."
            placeholderTextColor={"gray"}
          />
        <View></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: mainColor,
    height: 70,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
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
  input: {
    width: 250,
    fontSize: 16,
    color: "white",
    height:30,
    borderWidth:0.5,
    borderColor:"#7E78D2",
    borderRadius:5,
    paddingLeft:10
  },
});

export default MessagesHeader;
