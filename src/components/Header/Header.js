import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { iconColor, mainColor, textColor } from "../../screens/MainFeed";

const premiumBadge = {
  vipOn: require("../../../assets/vip-on.png"),
  vipOff: require("../../../assets/vip-off.png")
}
const isPremium1 = true;
const Header = ({ user, navigation, isPremium }) => {
  const handlePremium = () => {

  }
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <View >
          <TouchableOpacity onPress={()=> isPremium ?  "" : navigation.push("SubscriptionScreen") }>

        <Image
              style={ isPremium ? styles.iconPremium : styles.icon }
              source={ isPremium ? premiumBadge.vipOn : premiumBadge.vipOff }
              />
              </TouchableOpacity>
        </View>
        <View style={styles.userProfile}>
          <TouchableOpacity
            onPress={() => navigation.push("Profile", { user:user })}
          >
            <Image style={styles.profile} source={require("../../../assets/no-pic10.png")} />
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
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: mainColor,
    // backgroundColor: mainColor,
    height: 70,
    // borderBottomLeftRadius: 10,
    // borderBottomRightRadius: 10,
    borderBottomWidth:0.1,
    borderColor:textColor
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
    tintColor: "white",
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
  iconPremium: {
    tintColor: "gold",
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
});

export default Header;
