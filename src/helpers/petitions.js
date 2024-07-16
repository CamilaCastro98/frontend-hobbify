import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL, API_KEY_TEST, STRIPE_API_KEY } from '@env'
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

 export const registerUser = async(values,login,navigation) => {

    const {email,password} = values

    try {
       const response = await axios.post(`https://backend-hobbify.onrender.com/authown/signin`,values)
       console.log(response.data)
       await loginUser({email,password},login,navigation)
    }
    catch(error) {
        throw new Error(`error trying to register: ${error}`)
    }
}

export const loginUser = async(values,login,navigation) => {
  try {
        const response = await axios.post(`https://backend-hobbify.onrender.com/authown/login`,values);
        // const response = user 
        if (response.status === 200 || response.status === 201) {
            const user = response.data.data.userData
            const token = response.data.data.token
            console.log(`user logueado es ${JSON.stringify(user)}, sus hobbies son  y el token es ${token}`)
        if (user.hobbies.length > 0) {
                login(token,user)
                navigation.push("MainFeed");
            } else {
                login(token,user)
                navigation.push("HobbySelector");
            }
         }
    }
    catch(error) {
        throw new Error(`error trying to login: ${error}`)
    }
}

// export const loginUserWithProvider = async(provider) => {
//     try {
        //axios.post('api-back-loginUserWithSM', values)
//         console.log(`login with ${provider}`)
//     }
//     catch(error) {
//         throw new Error(`error trying to login with SM: ${error}`)
//     }
// }

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
        const response = await axios.get(`https://backend-hobbify.onrender.com/hobbies`)
        return response.data
    }
    catch(error) {
        throw new Error(`error trying to get all hobbies: ${error}`)
    }
}

export const updateUser = async(userUpdated,token) => {
    const {userId,...user} = userUpdated

    try {
        const response = await axios.patch(`https://backend-hobbify.onrender.com/users/${userId}`, user, {
      headers: {
        'Authorization': `Bearer ${token}` 
      }
    });

    console.log(`La respuesta retornada es ${JSON.stringify(response.status)}`);
    return response.status;
    }
    catch(error) {
        throw new Error(`error trying to update hobbies: ${error}`)
    }    
}

export const getUserById = async(user) => {
    const {userId,...userInfo} = user
    try {
        const response = await axios.get(`https://backend-hobbify.onrender.com/users/${userId}`)
        console.log(`La response retornada es ${JSON.stringify(response.data)}`)
        return response.data
    }
    catch(error) {
        throw new Error(`error trying to update hobbies: ${error}`)
    } 
}

