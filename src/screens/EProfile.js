import { useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from "react-native";

const EProfile = () => {
  const route = useRoute();
  const { user } = route.params;
  const categories = ["asd", "asd", "asd"];
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#1D1E2C" />
      <View style={styles.imgContainer}>
        <Image style={styles.img} source={user.img} />
        <Text style={styles.name}> {user.name} </Text>
      </View>
      <View style={styles.detailsContainer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ flex: 1, height: 1, backgroundColor: "white" }} />
          <Text style={[styles.intereses, { width: 130, textAlign: "center" }]}>
            Intereses
          </Text>
          <View style={{ flex: 1, height: 1, backgroundColor: "white" }} />
        </View>
        <View style={styles.hobbiesContainer}>
          {user.hobbies.map((hobby, index) => (
            <View key={index} style={styles.hobbyCard}>
              <Text style={styles.hobbiesInCard}>{hobby}</Text>
            </View>
          ))}
        </View>
        <View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ flex: 1, height: 1, backgroundColor: "white" }} />
            <Text style={styles.intereses}>Bio</Text>
            <View style={{ flex: 1, height: 1, backgroundColor: "white" }} />
          </View>
          <Text style={styles.bio}> " {user.bio} " </Text>
        </View>
        <TouchableOpacity style={{ alignItems: "center" }}>
          <Image
            style={{
              backgroundColor: "#7E78D2",
              fontSize: 40,
              borderRadius: 20,
              color: "white",
              paddingLeft: 15,
              paddingRight: 15,
              paddingTop: 5,
              paddingBottom: 5,
              marginTop: 20,
              width: 75,
              height: 75,
              tintColor: "white",
            }}
            source={require("../../assets/send-message.png")}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1D1E2C",
  },
  imgContainer: {
    alignSelf: "stretch",
    alignContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  img: {
    height: 150,
    width: 150,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "#7E78D2",
  },
  name: {
    color: "white",
    fontSize: 10,
    marginTop: 5,
    fontSize: 30,
  },
  detailsContainer: {
    flex: 1,
  },
  intereses: {
    color: "#E5E4EC",
    fontSize: 25,
    marginBottom: 5,
    width: 60,
    textAlign: "center",
  },
  hobbiesInCard: {
    fontSize: 20,
    margin: 5,
    color: "white",
  },
  hobbyCard: {
    paddingRight: 5,
    paddingLeft: 5,
    backgroundColor: "#7E78D2",
    margin: 1,
    marginRight: 5,
    borderRadius: 4,
  },
  hobbiesContainer: {
    flexDirection: "row",
    paddingLeft: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  bio: {
    backgroundColor: "#A4A0D6",
    padding: 10,
    margin: 5,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#7E78D2",
    fontSize: 15,
  },
});

export default EProfile;
