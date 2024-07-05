import { Button, TextInput,View, Text, StyleSheet,ScrollView,TouchableOpacity } from "react-native";
import { useState,useEffect } from "react";
import HobbyCards from "../components/HobbyCards/HobbyCards";
import AsyncStorage from '@react-native-async-storage/async-storage';

const tempHobbies = [
    {
        id: 1,
        emoji: '⚽️',
        name: 'Football'
    },
    {
        id: 2,
        emoji: '🎸',
        name: 'Playing Guitar'
    },
    {
        id: 3,
        emoji: '📚',
        name: 'Reading Books'
    },
    {
        id: 4,
        emoji: '🎮',
        name: 'Gaming'
    },
    {
        id: 5,
        emoji: '🍳',
        name: 'Cooking'
    },
    {
        id: 6,
        emoji: '🎨',
        name: 'Painting'
    },
    {
        id: 7,
        emoji: '🎣',
        name: 'Fishing'
    },
    {
        id: 8,
        emoji: '🎤',
        name: 'Singing'
    },
    {
        id: 9,
        emoji: '🏋️‍♂️',
        name: 'Weightlifting'
    },
    {
        id: 10,
        emoji: '🚴‍♂️',
        name: 'Cycling'
    }
]


const HobbySelector = ({navigation}) => {

    const [hobbies,setHobbies] = useState(tempHobbies)
    const [searched,setSearched] = useState("")
    const [isLimited,setIsLimited] = useState(false)
    const [canProceed, setCanProceed] = useState(false)
    const [selectionData,setSelectionData] = useState([])

    useEffect(() => {

        const saveSelection = async () => {
            try {
                const selectionDataString = await AsyncStorage.getItem('hobbies')
                if (selectionDataString) {
                    setSelectionData(JSON.parse(selectionDataString));
                } else {
                    await AsyncStorage.setItem('hobbies', JSON.stringify([]))
                }
                setSelectionData(JSON.parse(selectionDataString));
                    setIsLimited(JSON.parse(selectionDataString).length >= 3)
                console.log(`seleccion inicial: ${selectionData}`)
            } catch (error) {
                console.error('Error saving initial hobbies:', error)
            }
        };

        saveSelection()
    }, [])

    const handlePressHobby = async(name) => {
        try {
            let newSelection
            if (selectionData.includes(name)) {
                newSelection = selectionData.filter(hobby => hobby !== name);
            } else if(selectionData.length < 3) {
                newSelection = [...selectionData, name]
            } else {
                newSelection = selectionData
                showLimitMessage(true)
                console.log("no se pueden elegir mas de 3 hobbies")
            }

            setSelectionData(newSelection);
            await AsyncStorage.setItem('hobbies', JSON.stringify(newSelection))
            setIsLimited(newSelection.length >= 3)
            setCanProceed(newSelection.length > 0)
            console.log(newSelection)
        } catch (error) {
            console.error('Error saving hobbies:', error)
        }
    }

    useEffect(() => {
        const newHobbies = tempHobbies.filter(hobbie => hobbie.name.toLocaleLowerCase().includes(searched.toLowerCase()))
        setHobbies(newHobbies)
    }, [searched])

    const handleInputChange = (text) => {
        setSearched(text)
    }

    const handleSelectHobbies = () => {
       navigation.push("MainFeed")
    }

    const buttonStyle = {
        ...styles.button,
        backgroundColor: canProceed ? 'white' : 'gray',
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={[styles.text,styles.title]}>Choose Your Hobbies!</Text>
                <Text style={styles.subtitile}>You can select up to three hobbies. </Text>
                <Text style={styles.text}>
                Would you like to choose more? {" "}
                        <TouchableOpacity onPress={() => navigation.push("SubscriptionScreen")}>
                            <Text style={styles.linkText}>Upgrade to our premium plan here</Text>
                        </TouchableOpacity>
                </Text>
                <TextInput style={styles.input}
                value={searched}
                onChangeText={handleInputChange} 
                placeholder="Search your hobby..."></TextInput>
                {isLimited && <Text style={styles.limitMessage}>You've reached your hobbies limit</Text>}
            </View>
            <ScrollView>
            {hobbies.length > 0 ? (
                    <View style={styles.cardsContainer}>
                        {hobbies.map(hobby => (
                            <HobbyCards
                                key={hobby.id}
                                {...hobby}
                                onPress={() => handlePressHobby(hobby.name)}
                                disable={isLimited}
                            />
                        ))}
                    </View>
                ) : (
                    <View style={styles.noResults}>
                        <Text style={styles.noResultsText}>
                            No hobbies found matching "{searched}". Please try a different search term.
                        </Text>
                        <Text style={styles.noResultsText}>
                            Can't find your hobby?
                        </Text>
                        <TouchableOpacity style={styles.noResultsButton} onPress={() => navigation.push("CreateHobby")}>
                            <Text style={styles.text}>Create Hobby</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={buttonStyle} onPress={() => handleSelectHobbies()} disabled={!canProceed}>
                        <Text style={styles.text}>Go to Feed</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1D1E2C',
        flex:1
    },
    header: {
        paddingTop: 60,
        paddingBottom:30,
        paddingHorizontal:20,
        backgroundColor: '#7E78D2',
        borderRadius: 20
    },
    buttonContainer: {
        paddingTop:40,
        paddingBottom:30,
        backgroundColor: '#7E78D2',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    title: {
        fontSize: 25,
        alignSelf: 'center',
        marginBottom: 10
    },
    subtitile: {
        fontSize:17,
        marginBottom: 5,
        alignSelf: 'center'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 15,
        marginTop: 10,
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 10
    },
    cardsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
    button: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        width: '50%'
    },
    linkText: {
        textDecorationLine: 'underline',
        color: 'white'
    },
    text: {
        alignSelf: 'center'
    },
    limitMessage: {
        alignSelf: 'center', 
        marginTop: 8,
        color: 'darkred'
    },
    noResultsText: {
        alignSelf: 'center',
        margin: 30,
        fontSize: 15,
        color: 'white'
    },
    noResults: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    noResultsButton: {
        backgroundColor: '#7E78D2',
        borderRadius: 10,
        padding: 15,
        width: '50%'
    }
})

export default HobbySelector