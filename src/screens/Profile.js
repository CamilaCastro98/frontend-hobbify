import { useRoute } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Modal,
  TextInput,
} from "react-native";
import Options from "../components/Options/Options";
import { Context } from "../contexts/Context";
import { iconColor, mainColor } from "./MainFeed";
import { updateUser } from "../helpers/petitions";
const icons = {
  pencil:require("../../assets/pencil.png")
}
const Profile = () => {
  const {updateHobbies, user, token} = useContext(Context);
  const [loading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [data, setData] = useState("");
  const [height, setHeight] = useState(40);
  const route = useRoute();
  // useEffect(() => {
  //   console.log(user)
  // }, [])
  
  const categories = ["asd", "asd", "asd"];
  const user1 = {
    name: "Juan Pérez",
    img: require("../../assets/no-pic10.png"),
    hobbies: ["Leer", "Correr", "Viajar"],
    bio: "Aficionado a la lectura, apasionado por correr y amante de los viajes. Siempre en busca de la próxima aventura y un buen libro.",
  };

  const handleEdit = (option) =>{
    setIsVisible(true);
    let keys = ""
    switch (option) {
      case "username":
        keys =user.username;
        break;
      case "Bio":
        keys =user.bio;
        break;
    }
    setData(keys);
    setTitle(option);
  }
  const handleCancel = () => {
    setData("");
    setIsVisible(false);
  }
  const hanldeUpdate = async () =>{
    console.log("si entra??")
    setIsLoading(true);
    try {
      console.log("si entra??")
      if(user[title]!== data){
        const newUser = user;
        newUser[title] = data;
        const update = await updateUser(newUser, token);
        if(update === 200){
          console.log("si entra??")
          await updateHobbies(newUser);
        }
      }
    } catch (error) {
      console.error('Error al actualizar informacion:', error);
      console.log("si entra??ERRORRRRR")
    } finally {
      console.log("si entra??ERRORRRRR12341")
      setIsLoading(false);
      setIsVisible(false);
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>

      <StatusBar backgroundColor={mainColor} />
      <View style={styles.imgContainer}>
        <Image style={styles.img} source={user1.img} />
        <View style={[styles.pencilContainer, {top:-10, right:105, position:"absolute",} ]} >
          <TouchableOpacity onPress={()=> console.log("si anda equis de")}>
            <Image style={styles.pencil} source={icons.pencil} />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection:"row", justifyContent:"center", alignItems:"center" }}>
          <Text style={styles.name}> {user.username} </Text>
          <View style={{flexDirection:"row",justifyContent:"center", alignItems:"center",padding:3, borderRadius:99,backgroundColor:"white",height:27,width:27}} >
            <TouchableOpacity onPress={()=> handleEdit("username")}>
              <Image style={{width:18,height:18}} source={icons.pencil} />
            </TouchableOpacity>
          </View>
        </View>
      <Options />
      </View>
      <View style={styles.detailsContainer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ flex: 1, height: 1, backgroundColor: "#7E78D2" }} />
            <Text style={[styles.intereses, { width: 130, textAlign: "center" }]}>
              Intereses
            </Text>
            <View style={{ borderRadius:99,backgroundColor:"white",marginRight:5  }} >
              <TouchableOpacity onPress={()=> console.log("si anda equis de")}>
                <Image style={styles.pencil} source={icons.pencil} />
              </TouchableOpacity>
            </View>
          <View style={{ flex: 1, height: 1, backgroundColor: "#7E78D2" }} />
        </View>
        <View style={styles.hobbiesContainer}>
          {user.hobbies.map((hobby, index) => (
            <View key={index} style={styles.hobbyCard}>
              <Text style={styles.hobbiesInCard}>{hobby.name}</Text>
            </View>
          ))}
        </View>
        <View style={styles.infoContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ flex: 1, height: 1, backgroundColor: "#7E78D2" }} />
            <Text style={styles.intereses}>Bio</Text>
            <View style={{ borderRadius:99,backgroundColor:"white",marginRight:5 }} >
              <TouchableOpacity onPress={()=> handleEdit("biography")}>
                <Image style={styles.pencil} source={icons.pencil} />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, height: 1, backgroundColor: "#7E78D2" }} />
          </View>
          <Text style={styles.bio}> " {user.biography} " </Text>
        </View>
        <View style={styles.infoContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ flex: 1, height: 1, backgroundColor: "#7E78D2" }} />
            <Text style={[styles.intereses,{width:180}]}>My ideal mate</Text>
            <View style={{ borderRadius:99,backgroundColor:"white",marginRight:5 }} >
              <TouchableOpacity onPress={()=> handleEdit("idealMate")}>
                <Image style={styles.pencil} source={icons.pencil} />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, height: 1, backgroundColor: "#7E78D2" }} />
          </View>
          <Text style={styles.bio}> " {user.idealMate} " </Text>
        </View>
        <View style={styles.infoContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ flex: 1, height: 1, backgroundColor: "#7E78D2" }} />
            <Text style={[styles.intereses,{width:240}]}>Passion Frequency</Text>
            <View style={{ borderRadius:99,backgroundColor:"white",marginRight:5 }} >
              <TouchableOpacity onPress={()=> handleEdit("hobbyIntensity")}>
                <Image style={styles.pencil} source={icons.pencil} />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, height: 1, backgroundColor: "#7E78D2" }} />
          </View>
          <Text style={styles.bio}> " {user.hobbyIntensity} " </Text>
        </View>
      </View>
        </ScrollView>
    <Modal transparent visible={isVisible}>
      <View style={{flex:1, justifyContent:"center", alignItems:"center",backgroundColor:"rgba(200, 194, 194, 0.5) "}}>
        <View style={{width:"80%",
        backgroundColor:"#151515",
        alignItems:"center",
        padding:5,
        borderRadius:4
      }}  >
          <Text style={{color:"white", marginBottom:10, fontSize:20}} >{`New ${title}:`}</Text>
          <TextInput
            value={data}
            autoFocus={true}
            onChangeText={setData}
            multiline={true}
            style={[styles.input, { height: Math.max(30, height) }]}
            onContentSizeChange={(event) => {
              if (event.nativeEvent.contentSize.height < 135) {
                setHeight(event.nativeEvent.contentSize.height);
                console.log(event.nativeEvent.contentSize.height);
              }
            }}
          />
          <View style={{flexDirection:"row",alignSelf:"stretch", justifyContent:"space-around",marginBottom:15}}>
            <TouchableOpacity onPress={()=>handleCancel()}
            style={{borderWidth:0.5, borderColor:"white", alignItems:"center", justifyContent:"center", borderRadius:3}} >
              <Text style={{color:"white", fontSize:20,margin:7, marginLeft:12, marginRight:12}} >Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>hanldeUpdate()}
            style={{borderWidth:0.5, borderColor:"white", alignItems:"center", justifyContent:"center", borderRadius:3}} >
              <Text style={{color:"white", fontSize:20,margin:7, marginLeft:12, marginRight:12}} >Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mainColor,
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
    tintColor: mainColor,
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
    margin: 1,
    marginRight: 5,
    borderRadius: 99,
    borderWidth:0.1,
    borderColor:"white"
  },
  hobbiesContainer: {
    flexDirection: "row",
    paddingLeft: 5,
    marginTop: 10,
    marginBottom: 10,
    justifyContent:"center"
  },
  bio: {
    backgroundColor: "rgba(200, 194, 194, 0.06) ",
    padding: 10,
    margin: 5,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "white",
    fontSize: 15,
    color:"white"
  },
  pencil:{
    width:20,
    height:20,
    tintColor:"black",
    margin:5
  },
  pencilContainer:{
    borderRadius:99,
    backgroundColor:"white",
  },
  input:{
    borderWidth:0.5,
    paddingLeft:5,
    paddingRight:5,
    marginLeft:10,
    marginRight:10,
    marginBottom:10,
    borderColor:"white",
    alignSelf:"stretch",
    color:"white"
  },
  infoContainer:{
    marginBottom:15
  }
});

export default Profile;
