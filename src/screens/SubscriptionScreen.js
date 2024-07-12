import { View, Text, StyleSheet, ScrollView} from 'react-native';
import Subscription from '../components/subscription/Subscription'

const SubscriptionScreen = () => {
    return (
        <View style={styles.container}> 
                <View style={styles.header}>
                    <Text style={[styles.text,styles.title]}>Select Your Plan!</Text>
                    <Text style={styles.subtitile}>Choose the best option for you and enjoy all the features</Text>
                </View>
                <Subscription />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1D1E2C',
        flexDirection: 'column',
    },
    header: {
        paddingTop: 60,
        paddingBottom:30,
        paddingHorizontal:20,
        backgroundColor: '#7E78D2',
        borderRadius: 20
    },
    title: {
        fontSize: 25,
        alignSelf: 'center',
        marginBottom: 10
    },
    subtitile: {
        fontSize:17,
        marginBottom: 5,
        alignSelf: 'center'
    },
    text: {
        alignSelf: 'center'
    }
})

export default SubscriptionScreen;
