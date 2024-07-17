import Constants from 'expo-constants';
import * as WebBrowser from 'expo-web-browser';

const logoutFromAuth0 = async () => {
    console.log('entro a logout auth0')
  const auth0Domain = 'dev-4hnohqxrkmmrqi8u.us.auth0.com';
  const clientId = 'tp0j0p0KQ5LAOC5lS9UFlITbs9O1pmfT';

   const returnToUrl = encodeURIComponent('https://google.com')

  const logoutUrl = `https://${auth0Domain}/v2/logout?client_id=${clientId}`;

  try {
    console.log(`url de logout: ${logoutUrl}`)
    await WebBrowser.openAuthSessionAsync(logoutUrl);
  } catch (error) {
    console.error('Failed to open browser for logout:', error);
  }
};


export default logoutFromAuth0;
