import axios from "axios";
import { API_URL } from '@env'

 export const registerUser = async(values) => {

    const [email,password] = values

    try {
        // axios.post('api-back-postUser', values)
        await loginUser(email,password)

    }
    catch(error) {
        throw new Error(`error trying to register: ${error}`)
    }
}

export const loginUser = async(values) => {
    try {
        axios.post(`${API_URL}/auth-own/login`, values)
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