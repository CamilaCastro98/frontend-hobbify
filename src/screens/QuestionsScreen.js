import { TextInput, View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native";
import { useState, useContext } from "react";
import { Context } from "../contexts/Context";
import { Formik } from 'formik';
import { sendToAdmin, updateUser } from "../helpers/petitions";
import { Ionicons } from '@expo/vector-icons';

const QuestionScreen = ({ navigation }) => {

    const [errorSubmiting, setErrorSubmiting] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { token, updateHobbies, user } = useContext(Context);

    const handleUpdate = async (values) => {
        console.log(`values son: ${JSON.stringify(values)}`)
        const { mate, intensity, bio } = values;
        console.log(`${mate}, ${intensity} y ${bio}`) 
        setIsLoading(true);
        const newUser = {
            ...user,
            idealMate: mate,
            hobbyIntensity: intensity,
            biography: bio,
        };
        console.log(`EL NEW USER QUE SE VA A ENVIAR ES ${JSON.stringify(newUser)}`)
        try {
            const response = await updateUser(newUser, token);
            console.log('response.data es', response);
            if (response === 200 || response === 201) {
                console.log(`el nuevo user es: ${JSON.stringify(newUser)}`)
                updateHobbies(newUser)
                navigation.push("MainFeed");
            }
        } catch (error) {
            setErrorSubmiting("Your data couldn't be sent");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.iconTitle}>
                    <Text style={styles.title}>Tell us About Yourself</Text>
                </View>
                <Text style={styles.subtitle}>Answer some questions so everyone can know you better. This step is not mandatory.</Text>
            </View>
            <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={30} 
          >
            <ScrollView>
                <Formik
                    initialValues={{ mate: '', intensity: '', bio: '' }}
                    onSubmit={handleUpdate}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <>
                            <ScrollView>
                                <View>
                                    {errorSubmiting && <View style={styles.errorView}><Text style={styles.errorText}>{errorSubmiting}</Text></View>}
                                    <View style={styles.formSection}>
                                        <Text style={styles.text}>What would your ideal mate be like on hobbify?</Text>
                                        <TextInput
                                            style={styles.input}
                                            onChangeText={handleChange('mate')}
                                            onBlur={handleBlur('mate')}
                                            placeholder="I would like to find someone nice and..."
                                            value={values.mate}
                                            onFocus={() => setErrorSubmiting("")}
                                            placeholderTextColor="gray"
                                            multiline={true}
                                            numberOfLines={4}
                                        />
                                    </View>
                                    <View style={styles.formSection}>
                                        <Text style={styles.text}>How committed are you to your hobbies?</Text>
                                        <TextInput
                                            style={styles.input}
                                            onChangeText={handleChange('intensity')}
                                            onBlur={handleBlur('intensity')}
                                            value={values.intensity}
                                            placeholder="I practice my hobbies all weekends and..."
                                            onFocus={() => setErrorSubmiting("")}
                                            placeholderTextColor="gray"
                                            multiline={true}
                                        />
                                    </View>
                                    <View style={styles.formSection}>
                                        <Text style={styles.text}>Tell us a bit more about yourself</Text>
                                        <TextInput
                                            style={styles.input}
                                            onChangeText={handleChange('bio')}
                                            onBlur={handleBlur('bio')}
                                            value={values.bio}
                                            placeholder="Write something interesting about you..."
                                            onFocus={() => setErrorSubmiting("")}
                                            placeholderTextColor="gray"
                                            multiline={true}
                                            numberOfLines={4}
                                        />
                                    </View>
                                </View>
                            </ScrollView>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                                   { isLoading ? <ActivityIndicator size="small" color="white" /> : <Text style={styles.textButton}>Next</Text>}
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                </Formik>
            </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({

    iconTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 7
    },
    container: {
        backgroundColor: '#151515',
        flex:1
    },
    header: {
        paddingTop: 60,
        paddingBottom:30,
        paddingHorizontal:20,
        backgroundColor: '#151515',
        borderRadius: 20
    },
    buttonContainer: {
        paddingTop:40,
        paddingBottom:30,
        borderRadius: 10,
        flexDirection: 'column',
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#7E78D2',
        borderRadius: 10,
        padding: 20,
        width: '80%'
    },
    textButton: {
        alignSelf: 'center',
        fontSize: 20,
        color: 'white',
        fontWeight:'400'
    },
    title: {
        fontSize: 30,
        alignSelf: 'center',
        marginBottom: 10,
        marginTop:10,
        color: 'white',
        fontWeight: '300'
    },
    subtitle: {
        fontSize:20,
        alignSelf: 'center',
        color: 'white',
        fontWeight: '200'
    },
    text: {
       color: 'white',
       fontSize:18
    },
    errorView: {
        marginVertical:8,
        backgroundColor: '#DC143C',
        padding: 5,
        borderRadius: 5,
        width:'80%',
        alignSelf: 'center'
    },
    errorText: {
        color: 'white',
        alignSelf: 'center'
    },
    error: {
        color: 'red'
    },
    formSection: {
        marginTop:30,
        paddingHorizontal:40
    },
    input: {
        borderWidth: 1,
        borderColor: 'white',
        padding: 15,
        marginTop: 10,
        color: 'white',
        backgroundColor: '#151515',
        borderRadius: 10,
        fontSize: 15
    },
    textArea: {
        height: 150
    }
})

export default QuestionScreen