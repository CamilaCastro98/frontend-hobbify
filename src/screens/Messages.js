import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import NavBar from "../components/NavBar/NavBar";
import MessagesHeader from "../components/MessagesHeader/MessagesHeader";
const h1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const userExamplle = {
  name: "Pedrito Fulano",
  img: require("../../assets/no-pic.png"),
  hobbies: ["Boxeo", "Motocross", "Tejer"],
  message: "hola, mucho gusto en conocerte!",
};
const users = [
  {
    name: "Sana Minatozaki",
    img: require("../../assets/no-pic13.png"),
    hobbies: ["Pesca", "Senderismo", "Escalar"],
    message: "De nada, pero cuando iras?",
  },
  {
    name: "Sofía Morales",
    img: require("../../assets/no-pic8.png"),
    hobbies: ["Fotografía", "Yoga", "Cocina"],
    message: "Hola, encantado de conocerte!",
  },
  {
    name: "Luis Martínez",
    img: require("../../assets/no-pic3.png"),
    hobbies: ["Fútbol", "Videojuegos", "Fotografía"],
    message: "Hola, qué tal!",
  },
  {
    name: "Miguel Torres",
    img: require("../../assets/no-pic9.png"),
    hobbies: ["Ciclismo", "Viajar", "Escribir"],
    message: "Encantado de conocerte!",
  },
  {
    name: "Patricia Vargas",
    img: require("../../assets/no-pic12.png"),
    hobbies: ["Tejer", "Natación", "Leer"],
    message: "Hola, mucho gusto en conocerte!",
  },
  {
    name: "Alberto Ruiz",
    img: require("../../assets/no-pic6.png"),
    hobbies: ["Escalar", "Videojuegos", "Fotografía"],
    message: "Es un placer conocerte!",
  },
  {
    name: "Juan Pérez",
    img: require("../../assets/no-pic10.png"),
    hobbies: ["Leer", "Correr", "Viajar"],
    message: "Es un placer conocerte!",
  },
  {
    name: "Daniel Herrera",
    img: require("../../assets/no-pic4.png"),
    hobbies: ["Fútbol", "Ciclismo", "Viajar"],
    message: "Un placer conocerte!",
  },
  {
    name: "María Rodríguez",
    img: require("../../assets/no-pic15.png"),
    hobbies: ["Bailar", "Escribir", "Cine"],
    message: "Hola, es un placer conocerte!",
  },
  {
    name: "Natanael Romero",
    img: require("../../assets/no-pic14.png"),
    hobbies: ["Bailar", "Escribir", "Cocinar"],
    message: "Mucho gusto en conocerte!",
  },
  {
    name: "Elena Ramírez",
    img: require("../../assets/no-pic7.png"),
    hobbies: ["Pintar", "Cine", "Jardinería"],
    message: "Es un placer conocerte!",
  },
  {
    name: "Roberto Fernández",
    img: require("../../assets/no-pic11.png"),
    hobbies: ["Motocross", "Pesca", "Guitarra"],
    message: "Hola, qué tal!",
  },
  {
    name: "Lucía López",
    img: require("../../assets/no-pic5.png"),
    hobbies: ["Jardinería", "Natación", "Costura"],
    message: "Mucho gusto!",
  },
  {
    name: "Ana Gómez",
    img: require("../../assets/no-pic2.png"),
    hobbies: ["Cocinar", "Pintar", "Yoga"],
    message: "Encantado de conocerte!",
  },
  {
    name: "Jorge Díaz",
    img: require("../../assets/no-pic1.png"),
    hobbies: ["Guitarra", "Leer", "Correr"],
    message: "Qué gusto conocerte!",
  },
];

console.log(users);
const Messages = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#7E78D2" />
      <MessagesHeader navigation={navigation} />
      <View style={styles.mainContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {users.map((userExamplle, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.push("Chat")}
            >
              <View style={styles.card}>
                <View style={styles.mainCard}>
                  <View style={{ margin: 5 }}>
                    <Image
                      source={userExamplle.img}
                      style={styles.profileImg}
                    />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.nameText}>{userExamplle.name}</Text>
                    <Text style={styles.messageText}>
                      {userExamplle.message}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1D1E2C",
    flex: 1,
  },
  mainContainer: {
    flex: 1,
  },
  card: {
    height: 90,
    alignSelf: "stretch",
    borderRadius: 15,
    marginLeft: 15,
    marginRight: 15,
  },
  profileImg: {
    height: 75,
    width: 75,
    borderRadius: 999,
  },
  nameText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  messageText: {
    color: "white",
    fontSize: 16,
  },
  mainCard: {
    felx: 1,
    flexDirection: "row",
  },
  textContainer: {
    margin: 10,
  },
});

export default Messages;
