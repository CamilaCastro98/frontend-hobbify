import { View, Text, ActivityIndicator,StyleSheet } from 'react-native';
import { useState, useEffect } from 'react'
import { useNavigationState } from '@react-navigation/native';

const curiosities = [
    'Engaging in hobbies can significantly reduce stress levels and improve overall mental health. Activities like gardening, knitting, or painting can act as therapeutic outlets.',
    'Studies have shown that individuals who regularly engage in hobbies tend to live longer. A study by the Mayo Clinic found that people with hobbies had a 21% lower risk of dying early.',
    'According to a study by the U.S. Bureau of Labor Statistics, the most popular hobbies in the United States include watching TV (reported by 80% of people), reading (19%), and socializing (11%).',
    'Some people have taken their hobbies to extreme levels, setting world records. For example, Ashrita Furman holds the record for the most Guinness World Records held at once, with achievements in various hobbies like juggling, balancing, and unicycling.',
    'Having pets can be considered a hobby and has been shown to reduce anxiety, decrease blood pressure, and provide companionship, which is particularly beneficial for elderly individuals.',
    'While often seen as a sedentary activity, playing video games can improve hand-eye coordination, problem-solving skills, and social connections when played in multiplayer modes.',
    'Even non-physical hobbies can have physical health benefits. Activities that require fine motor skills, like knitting or model building, can improve dexterity and hand-eye coordination.',
    'The hobby industry is a significant economic sector. From craft supplies and sports equipment to books and travel, hobbies contribute to various markets and can even lead to entrepreneurial ventures.'
]

const Loading = ({navigation}) => {

    const [curiosityIndex, setCuriosityIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setCuriosityIndex((prevIndex) => (prevIndex + 1) % curiosities.length);
        }, 10000)

        return () => clearInterval(interval);
    }, []);


    return(
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#7E78D2" />
            <Text style={styles.text}>Loading... </Text>
            <View style={styles.curiosityContent}>
                <Text style={styles.secondText}>Did you know? </Text>
                <Text style={styles.curiosity}>{curiosities[curiosityIndex]}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'#151515',
      paddingHorizontal: 30
    },
    text: {
        marginTop:10,
        fontSize: 20,
        color: 'white',
        fontWeight: '300'
    },
    secondText: {
        fontSize: 20,
        color: '#7E78D2',
    },
    curiosityContent: {
        position: 'absolute',
        bottom: 100,
        flexDirection: 'column',
        alignItems: 'center',
        gap:10
    },
    curiosity: {
            fontSize: 17,
            color: 'white',
            fontWeight:'200'

    }
  });
  
  export default Loading;