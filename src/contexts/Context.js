import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Context = createContext()

const ContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userHobbies, setUserHobbies] = useState([])
  const [token, setToken] = useState(null)

  useEffect(() => {

    const loadToken = async () => {
      const storedToken = await AsyncStorage.getItem('userToken')
      if (storedToken) {
        setToken(storedToken)
        setIsAuthenticated(true)
        console.log("token loaded in context")
      }
    }
    const loadHobbies = async () => {
        const storedHobbies = await AsyncStorage.getItem('userHobbies')
        if (storedHobbies) {
          setUserHobbies(JSON.parse(storedHobbies))
          console.log("hobbies loaded in context")
        }
      }

    loadToken()
    loadHobbies()

  }, [])

  const login = async (userToken,userHobbies) => {
    console.log("entró a login de context")
    setToken(userToken)
    setUserHobbies(userHobbies)
    setIsAuthenticated(true)
    try {
      await AsyncStorage.setItem('userToken', userToken);
      await AsyncStorage.setItem('userHobbies', JSON.stringify(userHobbies));
  
      const loggedToken = await AsyncStorage.getItem('userToken');
      const loggedHobbies = await AsyncStorage.getItem('userHobbies');
  
      console.log(`en contexto: ${loggedToken}, ${loggedHobbies}`);
    }
    catch(error) {
      throw new Error(`error logging data in context: ${error}`)
    }
 
  }

  const logout = async () => {
    setToken(null)
    setIsAuthenticated(false)
    await AsyncStorage.removeItem('userToken')
    await AsyncStorage.removeItem('userHobbies')
  }

  const updateHobbies = async (newHobbies) => {
    setUserHobbies(newHobbies)
    await AsyncStorage.setItem('userHobbies', JSON.stringify(newHobbies))
    const confirmedHobbies = await AsyncStorage.getItem('userHobbies')
    console.log(`en contexto los nuevos hobbies son: ${confirmedHobbies}`)
  }

  return (
    <Context.Provider value={{ isAuthenticated, token, userHobbies, login, logout, updateHobbies }}>
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider }
