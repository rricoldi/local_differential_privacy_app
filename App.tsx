import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from './src/screens/Login/Index';
import { Home } from './src/screens/Home';
import { Register } from './src/screens/Register/Index';

import { 
  useFonts,
  Lobster_400Regular,
} from '@expo-google-fonts/lobster'
import { Statistics } from './src/screens/Statistic/Index';
import { AuthProvider } from './src/context/Auth';

export default function App() {
  const [errorMsg, setErrorMsg] = useState<string>();

  useFonts({
    Lobster_400Regular,
  });

  // Pede permissão para acessar a localização do dispositivo.
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
    })();
  }, []);

  if (errorMsg) {
    console.log({errorMsg});
  }
  
  const Stack = createNativeStackNavigator();
  
  return (
    <NavigationContainer>
      <AuthProvider>
      <Stack.Navigator initialRouteName='Login' screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Statistics" component={Statistics} />
      </Stack.Navigator>
      </AuthProvider>
      
    </NavigationContainer>
  );
}