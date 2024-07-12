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
import Options from "../components/Options/Options";

const Profile = () => {
  const route = useRoute();
  const { saludo } = route.params;
  const categories = ["asd", "asd", "asd"];
  const user = {
    name: "Juan Pérez",
    img: require("../../assets/no-pic10.png"),
    hobbies: ["Leer", "Correr", "Viajar"],
    bio: "Aficionado a la lectura, apasionado por correr y amante de los viajes. Siempre en busca de la próxima aventura y un buen libro.",
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#1D1E2C" />
      <View style={styles.imgContainer}>
        <Image style={styles.img} source={user.img} />
        <Text style={styles.name}> {user.name} </Text>
      </View>
      <Options />
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
  options: {
    width: 50,
    height: 50,
    position: "absolute",
    left: 320,
    bottom: 160,
    tintColor: "#7E78D2",
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

export default Profile;
