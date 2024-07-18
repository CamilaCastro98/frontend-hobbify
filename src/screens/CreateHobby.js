import { TextInput, View, Text, StyleSheet, ScrollView, TouchableOpacity,ActivityIndicator } from "react-native";
import { useState } from "react";
import validationCreateHobby from "../helpers/validationCreateHobby";
import { Formik } from 'formik';
import { sendToAdmin } from "../helpers/petitions";
import { Ionicons } from '@expo/vector-icons';

const CreateHobby = ({ navigation }) => {

    const [errorSubmiting, setErrorSubmiting] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSendAdmin = async (values) => {
        setIsLoading(true);
        try {
            const response = await sendToAdmin(values);
            console.log('response.data es', response);
            if (response.status === 200 || response.status === 201) {
                navigation.push("SubmitedHobby");
            }
        } catch (error) {

            if (error.message.includes(400)) {
                setErrorSubmiting("This hobby already exists");
            } else {
                setErrorSubmiting("Your data couldn't be sent");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
            <View style={styles.iconTitle}>
                <Ionicons style={styles.icon} name="chevron-back" size={32} color="#7E78D2" onPress={()=>navigation.goBack()}/>
                <Text style={styles.title}>Create Your Hobby!</Text>
            </View>
                <Text style={styles.subtitle}>Enter the name of your hobby and a descriptive emoji.</Text>
            </View>
            <ScrollView>
                <Formik
                    initialValues={{ name: '', emoji: ''}}
                    validate={validationCreateHobby}
                    onSubmit={handleSendAdmin}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <>
                            <ScrollView>
                                <View>
                                    {errorSubmiting && <View style={styles.errorView}><Text style={styles.errorText}>{errorSubmiting}</Text></View>}
                                    <View style={styles.formSection}>
                                        <Text style={styles.text}>Hobby Name</Text>
                                        <TextInput
                                            style={styles.input}
                                            onChangeText={handleChange('name')}
                                            onBlur={handleBlur('name')}
                                            placeholder="Programming"
                                            value={values.name}
                                            onFocus={() => setErrorSubmiting("")}
                                            placeholderTextColor="gray"
                                        />
                                        {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}
                                    </View>
                                    <View style={styles.formSection}>
                                        <Text style={styles.text}>Emoji</Text>
                                        <TextInput
                                            style={styles.input}
                                            onChangeText={handleChange('emoji')}
                                            onBlur={handleBlur('emoji')}
                                            value={values.emoji}
                                            placeholder="🖥️"
                                            onFocus={() => setErrorSubmiting("")}
                                            placeholderTextColor="gray"
                                        />
                                        {touched.emoji && errors.emoji && <Text style={styles.error}>{errors.emoji}</Text>}
                                    </View>

                                </View>
                            </ScrollView>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                                   { isLoading ? <ActivityIndicator size="small" color="white" /> : <Text style={styles.textButton}>Submit Hobby</Text>}
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                </Formik>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({

    iconTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20
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
        fontSize: 20
    },
    textArea: {
        height: 150
    }
})

export default CreateHobby