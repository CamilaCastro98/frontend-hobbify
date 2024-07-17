import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Context = createContext();

const ContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading ] = useState(true);
  const [isPremium, setIsPremium] = useState(false)

console.log('context iniciado')

  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('userToken');
        if (storedToken) {
          setToken(storedToken);
          setIsAuthenticated(true);
          setIsLoading(false);
          console.log("Token loaded in context: ",token);
        }

      } catch (error) {
        console.error("Error loading token:", error);
      }
    };

    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user')
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          const userIsPremium = JSON.parse(storedUser).payments && JSON.parse(storedUser).payments.length > 0
          setIsPremium(userIsPremium)
          console.log("User loaded in context: ",JSON.stringify(storedUser));
        }
      } catch (error) {
        console.error("Error loading user:", error);
      }
    };


    loadToken();
    loadUser();
    console.log(`En contexto: el user es ${JSON.stringify(user)}, el token es ${token} y su premium es ${isPremium}`)
  }, []);

  const login = async (userToken, newUser) => {
    console.log("Entró a login de context");
    setToken(userToken);
    setUser(newUser);
    setIsAuthenticated(true);
    try {
      await AsyncStorage.setItem('userToken', userToken);
      await AsyncStorage.setItem('user', JSON.stringify(newUser));

      const loggedToken = await AsyncStorage.getItem('userToken');
      const loggedUser = await AsyncStorage.getItem('user');
      console.log(`el usuario logueado es ${loggedUser}`)

      const userIsPremium = JSON.parse(loggedUser).payments.length > 0;
      setIsPremium(userIsPremium);

    } catch (error) {
      throw new Error(`Error logging data in context: ${error}`);
    }
  };

  const logout = async () => {
    setToken(null);
    setIsAuthenticated(false);
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('user');
    setIsPremium(false)
    console.log("Token and user removed");
  };


  const updateHobbies = async (userWithNewHobbies) => {
    try {
      setUser(userWithNewHobbies);
      await AsyncStorage.setItem('user', JSON.stringify(userWithNewHobbies));
      const confirmedUser = await AsyncStorage.getItem('user');
      console.log(`Usuario con los hobbies actualizados: ${confirmedUser}`);
    } catch (error) {
      console.error("Error updating hobbies:", error);
    }
  };

  return (
    <Context.Provider value={{ isAuthenticated, token, user, login, logout, updateHobbies, isLoading, isPremium, setIsPremium, setIsLoading }}>
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };