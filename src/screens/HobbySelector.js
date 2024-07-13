import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from "react-native";
import HobbyCards from "../components/HobbyCards/HobbyCards";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAllHobbies, updateUser } from "../helpers/petitions";
import { Context } from "../contexts/Context";

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

const HobbySelector = ({ navigation }) => {
    const { user, updateHobbies } = useContext(Context);

    const [hobbies, setHobbies] = useState([]);
    const [originalHobbies, setOriginalHobbies] = useState([]);
    const [searched, setSearched] = useState("");
    const [isLimited, setIsLimited] = useState(false);
    const [canProceed, setCanProceed] = useState(false);
    const [selectionData, setSelectionData] = useState([]);

    useEffect(() => {
        const saveSelection = async () => {
            try {
                let hobbiesArray = [];
                if (user.hobbies.length > 0) {
                    hobbiesArray = user.hobbies.map(hobby => hobby.hobbieId);
                    setSelectionData(hobbiesArray);
                    await AsyncStorage.setItem('tempHobbies', JSON.stringify(hobbiesArray));
                } else {
                    await AsyncStorage.setItem('tempHobbies', JSON.stringify([]));
                }
                const selection = await AsyncStorage.getItem('tempHobbies');
                setIsLimited(JSON.parse(selection).length >= 3);
                console.log(`seleccion inicial: ${JSON.stringify(hobbiesArray)}`);
            } catch (error) {
                console.error('Error saving initial hobbies:', error);
            }
        };
    
        saveSelection();
    }, []);
    const handlePressHobby = async (id) => {
        try {
            let newSelection;
            if (selectionData.includes(id)) {
                newSelection = selectionData.filter(hobby => hobby !== id);
            } else if (selectionData.length < 3) {
                newSelection = [...selectionData, id];
            } else {
                newSelection = selectionData;
                showLimitMessage(true);
                console.log("no se pueden elegir mas de 3 hobbies");
            }

            setSelectionData(newSelection);
            await AsyncStorage.setItem('tempHobbies', JSON.stringify(newSelection));
            setIsLimited(newSelection.length >= 3);
            setCanProceed(newSelection.length > 0);
            console.log(newSelection);
        } catch (error) {
            console.error('Error saving hobbies:', error);
        }
    };

    useEffect(() => {
        const handleGetHobbies = async () => {
            try {
                const response = await getAllHobbies();
                setHobbies(response);
                setOriginalHobbies(response);
            } catch (error) {
                console.error('Error handling hobbies:', error);
            }
        };

        handleGetHobbies();
    }, []);

    useEffect(() => {
        const newHobbies = originalHobbies.filter(hobbie => hobbie.name.toLocaleLowerCase().includes(searched.toLowerCase()));
        setHobbies(newHobbies);
    }, [searched]);

    const handleInputChange = (text) => {
        setSearched(text);
    };

    const handleSelectHobbies = async () => {

        const mappedSelectionData = selectionData.map(id => ({ hobbieId: id }));
    
        try {
            if (mappedSelectionData.length > 0) {
                const userNewHobbies = { ...user, hobbies: mappedSelectionData };
                console.log('el usuario con hobbies actualizados es ', userNewHobbies);
                const update = await updateUser(userNewHobbies);
                if (update === 200) {
                    await updateHobbies(userNewHobbies);
                    await AsyncStorage.removeItem('tempHobbies');
                    navigation.push("MainFeed");
                }
            }
        } catch (error) {
            console.error('Error handling confirmation:', error);
        }
    }

    const buttonStyle = {
        ...styles.button,
        backgroundColor: canProceed ? 'white' : 'gray',
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={[styles.text, styles.title]}>Choose Your Hobbies!</Text>
                <Text style={styles.subtitile}>You can select up to three hobbies. </Text>
                <Text style={styles.text}>
                    Would you like to choose more? {" "}
                    <TouchableOpacity onPress={() => navigation.push("SubscriptionScreen")}>
                        <Text style={styles.linkText}>Upgrade to our premium plan here</Text>
                    </TouchableOpacity>
                </Text>
                <TextInput
                    style={styles.input}
                    value={searched}
                    onChangeText={handleInputChange}
                    placeholder="Search your hobby..."
                />
                {isLimited && <Text style={styles.limitMessage}>You've reached your hobbies limit</Text>}
            </View>
            <ScrollView>
                {hobbies.length > 0 ? (
                    <View style={styles.cardsContainer}>
                        {hobbies.map(hobby => (
                            <HobbyCards
                                key={hobby.hobbieId}
                                {...hobby}
                                onPress={() => handlePressHobby(hobby.hobbieId)}
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
                <TouchableOpacity
                    style={buttonStyle}
                    onPress={() => handleSelectHobbies()}
                    disabled={!canProceed}
                >
                    <Text style={styles.text}>Go to Feed</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1D1E2C',
        flex: 1
    },
    header: {
        paddingTop: 60,
        paddingBottom: 30,
        paddingHorizontal: 20,
        backgroundColor: '#7E78D2',
        borderRadius: 20
    },
    buttonContainer: {
        paddingTop: 40,
        paddingBottom: 30,
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
        fontSize: 17,
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
});

export default HobbySelector;
