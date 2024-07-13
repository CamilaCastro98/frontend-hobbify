import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Subscription from '../components/subscription/Subscription'
import { Ionicons } from '@expo/vector-icons';

const SubscriptionScreen = ({navigation}) => {
    return (
        <View style={styles.container}> 
                <View style={styles.header}>
                <Ionicons style={styles.icon} name="chevron-back" size={32} color="#7E78D2" onPress={()=>navigation.goBack()}/>
                    <Text style={[styles.text,styles.title]}>Select Your Plan!</Text>
                    <Text style={styles.subtitile}>Choose the best option for you and enjoy all the features</Text>
                </View>
                <Subscription />
        </View>
    );
};

const styles = StyleSheet.create({
    icon: {
        marginTop:10
    },
    container: {
        flex: 1,
        backgroundColor: '#151515',
        flexDirection: 'column',
    },
    header: {
        paddingTop: 60,
        paddingBottom:30,
        paddingHorizontal:20,
        backgroundColor: '#151515'
    },
    title: {
        fontSize: 30,
        alignSelf: 'center',
        marginBottom: 10,
        fontWeight: '300'
    },
    subtitile: {
        fontSize:20,
        marginBottom: 5,
        alignSelf: 'center',
        color: 'white',
        fontWeight: '200'
    },
    text: {
        alignSelf: 'center',
        color: 'white'
    }
})

export default SubscriptionScreen;
