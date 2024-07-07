import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL, STRIPE_API_KEY } from '@env'
import { Linking } from "react-native";

const user = {
	status: 200,
	message: "Credentials is valid",
	data: {
		userId: "976393e7-4ea3-4082-b4a2-7a18db538f22",
		username: "anatoly.karpov",
		email: "anatoli.karpov@mailFake.com",
		password: "Password1!",
		city: "Medellin",
		country: "Erehwon",
		phone: 11223,
		hobbies: [
			// {
			// 	"hobbieId": 2,
			// 	"name": "Read",
			// 	"emoji": ":book"
			// }
		],
		"chats": [],
		"payments": []
	}
}

 export const registerUser = async(values) => {

    const {email,password} = values

    try {
        axios.post(`${API_URL}/signin`,values)
        await loginUser(email,password)
        console.log(values)

    }
    catch(error) {
        throw new Error(`error trying to register: ${error}`)
    }
}

export const loginUser = async(values,login,navigation) => {
  try {
        // const response = await axios.post(`${API_URL}/authown/login`, values);
        const response = user //borrar esto despues

        if (response.status === 200) {
          const { hobbies,token } = response.data;
        //   login(hobbies,token);
          if (hobbies.length > 0) {
            navigation.push("MainFeed");
          } else {
            navigation.push("HobbySelector");
          }
        }
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

    try {
        const subscriptions = await axios.get(`${API_URL}/stripe`, {
            headers: {
                'Authorization': `Bearer ${STRIPE_API_KEY}`
            }
        })
        return subscriptions.data.data
    }
    catch(error) {
        throw new Error(`error trying to get premium plans: ${error}`)
    }
}

export const postPurchase = async(planId) => {
    try {
        const response = await axios.post(`${API_URL}/stripe`, 
            { priceId: planId },
            {
                headers: {
                'Authorization': `Bearer ${STRIPE_API_KEY}`
            }
        })
        const urlDePago = response.data.url;
        Linking.openURL(urlDePago)
        console.log(planId)
        
    }
    catch(error) {
        throw new Error(`error trying to get premium plans: ${error}`)
    }
}

export const getAllHobbies = async() => {
    try {
        const response = await axios.get(`${API_URL}/hobbies`)
        return response.data
    }
    catch(error) {
        throw new Error(`error trying to get all hobbies: ${error}`)
    }
}