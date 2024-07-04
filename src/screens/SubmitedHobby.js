import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";

const SubmitedHobby = ({navigation}) => {
    return (
        <View style={styles.gral}>
            <View style={styles.container}>
                <Text style={styles.title}>Your Hobby was Submited</Text>
                <Text style={styles.text}>We have sent the information you just submited to our admin. 
                    We will notify you once your request has been reviewed.
                </Text>
                <Text style={styles.text}>In the meantime, you can go back and choose another
                     hobby to start chatting right away.
                </Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.push("HobbySelector")}>
                        <Text style={styles.textButton}>Return to Hobby Selector</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    gral: {
        backgroundColor: '#1D1E2C',
        flex: 1,
        justifyContent: 'center'
    },
    container: {
        margin: 20,
        borderRadius: 40,
        backgroundColor: 'white',
        flexDirection: 'column',
        gap:15,
        alignContent: 'center',
        padding: 40
    },
    title: {
        fontSize: 25
    },
    text: {
        fontSize: 18
    },
    button: {
        backgroundColor: '#7E78D2',
        borderRadius: 10,
        padding: 15
    },
    textButton: {
        alignSelf: 'center',
        color: 'white'
    }
})

export default SubmitedHobby