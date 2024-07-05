import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useState,useEffect } from "react";

const Message = ({navigation,...props}) => {

    const [title,setTitle] = useState("")
    const [text1,setText1] = useState("")
    const [text2,setText2] = useState("")
    const [nav,setNav] = useState("")
    const [button,setButton] = useState("")

    useEffect(()=> {
        setTitle(props.title);
        setText1(props.text1);
        setText2(props.text2);
        setNav(props.nav);
        setButton(props.button);
    },[])

    return (
        <View style={styles.gral}>
            <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.text}>{text1}</Text>
                <Text style={styles.text}>{text2}</Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.push(nav)}>
                        <Text style={styles.textButton}>{button}</Text>
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

export default Message