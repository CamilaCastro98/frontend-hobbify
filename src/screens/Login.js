import { Button, TextInput, Platform, View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { Formik } from 'formik';
import { AntDesign } from '@expo/vector-icons';
import validationLogin from "../helpers/validationLogin";
import React, { useState,useContext, useEffect } from "react";
import { loginUser, loginUserWithProvider } from "../helpers/petitions";
import { Context } from "../contexts/Context";
import loginWithAuth0 from "../helpers/authLogin";
import logoutFromAuth0 from "../helpers/authLogout";
import * as WebBrowser from 'expo-web-browser';
import { useAuthRequest, exchangeCodeAsync, revokeAsync, ResponseType } from 'expo-auth-session';
import getUserProfile from "../helpers/auth0GetInfo";

WebBrowser.maybeCompleteAuthSession();
const useProxy = Platform.select({ web: false, default: true });

const clientId = 'tp0j0p0KQ5LAOC5lS9UFlITbs9O1pmfT';
const clientSecret = 'ekdHxeQcpEqa3bDS--51lXFjYVkvp1bpZ7GXOfY3EsRwzXps-JI6PrJR-1V2QOdu';
const domain = 'https://dev-4hnohqxrkmmrqi8u.us.auth0.com';
const redirectUri = 'exp://192.168.100.248:8081';

const discoveryDocument = {
  authorizationEndpoint: `${domain}/authorize`,
  tokenEndpoint: `${domain}/oauth/token`,
  revocationEndpoint: `${domain}/oauth/revoke`,
};


const Login = ({ navigation }) => {

  const { login } = useContext(Context);

  const [errorSubmiting, setErrorSubmiting] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [authTokens, setAuthTokens] = React.useState(null);

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId,
      responseType: ResponseType.Code,
      redirectUri,
      scopes: ['openid', 'profile', 'email'],
      usePKCE: true,
    },
    discoveryDocument
  );

  useEffect(() => {
  console.log('entra al use effect de token')
    const exchangeFn = async (exchangeTokenReq) => {
      try {
        const exchangeTokenResponse = await exchangeCodeAsync(
          {
            clientId,
            code: exchangeTokenReq.code,
            redirectUri,
            extraParams: {
              code_verifier: exchangeTokenReq.codeVerifier,
              client_secret: clientSecret,
            },
          },
          discoveryDocument
        );
        console.log('Exchange token response:', exchangeTokenResponse.idToken)
      setAuthTokens(exchangeTokenResponse.idToken)
        const userProfile = await getUserProfile(exchangeTokenResponse.idToken)
        console.log(`el user por loguearse con auth0 es ${JSON.stringify(userProfile)}`)
          await loginUser(userProfile,login)
      } catch (error) {
        console.error(error);
      }
    };

    if (response) {
      if (response.error) {
        Alert.alert(
          'Authentication error',
          response.params.error_description || 'Something went wrong'
        );
        return;
      }
      if (response.type === 'success') {
        exchangeFn({
          clientId,
          code: response.params.code,
          redirectUri,
          codeVerifier: request.codeVerifier,
        });
      }
    }
  }, [discoveryDocument, request, response]);

  const handleLogin = async (values) => {
    setIsLoading(true);
    try {
      const response = await loginUser(values, login);
      if (response === "You are banned and can not login") {
        setErrorSubmiting(response)
      }
    } catch (error) {
      console.error("Error trying to login:", error);
      setErrorSubmiting("The data you entered is incorrect");
    } finally {
      setIsLoading(false);
    }
  }

  const handleAuth0 = async (provider) => {
    try {
      await loginWithAuth0(provider);
    } catch (error) {
      console.error("Error trying to login with auth0:", error);
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
                <Text style={[styles.text, styles.description]}>Log in and keep having fun</Text>
                {errorSubmiting && <View style={styles.errorView}><Text style={styles.errorText}>{errorSubmiting}</Text></View>}
                <View style={styles.formSection}>
                  <Text style={styles.text}>Email</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    placeholder="mail@example.com"
                    placeholderTextColor="gray"
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
                    placeholderTextColor="gray"
                    secureTextEntry={true}
                    onFocus={() => setErrorSubmiting("")}
                  />
                  {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}
                </View>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                 { isLoading ? <ActivityIndicator size="small" color="white" /> : <Text style={styles.buttonText}>Submit</Text>}
                </TouchableOpacity>
                <Text style={styles.registerText}>
                  Not a member yet? {" "}
                  <TouchableOpacity onPress={() => navigation.push("Register")}>
                    <Text style={styles.linkText}>Register here</Text>
                  </TouchableOpacity>
                </Text>
                <View style={styles.rrssContainer}>
                  <Text style={styles.text}>Or sign up with</Text>
                  <View style={styles.rrss}>
                    <TouchableOpacity style={styles.buttonAuth0} onPress={() => promptAsync({ useProxy })}>
                      <AntDesign name="google" size={24} color="white" />
                    </TouchableOpacity>

                    
                  </View>
                  <TouchableOpacity onPress={logoutFromAuth0}>
                      <Text>Log out</Text>
                    </TouchableOpacity>
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
        backgroundColor: '#1b1b1b',
        width: '100%',
        height: '100%'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingVertical: 65,
        backgroundColor: '#151515',
        marginVertical:80,
        marginHorizontal:20,
        borderRadius: 40
    },
    form: {
        flex: 1,
        width: "100%",
    },
    formSection: {
        marginTop:30
    },
    buttonAuth0: {
      flexDirection: 'row',
      gap: 10,
      borderWidth: 2,
      borderColor: 'white',
      borderRadius: 30,
      padding: 10,
      width: '20%',
      justifyContent: 'center'
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
        fontSize: 18,
    },
    registerText: {
        color: 'white',
        fontSize: 15,
        fontWeight: '300',
        marginTop: 5
    },
    title: {
        alignSelf: 'center',
        fontSize:25,
        marginBottom:6,
        fontWeight: 300
    },
    description: {
        alignSelf: 'center',
        fontSize:20,
        fontWeight: 200,
        marginBottom: 20
    },
    button: {
        backgroundColor: '#7E78D2',
        marginTop:40,
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
        color: 'red',
        marginTop: 5
    },
    rrssContainer: {
        flex:1,
        alignItems: 'center',
        gap: 10,
        marginVertical: 20
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