import React, { useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import * as Linking from 'expo-linking';

const DeepLinkingHandler = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const handleDeepLink = (event) => {
      const url = event.url;
      if (url.includes('success')) {
        navigation.navigate('SuccessScreen')
      } else if (url.includes('cancel')) {
        navigation.navigate('CancelScreen')
      }
    };

    Linking.addEventListener('url', handleDeepLink);

    return () => {
      Linking.removeEventListener('url', handleDeepLink);
    };
  }, [navigation]);

  return null
};

export default DeepLinkingHandler
