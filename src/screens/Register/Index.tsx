import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { api } from '../../api';
import { Button } from '../../components/Button';
import { Logo } from '../../components/Logo';
import { useAuth } from '../../context/Auth';
import { ElevatedContainer, Title } from './style';


export function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const {
    isAuthenticated,
    setIsAuthenticated,
    setId,
  } = useAuth();

  const onRegister = async () => {
    const response = await api.post('/user', { email, password })	

    if(response.status === 201) {
      setIsAuthenticated(true);
      setId(response.data.id);
    }
  }

  useEffect(() => {
    if(isAuthenticated) {
      navigation.navigate('Home')
    }
  }, [isAuthenticated])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:"#FDFEFF" }}>
      <Logo />
      <ElevatedContainer>
        <Title>Register</Title>
        <View>
        <TextInput 
            style={{
              height: 50,
              width: 260,
              borderColor: '#777777',
              borderWidth: 1,
              backgroundColor: '#FDFDFD',
              borderRadius: 10,
              paddingLeft: 10,
              marginBottom: 15
            }} 
            placeholder='E-mail' value={email} onChangeText={(text) => setEmail(text)}
          />
          <TextInput 
            style={{
              height: 50,
              width: 260,
              borderColor: '#777777',
              borderWidth: 1,
              backgroundColor: '#FDFDFD',
              borderRadius: 10,
              paddingLeft: 10,
              marginBottom: 45
            }} 
            placeholder='Password' value={password} onChangeText={(text) => setPassword(text)}
          />
        </View>
      <Button backgroundColor='#003154' text='Sign up' onPress={onRegister} />
      </ElevatedContainer>
    </View>
  );
}
