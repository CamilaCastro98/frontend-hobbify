import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  SafeAreaView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../contexts/Context";
import { mainColor } from "../../screens/MainFeed";

const Options = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    console.log(isVisible);
  }, [isVisible]);

  const handleOpenModal = () => {
    setIsVisible(true);
  };

  const handleCloseModal = () => {
    setIsVisible(false);
  };

  const {logout} = useContext(Context)

  return (
    <>
      <TouchableOpacity style={styles.options1} onPress={handleOpenModal}>
        <Image
          style={styles.options}
          source={require("../../../assets/options.png")}
        />
      </TouchableOpacity>
      <Modal transparent visible={isVisible}>
        <SafeAreaView style={styles.modalContent} onTouchEnd={handleCloseModal}>
          <View style={styles.optionsContainer}>
            <View style={styles.div}></View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.textOption}>FAQ </Text>
              <Image
                style={styles.icon}
                source={require("../../../assets/question-mark.png")}
              />
            </View>
            <View style={styles.div}></View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            ><TouchableOpacity style={{flex:1, flexDirection: "row", justifyContent: "space-between" }}  onPress={ ()=>logout()}>

              <Text style={styles.textOption}>Log Out </Text>
              <Image
                style={styles.icon}
                source={require("../../../assets/log-out.png")}
                />
                </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  options: {
    width: 50,
    height: 50,
    tintColor: "white",
  },
  options1: {
    position: "absolute",
    left: 320,
    bottom: 150,
  },
  modalContent: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "flex-end",
    flexDirection: "column",
  },
  textOption: {
    color: "white",
    fontSize: 18,
  },
  optionsContainer: {
    backgroundColor: "gray",
    width: 160,
    paddingTop: 5,
    paddingLeft: 5,
    paddingBottom: 5,
    paddingTop: 5,
    marginRight: 45,
    marginTop: 45,
    borderWidth: 1,
    flexDirection: "column",
  },
  icon: {
    width: 25,
    height: 25,
  },
  div: {
    height: 1,
    backgroundColor: "#2121",
    marginRight: 4,
  },
});

export default Options;
