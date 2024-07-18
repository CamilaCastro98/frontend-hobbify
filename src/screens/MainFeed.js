import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header/Header";
import NavBar from "../components/NavBar/NavBar";
import { Context } from "../contexts/Context";
import { API_KEY_TEST } from '@env'
import axios from "axios";

const API_URL = "https://c9knnnk6-3017.use2.devtunnels.ms/"



const user1 = {
  img: require("../../assets/user-test.jpeg"),
  name: "pedrito1",
};
const hh = {
  a1: "1",
  a2: "2",
  a3: "3",
  a4: "4",
  a5: "5",
  a6: "6",
  a7: "7",
  a8: "8",
  a9: "9",
  a10: "10",
};
const h1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const users1 = [
  {
    name: "Juan Pérez",
    img: require("../../assets/no-pic10.png"),
    hobbies: ["Leer", "Correr", "Viajar"],
    bio: "Aficionado a la lectura, apasionado por correr y amante de los viajes. Siempre en busca de la próxima aventura y un buen libro.",
  },
  {
    name: "Ana Gómez",
    img: require("../../assets/no-pic2.png"),
    hobbies: ["Cocinar", "Pintar", "Yoga"],
    bio: "Aficionado a la lectura, apasionado por correr y amante de los viajes. Siempre en busca de la próxima aventura y un buen libro.",
  },
  {
    name: "Luis Martínez",
    img: require("../../assets/no-pic3.png"),
    hobbies: ["Fútbol", "Videojuegos", "Fotografía"],
    bio: "Aficionado a la lectura, apasionado por correr y amante de los viajes. Siempre en busca de la próxima aventura y un buen libro.",
  },
  {
    name: "María Rodríguez",
    img: require("../../assets/no-pic15.png"),
    hobbies: ["Bailar", "Escribir", "Cine"],
    bio: "Aficionado a la lectura, apasionado por correr y amante de los viajes. Siempre en busca de la próxima aventura y un buen libro.",
  },
  {
    name: "Sana Minatozaki",
    img: require("../../assets/no-pic13.png"),
    hobbies: ["Bicicletas", "Leer", "Escalar"],
    bio: "Aficionado a la lectura, apasionado por correr y amante de los viajes. Siempre en busca de la próxima aventura y un buen libro.",
  },
  {
    name: "Lucía López",
    img: require("../../assets/no-pic5.png"),
    hobbies: ["Jardinería", "Natación", "Costura"],
    bio: "Aficionado a la lectura, apasionado por correr y amante de los viajes. Siempre en busca de la próxima aventura y un buen libro.",
  },
  {
    name: "Jorge Díaz",
    img: require("../../assets/no-pic1.png"),
    hobbies: ["Tocar la guitarra", "Leer", "Correr"],
    bio: "Aficionado a la lectura, apasionado por correr y amante de los viajes. Siempre en busca de la próxima aventura y un buen libro.",
  },
  {
    name: "Sofía Morales",
    img: require("../../assets/no-pic8.png"),
    hobbies: ["Fotografía", "Yoga", "Cocina"],
    bio: "Aficionado a la lectura, apasionado por correr y amante de los viajes. Siempre en busca de la próxima aventura y un buen libro.",
  },
  {
    name: "Miguel Torres",
    img: require("../../assets/no-pic9.png"),
    hobbies: ["Ciclismo", "Viajar", "Escribir"],
    bio: "Aficionado a la lectura, apasionado por correr y amante de los viajes. Siempre en busca de la próxima aventura y un buen libro.",
  },
  {
    name: "Elena Ramírez",
    img: require("../../assets/no-pic7.png"),
    hobbies: ["Pintar", "Cine", "Jardinería"],
    bio: "Aficionado a la lectura, apasionado por correr y amante de los viajes. Siempre en busca de la próxima aventura y un buen libro.",
  },
  {
    name: "Roberto Fernández",
    img: require("../../assets/no-pic11.png"),
    hobbies: ["Motocross", "Pesca", "Guitarra"],
    bio: "Aficionado a la lectura, apasionado por correr y amante de los viajes. Siempre en busca de la próxima aventura y un buen libro.",
  },
  {
    name: "Patricia Vargas",
    img: require("../../assets/no-pic12.png"),
    hobbies: ["Tejer", "Natación", "Leer"],
    bio: "Aficionado a la lectura, apasionado por correr y amante de los viajes. Siempre en busca de la próxima aventura y un buen libro.",
  },
  {
    name: "Alberto Ruiz",
    img: require("../../assets/no-pic6.png"),
    hobbies: ["Escalar", "Videojuegos", "Fotografía"],
    bio: "Aficionado a la lectura, apasionado por correr y amante de los viajes. Siempre en busca de la próxima aventura y un buen libro.",
  },
  {
    name: "Natanael Romero",
    img: require("../../assets/no-pic14.png"),
    hobbies: ["Bailar", "Escribir", "Cocinar"],
    bio: "Aficionado a la lectura, apasionado por correr y amante de los viajes. Siempre en busca de la próxima aventura y un buen libro.",
  },
  {
    name: "Daniel Herrera",
    img: require("../../assets/no-pic4.png"),
    hobbies: ["Fútbol", "Ciclismo", "Viajar"],
    bio: "Aficionado a la lectura, apasionado por correr y amante de los viajes. Siempre en busca de la próxima aventura y un buen libro.",
  },
]; 
export const fondo = "#151515"
export const textColor = "white"
export const mainColor = "#151515"
export const iconColor = "#7E78D2"
const detailColor = "#151515"









