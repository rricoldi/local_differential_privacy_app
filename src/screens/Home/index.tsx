import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert } from '../../components/Alert';
import { Button } from '../../components/Button';
import { Logo } from '../../components/Logo';
import * as Location from 'expo-location';
import axios from 'axios';
import { api } from '../../api';
import { Container } from './style';
import { useAuth } from '../../context/Auth';

export function Home() {
  const navigation = useNavigation();
  const [alert, setAlert] = useState(false);
  const {
    id
  } = useAuth();

  const p = 0.95
  const q = 0.05

  // Função de perturb, que utiliza os valores de p e q, em conjunto com um número aleatório, para decidir se vai alternar o bit.
  function perturbBit(bit: 1 | 0) {
    // Passo que gera a incerteza.
    const randomNumber = Math.random();

    if(bit === 1) {
      if (randomNumber <= p) {
        return 1;
      }

      return 0;
    }

    if (randomNumber <= q) {
      return 1;
    }

    return 0;
  }

  async function sendLocation() {
    // Utiliza a API do Axios para pegar a latitude e longitude do dispositivo.
    const { 
      coords: {
      latitude,
      longitude
      } 
    } = await Location.getCurrentPositionAsync({});

    // Passa a latitude e longitude para a API GEONAMES para obter o nome do país em que o dispositivo está.
    const response = await axios
      .get<{ 
        countryName: string 
      }>(
        `http://api.geonames.org/countryCodeJSON?lat=${latitude}&lng=${longitude}&username=free`
      );
    const country: string = response.data.countryName;

    // Pega um array com informações de todos os países.
    const { data } = await axios
      .get<Array<{
        name: { 
          common: string 
        }
      }>>(
      'https://restcountries.com/v3.1/all?fields=name',
    );
    const countries: Array<string> = data.map((place) => place.name.common);

    // Passo de encode.
    // Mapeia o array de países para um vetor de 0s e 1.
    // Apenas a posição do vetor que representa o país onde o dispositivo se encontra será 1.
    const encodedResponse = countries.map(
      (place) => country === place ? 1 : 0
    )

    // Passo de perturb.
    // Aplica a função de perturb para cada posição do vetor de 0s e 1.
    const perturbedResponse = encodedResponse.map(perturbBit);

    // Envia a latitude, longitude, país e o vetor perturbado para a API.
    // Lá será aplicado o passo de agregação para resolver as queries.
    await api.post(
      `location/${id}`,
      {
        latitude,
        longitude,
        perturbedResponse,
        country
      }
    )

    setAlert(true);
    handleShowAlert();
  }

  function handleShowAlert() {
    setTimeout(() => setAlert(false), 1500);
  }

  return (
    <Container>
      <Logo />
        <Button backgroundColor='#003154' text='Send location' onPress={sendLocation} />
        <Button backgroundColor='#384A57' text='See statistics' onPress={() => navigation.navigate('Statistics')}/>
      {
        alert && <Alert onPress={() => handleShowAlert()} />
      }
    </Container>
  );
}
