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

       if (!response.data.error) {
        console.log('response.data.error: ',JSON.stringify(response.data.error))
           await loginUser({email,password},login,navigation)
       } else {
        console.log('no se puede registrar')
        return('The email you provided is already used')
       }
    }
    catch(error) {
        throw new Error(`error trying to register: ${error}`)
    }
}

export const loginUser = async(values,login) => {
  try {
    let response
        if (values.password) {

            response = await axios.post(`https://backend-hobbify.onrender.com/authown/login`,values);
        } else {

            response = await axios.post(`https://backend-hobbify.onrender.com/auth/login`,values);
        }

        if (response.status === 200 || response.status === 201) {
            const user = response.data.data.userData
            const token = response.data.data.token
            const {isBanned} = user
            if (isBanned === true) {
                return("You are banned and can not login")
            } else {
                 console.log(`user logueado es ${JSON.stringify(user)}, sus hobbies son  y el token es ${token}`)
                login(token,user)
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
        const response = await axios.post('https://backend-hobbify.onrender.com/hobbies', values)
        console.log(`Sent to admin: ${JSON.stringify(values)}`)

        return response
    }
    catch(error) {
        throw new Error(`error trying to send form to admin: ${error}`)
    }
}

export const getPlans = async() => {

    try {
        const subscriptions = await axios.get(`https://backend-hobbify.onrender.com/stripe`, {
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
        const response = await axios.post(`http://192.168.100.248:3000/stripe`, 
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
    console.log('token es ',token)

    try {
        const response = await axios.patch(`https://backend-hobbify.onrender.com/users/${userId}`, user, {
      headers: {
        'Authorization': `Bearer ${token}` 
      }
    });

    console.log(`La respuesta retornada es ${JSON.stringify(response.data)}`);
    return response.status;
    }
    catch(error) {
        throw new Error(`error trying to update hobbies: ${error}`)
    }    
}

export const getUserById = async(user,token) => {
    const {userId,...userInfo} = user
    try {
        console.log(`token para obtener user luego de pago: ${token}`)
        const response = await axios.get(`https://backend-hobbify.onrender.com/users/${userId}`,{
            headers: {
              'Authorization': `Bearer ${token}` 
            }
          })
        console.log(`La response retornada es ${JSON.stringify(response.data)}`)
        return response.data
    }
    catch(error) {
        throw new Error(`error trying to update hobbies: ${error}`)
    } 
}

