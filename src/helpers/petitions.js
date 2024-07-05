import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Linking } from 'react-native'
import { API_URL } from '@env'

 export const registerUser = async(values) => {

    const {email,password} = values

    try {
        // axios.post('api-back-postUser', values)
        // await loginUser(email,password)
        console.log(values)

    }
    catch(error) {
        throw new Error(`error trying to register: ${error}`)
    }
}

export const loginUser = async(values) => {
    try {
        const response = await axios.post(`${API_URL}/authown/login`, values)
        return response
    }
    catch(error) {
        throw new Error(`error trying to login: ${error}`)
    }
}

export const loginUserWithProvider = async(provider) => {
    try {
       //axios.post('api-back-loginUserWithSM', values)
        console.log(`login with ${provider}`)
    }
    catch(error) {
        throw new Error(`error trying to login with SM: ${error}`)
    }
}

export const sendToAdmin = async(values) => {
    try {
       //axios.post('api-back-sendToAdmin', values)
        console.log(`Sent to admin: ${JSON.stringify(values)}`)
    }
    catch(error) {
        throw new Error(`error trying to send form to admin: ${error}`)
    }
}

export const getPlans = async() => {

    const subscriptions = [
        { id: 0, type: 'Yearly', price: '$99.99', description: 'Best value for long term use.' },
        { id: 1, type: '3 Months', price: '$29.99', description: 'Good value for short term use.' },
        { id: 2, type: '1 Month', price: '$9.99', description: 'Great for trying out the service.' },
    ]

    try {
        // const response = await axios.get('api-back-getPlans')
        return subscriptions
    }
    catch(error) {
        throw new Error(`error trying to get premium plans: ${error}`)
    }
}

export const postPurchase = async(planId) => {

    try {
        // const response = await axios.post('api-back-postPurchase',{id:planId})
        // const urlDePago = response.data.url;
        // Linking.openURL(urlDePago)
        console.log(planId)
        
    }
    catch(error) {
        throw new Error(`error trying to get premium plans: ${error}`)
    }
}