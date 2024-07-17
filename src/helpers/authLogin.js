import { AuthRequest, makeRedirectUri, fetchDiscoveryAsync, ResponseType } from 'expo-auth-session';
import axios from 'axios';
import { Platform } from 'react-native';

async function loginWithAuth0() {
  console.log('Entrando a login con Auth0');
  const auth0ClientId = 'tp0j0p0KQ5LAOC5lS9UFlITbs9O1pmfT';
  const auth0ClientSecret = 'ekdHxeQcpEqa3bDS--51lXFjYVkvp1bpZ7GXOfY3EsRwzXps-JI6PrJR-1V2QOdu';
  const authorizationEndpoint = 'https://dev-4hnohqxrkmmrqi8u.us.auth0.com/authorize';

  const useProxy = Platform.select({ web: false, default: true });

  const redirectUri = makeRedirectUri({
    useProxy,
  });

  try {
    const config = {
      clientId: auth0ClientId,
      redirectUri: redirectUri,
      scopes: ['openid', 'profile', 'email'],
      usePKCE: true,
      responseType: ResponseType.Code,
    };

    const discovery = await fetchDiscoveryAsync('https://dev-4hnohqxrkmmrqi8u.us.auth0.com');

    // Crear la solicitud de autenticación
    const authRequest = new AuthRequest(config);

    // Generar la URL de autenticación
    const authUrl = authRequest.makeAuthUrl(discovery);
    console.log(`Auth URL: ${authUrl}`);

    // Obtener el codeVerifier generado
    const { codeVerifier } = authRequest;
    console.log(`El codeVerifier es: ${codeVerifier}`);

    // Realizar la solicitud de autenticación
    const result = await authRequest.promptAsync(discovery);

    if (result.type === 'success') {
      const { code } = result.params;
      const tokenUrl = 'https://dev-4hnohqxrkmmrqi8u.us.auth0.com/oauth/token';

      const options = {
        method: 'POST',
        url: tokenUrl,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: auth0ClientId,
          client_secret: auth0ClientSecret,
          audience: 'https://dev-4hnohqxrkmmrqi8u.us.auth0.com/api/v2/',
          redirect_uri: redirectUri,
          code: code,
          code_verifier: codeVerifier, // Usar el codeVerifier aquí
        }),
      };

      axios.request(options)
        .then(function (response) {
          console.log(`Respuesta del POST es ${response.data}`);
        })
        .catch(function (error) {
          console.error(error);
        });
    } else if (result.type === 'cancel') {
      console.log('Autenticación cancelada');
      return null;
    } else {
      console.error('Error de autenticación:', result.error);
      throw new Error('Autenticación fallida');
    }
  } catch (error) {
    console.error('Error de autenticación:', error.message);
    throw error;
  }
}

export default loginWithAuth0;






  

  
