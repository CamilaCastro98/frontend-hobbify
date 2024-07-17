import { View, Text, StyleSheet,TouchableOpacity } from "react-native";
import { useState,useEffect,useContext } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Context } from "../../contexts/Context";

const HobbyCards = ({emoji,name,hobbieId,onPress,disable}) => {

    const { user } = useContext(Context);

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
                console.log('Error setting selections:', error)
            }
        };

        getSelection()

    },[user])


    const cardStyle = {
        ...styles.cardContainer,
        backgroundColor: isPressed ? '#7E78D2' : 'white',
    }

    return(
        <TouchableOpacity style={cardStyle} onPress={handlePress} disabled={disable && !isPressed}>
                <Text style={styles.emoji}>{emoji}</Text>
                <Text style={styles.text}>{name}</Text>
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
    text: {
        fontSize:16
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