import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './subscriptionCardStyles';

const SubscriptionCard = ({ nickname, description, price, interval, selected, onSelect }) => {
    return (
        <TouchableOpacity onPress={onSelect}>
            <View style={[styles.card, selected && styles.selectedCard]}>
                <Text style={styles.type}>{nickname}</Text>
                <Text style={styles.price}>${(price/ 100).toFixed(2)} per {interval}</Text>
                <Text>{description}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default SubscriptionCard;
