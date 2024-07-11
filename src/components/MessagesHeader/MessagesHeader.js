import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";

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
          />
        <View></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#7E78D2",
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
    color: "white",
    fontSize: 40,
  },
  input: {
    width: 250,
    fontSize: 16,
    color: "white",
    height:30,
    borderWidth:1,
    borderColor:"white",
    borderRadius:5
  },
});

export default MessagesHeader;
