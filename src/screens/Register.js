import { StatusBar } from "expo-status-bar";
import { Button, TextInput, View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { Formik, useFormik } from 'formik'; // Importa useFormik de Formik
import validationRegister from "../helpers/validationRegister";
import { registerUser } from "../helpers/petitions";
import { Context } from "../contexts/Context";
import { useContext, useState, useEffect } from "react";
import RNPickerSelect from 'react-native-picker-select';
import React from "react";
import { countries } from "../helpers/countriesArray";

const Register = ({ navigation }) => {
    const { login } = useContext(Context);
    const [errorSubmiting, setErrorSubmiting] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [countriesReg, setCountriesReg] = useState([]);

    const formik = useFormik({ // Utiliza useFormik para gestionar el formulario
        initialValues: {
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
            country: '',
            city: '',
            phone: ''
        },
        validate: validationRegister,
        onSubmit: async (values) => {
            setIsLoading(true);
            values.phone = values.phone ? parseInt(values.phone) : 0;
            try {
                const response = await registerUser(values, login, navigation);
                console.log(`response es ${response}`);
                if (response === 'The email you provided is already in use') {
                    setErrorSubmiting(response);
                }
            } catch (error) {
                console.error("Error trying to register:", error);
                setErrorSubmiting("Your data couldn't be sent");
            } finally {
                setIsLoading(false);
            }
        },
    });

    useEffect(() => {
        const mappedCountries = countries.map(country => ({
            label: country.name,
            value: country.name
        }));

        setCountriesReg(mappedCountries);
    }, []);

    return (
        <View style={styles.gral}>
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.form}>
                        <Text style={[styles.text, styles.title]}>Register</Text>
                        <Text style={[styles.text, styles.description]}>Join now and start sharing your passions</Text>
                        <Text style={styles.asterisk}>* Required fields</Text>
                        {errorSubmiting && <View style={styles.errorView}><Text style={styles.errorText}>{errorSubmiting}</Text></View>}
                        <View style={styles.formSection}>
                            <Text style={styles.text}>Username {" "}
                                <Text style={styles.asterisk}>*</Text>
                            </Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={formik.handleChange('username')}
                                onBlur={formik.handleBlur('username')}
                                placeholder="your.username33"
                                value={formik.values.username}
                                placeholderTextColor="gray"
                            />
                            {formik.touched.username && formik.errors.username && <Text style={styles.error}>{formik.errors.username}</Text>}
                        </View>
                        <View style={styles.formSection}>
                            <Text style={styles.text}>Email {" "}
                                <Text style={styles.asterisk}>*</Text>
                            </Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={formik.handleChange('email')}
                                onBlur={formik.handleBlur('email')}
                                placeholder="mail@example.com"
                                value={formik.values.email}
                                placeholderTextColor="gray"
                            />
                            {formik.touched.email && formik.errors.email && <Text style={styles.error}>{formik.errors.email}</Text>}
                        </View>
                        <View style={styles.formSection}>
                            <Text style={styles.text}>Password {" "}
                                <Text style={styles.asterisk}>*</Text>
                            </Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={formik.handleChange('password')}
                                onBlur={formik.handleBlur('password')}
                                value={formik.values.password}
                                placeholder="***********"
                                secureTextEntry={true}
                                placeholderTextColor="gray"
                            />
                            {formik.touched.password && formik.errors.password && <Text style={styles.error}>{formik.errors.password}</Text>}
                        </View>
                        <View style={styles.formSection}>
                            <Text style={styles.text}>Confirm password {" "}
                                <Text style={styles.asterisk}>*</Text>
                            </Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={formik.handleChange('confirmPassword')}
                                onBlur={formik.handleBlur('confirmPassword')}
                                value={formik.values.confirmPassword}
                                placeholder="***********"
                                secureTextEntry={true}
                                placeholderTextColor="gray"
                            />
                            {formik.touched.confirmPassword && formik.errors.confirmPassword && <Text style={styles.error}>{formik.errors.confirmPassword}</Text>}
                        </View>
                        <View style={styles.formSection}>
                            <Text style={styles.text}>Country</Text>
                            <RNPickerSelect
                                style={ { inputIOS: {
                                    borderWidth: 1,
                                    borderColor: 'white',
                                    padding: 15,
                                    marginTop: 10,
                                    color: 'white',
                                    backgroundColor: '#151515',
                                    borderRadius: 10,
                                    fontSize: 20
                                },
                                inputAndroid: {
                                    borderWidth: 1,
                                    borderColor: 'white',
                                    padding: 15,
                                    marginTop: 10,
                                    color: 'white',
                                    backgroundColor: '#151515',
                                    borderRadius: 10,
                                    fontSize: 20
                                }}}
                                items={countriesReg}
                                onValueChange={(value) => formik.setFieldValue('country', value)}
                                value={formik.values.country}
                                placeholder={{ label: "Select an option...", value: null }}
                                placeholderTextColor="gray"
                                useNativeAndroidPickerStyle={false} 
                            />
                            {formik.touched.country && formik.errors.country && <Text style={styles.error}>{formik.errors.country}</Text>}
                        </View>
                        <View style={styles.formSection}>
                            <Text style={styles.text}>City</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={formik.handleChange('city')}
                                onBlur={formik.handleBlur('city')}
                                placeholder="Your city"
                                value={formik.values.city}
                                placeholderTextColor="gray"
                            />
                            {formik.touched.city && formik.errors.city && <Text style={styles.error}>{formik.errors.city}</Text>}
                        </View>
                        <View style={styles.formSection}>
                            <Text style={styles.text}>Phone</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={formik.handleChange('phone')}
                                keyboardType="numeric"
                                onBlur={formik.handleBlur('phone')}
                                placeholder="123456789"
                                value={formik.values.phone}
                                placeholderTextColor="gray"
                            />
                            {formik.touched.phone && formik.errors.phone && <Text style={styles.error}>{formik.errors.phone}</Text>}
                        </View>

                        <TouchableOpacity style={styles.button} onPress={formik.handleSubmit}>
                            {isLoading ? <ActivityIndicator size="small" color="white" /> : <Text style={styles.buttonText}>Submit</Text>}
                        </TouchableOpacity>
                        <Text style={styles.loginText}>
                            Already have an account? {" "}
                            <TouchableOpacity onPress={() => navigation.push("Login")}>
                                <Text style={styles.linkText}>Login here</Text>
                            </TouchableOpacity>
                        </Text>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    gral: {
        backgroundColor: '#1b1b1b',
        width: '100%',
        height: '100%'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingTop: 65,
        paddingBottom:90,
        backgroundColor: '#151515',
        marginVertical:80,
        marginHorizontal:20,
        borderRadius: 40,
    },
    form: {
        flex: 1,
        width: "100%",
    },
    formSection: {
        marginTop:30
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
    text: {
        color: 'white',
        fontSize: 18
    },
    title: {
        alignSelf: 'center',
        fontSize:25,
        marginBottom:6,
        fontWeight: 300
    },
    description: {
        alignSelf: 'center',
        fontSize:19,
        fontWeight: 200,
        marginBottom: 10
    },
    button: {
        backgroundColor: '#7E78D2',
        marginTop:60,
        borderRadius: 10,
        padding: 12,
    },
    buttonText: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 20,
    },
    linkText: {
        textDecorationLine: 'underline',
        fontSize:15,
        color: 'white',
        fontWeight: '400'
    },
    error: {
        color: 'red'
    },
    asterisk: {
        color: 'red',
        fontStyle: 'italic'
    },
    loginText: {
        color: 'white',
        fontSize: 15,
        fontWeight: '300',
        marginTop: 5
    },
    errorView: {
        marginVertical:8,
        backgroundColor: '#DC143C',
        padding: 5,
        borderRadius: 5
    },
    errorText: {
        color: 'white',
        alignSelf: 'center'
    }
})

export default Register;