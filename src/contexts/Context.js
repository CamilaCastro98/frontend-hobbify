import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Context = createContext();

const ContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [token, setToken] = useState(null);

console.log('context iniciado')

  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('userToken');
        if (storedToken) {
          setToken(storedToken);
          setIsAuthenticated(true);
          console.log("Token loaded in context");
        }

      } catch (error) {
        console.error("Error loading token:", error);
      }
    };

    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          console.log("User loaded in context");
        }
      } catch (error) {
        console.error("Error loading user:", error);
      }
    };

    loadToken();
    loadUser();
  }, []);

  const login = async (userToken, newUser) => {
    console.log("Entró a login de context");
    newUser.hobbies = newUser.hobbies.map(hobby => hobby.hobbieId);
    setToken(userToken);
    setUser(newUser);
    setIsAuthenticated(true);
    try {
      await AsyncStorage.setItem('userToken', userToken);
      await AsyncStorage.setItem('user', JSON.stringify(newUser));

      const loggedToken = await AsyncStorage.getItem('userToken');
      const loggedUser = await AsyncStorage.getItem('user');

      console.log(`En contexto: el token es ${loggedToken}, el user es ${loggedUser}`);
    } catch (error) {
      throw new Error(`Error logging data in context: ${error}`);
    }
  };

  const logout = async () => {
    setToken(null);
    setIsAuthenticated(false);
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('user');
    console.log("Token and user removed");
  };

  const updateHobbies = async (userWithNewHobbies) => {
    try {
      userWithNewHobbies.hobbies = userWithNewHobbies.hobbies.map(hobby => hobby.hobbieId);
      setUser(userWithNewHobbies);
      await AsyncStorage.setItem('user', JSON.stringify(userWithNewHobbies));
      const confirmedUser = await AsyncStorage.getItem('user');
      console.log(`Usuario con los hobbies actualizados: ${confirmedUser}`);
    } catch (error) {
      console.error("Error updating hobbies:", error);
    }
  };

  return (
    <Context.Provider value={{ isAuthenticated, token, user, login, logout, updateHobbies }}>
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };

