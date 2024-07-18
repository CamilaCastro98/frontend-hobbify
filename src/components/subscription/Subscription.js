import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import SubscriptionCard from '../subscriptionCard/SubscriptionCard';
import styles from './subscriptionStyles';
import { getPlans, postPurchase } from '../../helpers/petitions';

const Subscription = () => {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [plans, setPlans] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const handleGetPlans = async () => {
            setIsLoading(true);  // Usar setIsLoading para establecer el estado a true
            try {
                const response = await getPlans();
                setPlans(response);
            } catch (error) {
                console.error(`Error handling get premium plans: ${error}`);
            } finally {
                setIsLoading(false);  // Establecer el estado a false después de obtener la respuesta o si hay un error
            }
        };
        handleGetPlans();
    }, []);

    const handleSelectPlan = (id) => {
        setSelectedPlan(id);
    };

    const handlePurchase = async (id) => {
        if (selectedPlan !== null) {
            setIsLoading(true);  // Usar setIsLoading para establecer el estado a true
            try {
                await postPurchase(id);
            } catch (error) {
                console.error(`Error handling post purchase: ${error}`);
            } finally {
                setIsLoading(false);  // Establecer el estado a false después de manejar la compra
            }
        } else {
            alert('Please select a subscription plan.');
        }
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
                {isLoading ? (
                    <ActivityIndicator size="large" color="white" />
                ) : (
                    plans.map((plan, index) => (
                        <SubscriptionCard
                            key={index}
                            nickname={plan.nickname}
                            price={plan.unit_amount}
                            interval={plan.recurring ? plan.recurring.interval : ''}
                            description={plan.description}
                            selected={selectedPlan === plan.id}
                            onSelect={() => handleSelectPlan(plan.id)}
                        />
                    ))
                )}
                <TouchableOpacity style={styles.purchaseButton} onPress={() => handlePurchase(selectedPlan)}>
                    {isLoading ? (
                        <ActivityIndicator size="small" color="white" />
                    ) : (
                        <Text style={styles.purchaseButtonText}>Purchase</Text>
                    )}
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default Subscription;

