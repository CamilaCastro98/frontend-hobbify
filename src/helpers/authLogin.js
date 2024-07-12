import * as AuthSession from 'expo-auth-session';
import { authConfig } from "../config/auth0Config";

const loginWithAuth0 = async (provider) => {
  const redirectUrl = AuthSession.makeRedirectUri({
    useProxy: true,
  });

  console.log('Generated Redirect URL:', redirectUrl);

  const authUrl = `${authConfig.issuer}/authorize` +
    `?response_type=token` +
    `&client_id=${authConfig.clientId}` +
    `&redirect_uri=${encodeURIComponent(authConfig.redirectUri)}` +
    `&connection=${provider}`;

    console.log('authUrl hola:',{authUrl})

  try {
    const response = await AuthSession.startAsync({ authUrl });
    console.log('Auth Response:', response);

    if (response.type === 'success') {
      const accessToken = response.params.access_token;
      return accessToken;
    } else {
      throw new Error('Authentication failed');
    }
  } catch (error) {
    console.error('Error during Auth0 authentication:', error);
    throw new Error('Authentication failed');
  }
};

export default loginWithAuth0;

  

  
