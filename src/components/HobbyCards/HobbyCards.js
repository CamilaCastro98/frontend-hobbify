import { View, Text, StyleSheet,TouchableOpacity } from "react-native";
import { useState,useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const HobbyCards = ({emoji,name,hobbieId,onPress,disable}) => {

    const [isPressed, setIsPressed] = useState(false);

    const handlePress = () => {
        setIsPressed(!isPressed);
        onPress()

    }

    useEffect(()=>{

        const getSelection = async () => {
            try {
                const selectionDataString = await AsyncStorage.getItem('tempHobbies')
                const selectionData = JSON.parse(selectionDataString)
                if (selectionData.includes(hobbieId)) {
                    setIsPressed(true)
                } else {
                    setIsPressed(false)
                }

            } catch (error) {
                console.error('Error setting selections:', error)
            }
        };

        getSelection()

    },[])


    const cardStyle = {
        ...styles.cardContainer,
        backgroundColor: isPressed ? '#7E78D2' : 'white',
    }

    return(
        <TouchableOpacity style={cardStyle} onPress={handlePress} disabled={disable && !isPressed}>
                <Text style={styles.emoji}>{emoji}</Text>
                <Text>{name}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        borderRadius: 10,
        borderWidth: 5,
        margin: 10,
        padding: 10,
        width: 150,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    emoji: {
        alignSelf: 'center',
        fontSize: 40
    },
    pressed: {
        backgroundColor: 'green'
    }
})

export default HobbyCards