import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";

const Header = ({ user, navigation }) => {
  const saludo = "holaequisde";
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={{ width: 30 }}></View>
        <View style={styles.userProfile}>
          <TouchableOpacity
            onPress={() => navigation.push("Profile", { saludo: saludo })}
          >
            <Image style={styles.profile} source={user.img} />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity>
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadBadgeText}>11</Text>
            </View>
            <Image
              style={styles.icon}
              source={require("../../../assets/notification.png")}
            ></Image>
          </TouchableOpacity>
        </View>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 20,
    marginRight: 20,
  },
  icon: {
    tintColor: "#FEF9EF",
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  userProfile: {
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  profile: {
    width: 40,
    height: 40,
    borderRadius: 999,
  },
  unreadBadge: {
    backgroundColor: "red",
    position: "absolute",
    left: 20,
    bottom: 18,
    width: 25,
    height: 18,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
  unreadBadgeText: {
    color: "white",
    fontWeight: "600",
  },
});

export default Header;
