import { fetchDiscoveryAsync } from 'expo-auth-session';

async function loadAsync(config, authorizationEndpoint) {
  try {

    const discovery = await fetchDiscoveryAsync(authorizationEndpoint);

    if (!discovery) {
      throw new Error('Failed to fetch discovery document');
    }

    return discovery;
  } catch (error) {
    console.error('Failed to load discovery:', error.message);
    throw error;
  }
}

export default loadAsync;
