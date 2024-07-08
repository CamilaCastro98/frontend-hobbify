import { Button,View, Text, StyleSheet,TouchableOpacity } from "react-native";
import Carrousel from "../components/Carrousel/Carrousel";
import { Context } from "../contexts/Context";
import { useContext } from "react";

const Landing = ({navigation}) => {
    const { token,userHobbies,isAuthenticated } = useContext(Context)
    console.log(`los valores iniciales en context son: isAuth es ${isAuthenticated} y hobbies son ${userHobbies}`)
return(
<View style={styles.container}>
    <View style={styles.header}>
        <Text style={styles.title}>Welcome to <Text style={styles.titlePurple}>Hobbify</Text>!</Text>
        <Text style={styles.text}>Old Hobbies, new Friends</Text>
    </View>
        <Carrousel />
    <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonLogin} onPress={() => navigation.push("Login")}>
                <Text style={styles.buttonTextLogin}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonRegister} onPress={() => navigation.push("Register")}>
                <Text style={styles.buttonTextRegister}>Register</Text>
        </TouchableOpacity>
    </View>
</View>
)
}

const styles = StyleSheet.create({
    header: {
        marginTop: 60,
        flexDirection: 'column',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 30,
        gap: 20
    },
    title: {
        color: 'white',
        fontSize: 30
    },
    titlePurple: {
        color: '#7E78D2',
        fontSize: 30
    },
    text: {
        color: 'white',
        fontSize: 20,
        fontWeight: '300'
    },
    container: {
        backgroundColor: '#1D1E2C',
        flex: 1
    },
    buttonContainer: {
        marginVertical: 20,
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: 40,
        paddingHorizontal: 30,
        gap: 15,
    },
    buttonLogin: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: '90%'
    },
    buttonTextLogin: {
        color: '#1D1E2C',
        alignSelf: 'center',
        padding: 10,
    },
    buttonRegister: {
        backgroundColor: '#7E78D2',
        borderRadius: 10,
        width: '90%'
    },
    buttonTextRegister: {
        color: 'white',
        alignSelf: 'center',
        padding: 10,
    }
})

export default Landing