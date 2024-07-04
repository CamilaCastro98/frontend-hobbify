import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Context = createContext()

const ContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [hobbies, setHobbies] = useState([])
  const [token, setToken] = useState(null)

  useEffect(() => {

    const loadToken = async () => {
      const storedToken = await AsyncStorage.getItem('userToken')
      if (storedToken) {
        setToken(storedToken)
        setIsAuthenticated(true)
      }
    }
    const loadHobbies = async () => {
        const storedHobbies = await AsyncStorage.getItem('hobbies')
        if (storedHobbies) {
          setHobbies(JSON.parse(storedHobbies))
        }
      }

    loadToken()
    loadHobbies()

  }, [])

  const login = async (userToken,hobbies) => {
    setToken(userToken)
    setHobbies(hobbies)
    setIsAuthenticated(true)
    await AsyncStorage.setItem('userToken', userToken)
    await AsyncStorage.setItem('hobbies', JSON.stringify(hobbies))
  }

  const logout = async () => {
    setToken(null)
    setIsAuthenticated(false)
    await AsyncStorage.removeItem('userToken')
    await AsyncStorage.removeItem('hobbies')
  }

  return (
    <Context.Provider value={{ isAuthenticated, token, hobbies, login, logout }}>
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider }
