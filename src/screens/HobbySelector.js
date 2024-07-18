import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
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
    const { user, updateHobbies,token, isPremium } = useContext(Context);

    const [hobbies, setHobbies] = useState([]);
    const [originalHobbies, setOriginalHobbies] = useState([]);
    const [searched, setSearched] = useState("");
    const [isLimited, setIsLimited] = useState(false);
    const [canProceed, setCanProceed] = useState(false);
    const [selectionData, setSelectionData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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
                setIsLimited(JSON.parse(selection).length >= 3 && !isPremium);
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
            } else if (selectionData.length < 3 || isPremium) {
                newSelection = [...selectionData, id];
            } else {
                newSelection = selectionData;
                showLimitMessage(true);
                console.log("no se pueden elegir mas de 3 hobbies");
            }

            setSelectionData(newSelection);
            await AsyncStorage.setItem('tempHobbies', JSON.stringify(newSelection));
            setIsLimited(newSelection.length >= 3 && !isPremium);
            setCanProceed(newSelection.length > 0);
            console.log(newSelection);
        } catch (error) {
            console.error('Error saving hobbies:', error);
        }
    };

    useEffect(() => {
        const handleGetHobbies = async () => {
            try {
                const allHobbies = await getAllHobbies();
                const acceptedHobbies = allHobbies.filter(hobby => hobby.state === "approved")
                // const acceptedHobbies = allHobbies
                setHobbies(acceptedHobbies);
                setOriginalHobbies(acceptedHobbies);
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
        setIsLoading(true);
        const mappedSelectionData = originalHobbies.filter(hobby => (selectionData.includes(hobby.hobbieId)));
    
        try {
            if (mappedSelectionData.length > 0) {
                const userNewHobbies = { ...user, hobbies: mappedSelectionData };
                console.log('el usuario con hobbies actualizados es ', userNewHobbies);
                const update = await updateUser(userNewHobbies,token);
                if (update === 200) {
                    await updateHobbies(userNewHobbies);
                    await AsyncStorage.removeItem('tempHobbies');
                    navigation.push("QuestionScreen");
                }
            }
        } catch (error) {
            console.error('Error handling confirmation:', error);
        } finally {
            setIsLoading(false);
          }
    }

    const buttonStyle = {
        ...styles.button,
        borderColor: canProceed ? 'white' : '#151515',
    };

    const buttonTextStyle = {
        ...styles.buttonText,
        color: canProceed ? 'white' : '#151515',
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={[styles.text, styles.title]}>Hi, <Text style={styles.user}>{user.username}</Text></Text>
                <Text style={[styles.text, styles.title]}>Choose Your Hobbies!</Text>
                <Text style={styles.subtitile}>You can select up to three hobbies. </Text>
                <TextInput
                    style={styles.input}
                    value={searched}
                    onChangeText={handleInputChange}
                    placeholder="Search hobby here..."
                />
                {isLimited && !isPremium && ( <View style={styles.limitMessageContainer}>
                                     <Text style={styles.text}>
                                     You've selected the maximum number of hobbies for the free plan.
                                    </Text>
                                    <Text style={styles.text}>
                                    Want to add more?{" "}
                                    <TouchableOpacity onPress={() => navigation.push("SubscriptionScreen")}>
                                    <Text style={styles.linkText}>Upgrade here</Text>
                                    </TouchableOpacity>
                                    </Text>
                                </View>) }
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
                            <Text style={styles.textCreate}>Create Hobby</Text>
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
                   {isLoading ?  <ActivityIndicator size="small" color="white" /> : <Text style={buttonTextStyle}>Next</Text>}
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#151515',
        flex: 1
    },
    header: {
        paddingTop: 80,
        paddingBottom: 30,
        paddingHorizontal: 20,
        backgroundColor: '#151515'
    },
    buttonContainer: {
        paddingTop: 25,
        paddingBottom: 30,
        backgroundColor: '#151515',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    title: {
        fontSize: 30,
        alignSelf: 'center',
        marginBottom: 10,
        fontWeight: '300'
    },
    subtitile: {
        fontSize: 20,
        marginBottom: 10,
        alignSelf: 'center',
        color: 'white',
        fontWeight: '200'
    },
    user: {
        color: '#7E78D2'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 15,
        marginTop: 10,
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 10,
        fontSize:20,
        marginBottom:10
    },
    cardsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
    button: {
        borderRadius: 10,
        borderWidth:2,
        padding: 15,
        width: '80%',
        marginBottom:20
    },
    linkText: {
        textDecorationLine: 'underline',
        color: 'white',
        fontSize:16
    },
    text: {
        alignSelf: 'center',
        color: 'white',
        fontSize:16,
        fontWeight: '300'
    },
    textCreate: {
        alignSelf: 'center',
        color: 'white',
        fontSize:20,
    },
    buttonText: {
        alignSelf: 'center',
        fontSize:20
    },
    limitMessage: {
        alignSelf: 'center',
        marginTop: 8,
        color: 'firebrick',
        fontSize:20
    },
    noResultsText: {
        alignSelf: 'center',
        margin: 30,
        fontSize: 15,
        color: 'white',
        fontWeight:'300'
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
