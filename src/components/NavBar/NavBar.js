import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";

const NavBar = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <TouchableOpacity>
          <Image
            style={styles.icon}
            source={require("../../../assets/home.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.icon}
            source={require("../../../assets/groups.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.push("Messages")}>
          <Image
            style={styles.icon}
            source={require("../../../assets/messages.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    backgroundColor: "#151515",
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
  },
  iconContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  icon: {
    height: 40,
    width: 40,
    tintColor: "white",
  },
  iconBg: {
    height: 55,
    width: 55,
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default NavBar;