const MainFeed = ({ navigation }) => {
  const { user, isPremium,token } = useContext(Context);
  const [users, setUsers] = useState(false); 
  useEffect(() => {
    const getFilteredUsers = async () => {
      try {
        console.log(user);
          const response = await axios.get(`${API_URL}users/byhobbies/${user.userId}`,{
            headers: {
              Authorization: `Bearer ${token}`,
            }
          })
          return response.data.data
    }
    catch(error) {
        console.log(error);
          throw new Error(`error trying to get all hobbies: ${error}`)
        }
     } 
      const handleGetUsers = async () => {
        try {
          const response = await getFilteredUsers();
          setUsers(response);
          console.log(response)
        } catch (error) {
          console.log(error)
        }
      }
      handleGetUsers();

    }, [])
    
    
    
    // const newUsers = response.data;
    // console.log(newUsers);
    // setUsers(newUsers);
    // console.log(API_URL)
    
    const addNewContact = (newContact) => {
      const request1 = {
        idUser: user.userId,
        idContact: newContact.userId,
      }

      const addContact = async () => {
        try {
          console.log(user);
            const response = await axios.post(`${API_URL}users`,request1 )
            return response
      }
      catch(error) {
          console.log(error);
            throw new Error(`error trying to addcontact: ${error}`)
          }
       } 
        const handleAddContact = async () => {
          try {
            const response = await addContact();
            console.log(response)
            navigation.push("Chat", { userPara: newContact })
          } catch (error) {
            console.log(error)
          }
        }
        handleAddContact();
  
      }


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={mainColor} />
      <Header user={user} navigation={navigation} mainColor={mainColor} isPremium={isPremium} />
      <View style={styles.mainContainer}>
        <View style={{}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {
            users.length>0 ?
            
            
            users?.map((userExamplle, index) => (
              <View key={index} style={styles.card}>
                <View style={styles.cardMain}>
                  <View style={{ margin: 5 }}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.push("EProfile", { userPara: userExamplle })
                      }
                    >
                      <Image
                        source={require("../../assets/no-pic15.png")}
                        style={styles.profileImg}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.cardText}>
                    <TouchableOpacity>
                      <Text style={styles.nameInCard}>
                        {userExamplle.username}{" "}
                      </Text>
                    </TouchableOpacity>
                    <View style={styles.hobbiesContainer}>
                      {userExamplle.hobbies.map((hobby, index) => (
                        <TouchableOpacity key={index} style={styles.hobbyCard}>
                          <Text style={styles.hobbiesInCard}>{hobby.name}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                  <TouchableOpacity style={styles.imageContainer} onPress={()=> addNewContact(userExamplle)} >
                    <Image
                      source={require("../../assets/send-message.png")}
                      style={styles.sendMessage}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          : <></>
          
          }
          </ScrollView>
        </View>
      </View>
      {/* <NavBar navigation={navigation} /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor:fondo,
    // backgroundColor: "#1D1E2C",
    flex: 1,
  },
  mainContainer: {
    flex: 1,
  },
  card: {
    height: 90,
    alignSelf: "stretch",
    backgroundColor: fondo,
    marginBottom: 5,
    borderRadius: 15,
    borderBottomWidth:0.2,
    borderColor:textColor
  },
  profileImg: {
    height: 80,
    width: 80,
    borderRadius: 999,
  },
  cardMain: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  hobbiesContainer: {
    flexDirection: "row",
  },
  sendMessage: {
    width: 45,
    height:45,
    tintColor: iconColor,
  },
  imageContainer: {
    margin: 10,
    borderRadius: 999,
  },
  cardText: {
    marginTop: 10,
    marginBottom: 10,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  nameInCard: {
    fontSize: 18,
    color: textColor,
    fontWeight: "bold",
  },
  hobbiesInCard: {
    fontSize: 12,
    margin: 5,
    color: "white",
    
  },
  hobbyCard: {
    padding: 0.5,
    backgroundColor: detailColor,
    margin: 1,
    borderRadius: 99,
    borderWidth:0.3,
    borderColor:"#7E78D2"
  },
});

export default MainFeed;