import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
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