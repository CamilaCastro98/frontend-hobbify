
import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from 'react';
import * as Network from 'expo-network';
import React from "react";
import Contador from "../components/Contador";

const HomeScreen = () => {
  const [ipAddress, setIpAddress] = useState('');

  useEffect(() => {
    const getIpAddress = async () => {
      const ip = await Network.getIpAddressAsync();
      console.log("Obtenida IP:", ip);
      setIpAddress(ip);
    };

    getIpAddress();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{ color: "black" }}>
        La IP es: {ipAddress}
      </Text>
      <Contador />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
