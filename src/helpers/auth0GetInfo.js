import * as Crypto from 'expo-crypto';


const getUserProfile = async(token) => {

  try {

    const parts = token.split('.');
    const decodedHeader = JSON.parse(atob(parts[0]));
    const decodedPayload = JSON.parse(atob(parts[1]));

    console.log('Header decodificado:', decodedHeader);
    console.log('Payload decodificado:', decodedPayload);

    const userAuth0 = {
      username: decodedPayload.nickname,
      email: decodedPayload.email,
    };

    return userAuth0
        
      } catch (error) {
        console.error('Error al decodificar el token:', error);
      }
} 

  export default getUserProfile