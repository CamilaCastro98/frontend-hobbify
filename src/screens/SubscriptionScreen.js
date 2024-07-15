import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Subscription from '../components/subscription/Subscription'
import { Ionicons } from '@expo/vector-icons';
import { Context } from '../contexts/Context';
import { useContext,useState } from 'react';
import { Linking } from "react-native";

const SubscriptionScreen = ({navigation}) => {
    const {isPremium,user} = useContext(Context)

    const sendInvoice = () => {
        if (user && user.payments && user.payments.length > 0) {
            const latestInvoice = user.payments[0].invoice;
            Linking.openURL(latestInvoice);
        } else {
            console.log('No invoice found');
        }
    }

    return (
        <View style={styles.container}> 
                <View style={styles.header}>
                    <View style={styles.iconTitle}>
                    <Ionicons style={styles.icon} name="chevron-back" size={32} color="#7E78D2" onPress={()=>navigation.goBack()}/>
                    <Text style={[styles.text,styles.title]}>Select Your Plan</Text>
                    </View>
                    <Text style={styles.subtitile}>Choose the best option for you and enjoy all the features</Text>
                </View>
               { isPremium ? (<View style={styles.containerPremium}>
                    <Text style={styles.premiumText}>You're already a premium member of Hobbify. You can enjoy your benefits now! </Text>
                    <TouchableOpacity style={styles.purchaseButton} onPress={sendInvoice}>
                        <Text style={styles.purchaseButtonText}>Get Purchase Receipt</Text>
                    </TouchableOpacity>

               </View>):
               
               <Subscription />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#151515',
        flexDirection: 'column',
    },
    containerPremium: {
        paddingHorizontal: 20
    },
    iconTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20
    },
    purchaseButton: {
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        marginTop: 40,
        borderWidth: 2,
        borderColor: 'white',
    },
    purchaseButtonText: {
        color: '#FFFFFF',
        fontSize: 20,
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
        fontWeight: '300'
    },
    subtitile: {
        fontSize:20,
        marginTop:10,
        marginBottom: 5,
        alignSelf: 'center',
        color: 'white',
        fontWeight: '200'
    },
    premiumText: {
        color: '#7E78D2',
        fontSize: 20
    },
    text: {
        alignSelf: 'center',
        color: 'white'
    }
})

export default SubscriptionScreen;
