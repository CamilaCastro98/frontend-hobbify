import { StatusBar } from "expo-status-bar";
import { Button, TextInput,View, Text, StyleSheet,ScrollView,TouchableOpacity } from "react-native";
import { Formik } from 'formik';
import validationRegister from "../helpers/validationRegister";
import { registerUser } from "../helpers/petitions";
import { Context } from "../contexts/Context";
import { useContext } from "react";
import React from "react";

const Register = ({ navigation }) => {

    const { login } = useContext(Context)

    const handleRegister = async (values) => {
        values.phone = values.phone ? parseInt(values.phone) : 0
        try {
           await registerUser(values,login,navigation)
        } catch (error) {
            console.error("Error trying to register:", error);
        }
    }

    return (
        <View style={styles.gral}>
        <View style={styles.container}>
            <Formik
     initialValues={{ email: '',
     username: '',
     password:'',
     confirmPassword: '',
     country: '',
     city: '',
     phone: ''
    }}
     validate={validationRegister}
     onSubmit={handleRegister}
   >
     {({ handleChange, handleBlur, handleSubmit, values,errors, touched }) => (
        <ScrollView>

       <View style={styles.form}>
        <Text style={[styles.text, styles.title]}>Register</Text>
        <Text style={[styles.text, styles.description]}>Join now and start sharing your passions</Text>
        <Text style={styles.asterisk}>* Required fields</Text>
            <View style={styles.formSection}>
                <Text style={styles.text}>Username {" "}
                    <Text style={styles.asterisk}>*</Text>
                </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    placeholder="your.username33"
                    value={values.username}
                    placeholderTextColor="gray"
                />
                {touched.username && errors.username && <Text style={styles.error}>{errors.username}</Text>}
            </View>
            <View style={styles.formSection}>
                <Text style={styles.text}>Email {" "}
                    <Text style={styles.asterisk}>*</Text>
                </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    placeholder="mail@example.com"
                    value={values.email}
                    placeholderTextColor="gray"
                />
                {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}
            </View>
            <View style={styles.formSection}>   
                <Text style={styles.text}>Password {" "}
                    <Text style={styles.asterisk}>*</Text>
                </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    placeholder="***********"
                    secureTextEntry={true}
                    placeholderTextColor="gray"
                />
                {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}
            </View>
            <View style={styles.formSection}>
                <Text style={styles.text}>Confirm password {" "}
                    <Text style={styles.asterisk}>*</Text>
                </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    value={values.confirmPassword}
                    placeholder="***********"
                    secureTextEntry={true}
                    placeholderTextColor="gray"
                />
                {touched.confirmPassword && errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword}</Text>}
            </View>
            <View style={styles.formSection}>
                <Text style={styles.text}>Country</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={handleChange('country')}
                    onBlur={handleBlur('country')}
                    placeholder="Your country"
                    value={values.country}
                    placeholderTextColor="gray"
                />
                {touched.country && errors.country && <Text style={styles.error}>{errors.country}</Text>}
            </View>
            <View style={styles.formSection}>
                <Text style={styles.text}>City</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={handleChange('city')}
                    onBlur={handleBlur('city')}
                    placeholder="Your city"
                    value={values.city}
                    placeholderTextColor="gray"
                />
                {touched.city && errors.city && <Text style={styles.error}>{errors.city}</Text>}
            </View>
            <View style={styles.formSection}>
                <Text style={styles.text}>Phone</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={handleChange('phone')}
                    keyboardType="numeric"
                    onBlur={handleBlur('phone')}
                    placeholder="123456789"
                    value={values.phone}
                    placeholderTextColor="gray"
                />
                {touched.phone && errors.phone && <Text style={styles.error}>{errors.phone}</Text>}
            </View>
            
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            <Text style={styles.loginText}>
                    Already have an account? {" "}
                        <TouchableOpacity onPress={() => navigation.push("Login")}>
                            <Text style={styles.linkText}>Login here</Text>
                        </TouchableOpacity>
                            </Text>
       </View>
        </ScrollView>
     )}
   </Formik>
        </View>
        </View>
    )
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
        borderRadius: 10
    },
    buttonText: {
        color: 'white',
        alignSelf: 'center',
        padding: 12,
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
    }
})

export default Register;