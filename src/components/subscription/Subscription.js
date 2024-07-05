import React, { useState,useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import SubscriptionCard from '../subscriptionCard/SubscriptionCard';
import styles from './subscriptionStyles';
import { getPlans, postPurchase } from '../../helpers/petitions';


const Subscription = () => {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [plans,setPlans] = useState([])

    useEffect(()=> {
        const handleGetPlans = async() => {
            try {
                const response = await getPlans()
                setPlans(response)
            }
            catch(error) {
                throw new Error(`error handling get premium plans: ${error}`)
            }
        }
        handleGetPlans()
    },[])

    const handleSelectPlan = (id) => {
        setSelectedPlan(id);
    };

    const handlePurchase = async(id) => {
        if (selectedPlan !== null) {
            // Handle the purchase logic here
           try {
            await postPurchase(id)
           }
           catch(error) {
            throw new Error(`error handling post purchase: ${error}`)
           }

        } else {
            alert('Please select a subscription plan.');
        }
    };

    return (
        <View style={styles.container}>
            {plans.map((plan, index) => (
                <SubscriptionCard
                    key={index}
                    type={plan.type}
                    price={plan.price}
                    description={plan.description}
                    selected={selectedPlan === index}
                    onSelect={() => handleSelectPlan(plan.id)}
                />
            ))}
                <TouchableOpacity style={styles.purchaseButton} onPress={()=> handlePurchase(selectedPlan)}>
                    <Text style={styles.purchaseButtonText}>Purchase</Text>
                </TouchableOpacity>
        </View>
    );
};

export default Subscription;
