import { Button, TextInput, View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import { Formik } from 'formik';
import { AntDesign } from '@expo/vector-icons';
import validationLogin from "../helpers/validationLogin";
import React, { useState,useContext } from "react";
import { loginUser, loginUserWithProvider } from "../helpers/petitions";
import { Context } from "../contexts/Context";
import loginWithAuth0 from "../helpers/authLogin";

const Login = ({ navigation }) => {

  const { login } = useContext(Context)

  const [errorSubmiting, setErrorSubmiting] = useState("")

  const handleLogin = async (values) => {
    try {
      await loginUser(values,login,navigation)
    } catch (error) {
      console.error("Error trying to login:", error)
      setErrorSubmiting("The data you entered is incorrect")
    }
  }

  const handleAuth0 = async (provider) => {
    try {
      await loginWithAuth0(provider);
    } catch (error) {
      console.error("Error trying to login with ayth0:", error);
    }
  }

  return (
    <View style={styles.gral}>
      <View style={styles.container}>
        <Formik
          initialValues={{ email: '', password: '' }}
          validate={validationLogin}
          onSubmit={handleLogin}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <ScrollView>
              <View style={styles.form}>
                <Text style={[styles.text, styles.title]}>Welcome Back!</Text>
                <Text style={[styles.text, styles.description]}>Log in and keep having fun with your passions</Text>
                {errorSubmiting && <View style={styles.errorView}><Text style={styles.errorText}>{errorSubmiting}</Text></View>}
                <View style={styles.formSection}>
                  <Text style={styles.text}>Email</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    placeholder="mail@example.com"
                    value={values.email}
                    onFocus={() => setErrorSubmiting("")}
                  />
                  {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}
                </View>
                <View style={styles.formSection}>
                  <Text style={styles.text}>Password</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    placeholder="***********"
                    secureTextEntry={true}
                    onFocus={() => setErrorSubmiting("")}
                  />
                  {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}
                </View>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
                <Text style={styles.text}>
                  Not a member yet? {" "}
                  <TouchableOpacity onPress={() => navigation.push("Register")}>
                    <Text style={styles.linkText}>Register here</Text>
                  </TouchableOpacity>
                </Text>
                <View style={styles.rrssContainer}>
                  <Text style={styles.text}>Or sign up with</Text>
                  <View style={styles.rrss}>
                    <TouchableOpacity onPress={() => handleAuth0('google')}>
                      <AntDesign name="google" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleAuth0('github')}>
                      <AntDesign name="github" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleAuth0('twitter')}>
                      <AntDesign name="twitter" size={24} color="white" />
                    </TouchableOpacity>
                  </View>
                </View>
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
        backgroundColor: '#7E78D2',
        width: '100%',
        height: '100%'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 60,
        backgroundColor: '#1D1E2C',
        marginVertical:80,
        marginHorizontal:20,
        borderRadius: 40,
    },
    form: {
        flex: 1,
        width: "100%",
    },
    formSection: {
        marginTop:20
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
    text: {
        color: 'white',
        fontSize: 15
    },
    title: {
        alignSelf: 'center',
        fontSize:25,
        marginBottom:6
    },
    description: {
        alignSelf: 'center',
        fontSize:20
    },
    button: {
        backgroundColor: '#7E78D2',
        marginTop:40,
        borderRadius: 10
    },
    buttonText: {
        color: 'white',
        alignSelf: 'center',
        padding: 15,
    },
    linkText: {
        textDecorationLine: 'underline',
        fontSize:15,
        color: '#7E78D2'
    },
    error: {
        color: 'red'
    },
    rrssContainer: {
        flex:1,
        alignItems: 'center',
        gap: 10,
        marginVertical: 50
    },
    rrss: {
        flex: 1,
        gap:15,
        flexDirection: 'row'
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

export default Login;