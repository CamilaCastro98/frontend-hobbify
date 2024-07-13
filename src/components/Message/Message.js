import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useState,useEffect, useContext } from "react";
import { Context } from "../../contexts/Context";

const Message = ({navigation,...props}) => {

    const [title,setTitle] = useState("")
    const [text1,setText1] = useState("")
    const [text2,setText2] = useState("")
    const [button,setButton] = useState("")

    useEffect(()=> {
        setTitle(props.title);
        setText1(props.text1);
        setText2(props.text2);
        setButton(props.button);
    },[])

    const {user} = useContext(Context)

    const handleGoBack = () => {
        if (user.hobbies.length > 0) {
            navigation.push("MainFeed")
        } else {
            navigation.push("HobbySelector")
        }
    };


    return (
        <View style={styles.gral}>
            <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.text}>{text1}</Text>
                <Text style={styles.text}>{text2}</Text>
                <TouchableOpacity style={styles.button} onPress={handleGoBack}>
                        <Text style={styles.textButton}>{button}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    gral: {
        backgroundColor: '#1b1b1b',
        flex: 1,
        justifyContent: 'center'
    },
    container: {
        margin: 20,
        borderRadius: 40,
        backgroundColor: '#151515',
        flexDirection: 'column',
        gap:15,
        alignContent: 'center',
        padding: 50
    },
    title: {
        fontSize: 25,
        color: 'white',
        fontWeight: '300'
    },
    text: {
        fontSize: 18,
        color: 'white',
        fontWeight:'200'
    },
    button: {
        backgroundColor: '#7E78D2',
        borderRadius: 10,
        padding: 15,
        marginTop: 10
    },
    textButton: {
        alignSelf: 'center',
        color: 'white',
        fontSize:18,
    }
})

export default Message