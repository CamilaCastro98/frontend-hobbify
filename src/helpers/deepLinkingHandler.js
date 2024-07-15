import React, { useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import * as Linking from 'expo-linking';

const DeepLinkingHandler = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const handleDeepLink = (event) => {
      const { path } = Linking.parse(event.url);
      console.log("se activó el evento")
      if (path.includes('success')) {
        navigation.navigate('Loading');
      } else if (path.includes('cancel')) {
        navigation.navigate('CancelScreen');
      }
    };

    const linkingSubscription = Linking.addEventListener('url', handleDeepLink);

    return () => {
      linkingSubscription.remove();
    };
  }, [navigation]);

  useEffect(() => {
    const getUrlAsync = async () => {
      const initialUrl = await Linking.getInitialURL();
      console.log('initial url:',initialUrl);
    };

    getUrlAsync();
  }, []);

  return null;
};

export default DeepLinkingHandler;


