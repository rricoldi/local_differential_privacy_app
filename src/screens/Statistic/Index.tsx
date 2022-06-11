import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { api } from '../../api';
import { Button } from '../../components/Button';
import { Logo } from '../../components/Logo';
import { ElevatedContainer } from './style';

interface ICountryCount { country: string; count: number; }

export function Statistics() {
  const navigation = useNavigation();
  const [statistics, setStatistics] = useState<Array<ICountryCount>>([]);

  useEffect(() => {
    async function getStatistics() {
      const { data } = await axios
      .get<Array<{
        name: { 
          common: string 
        }
      }>>(
      'https://restcountries.com/v3.1/all?fields=name',
    );
    const countries: Array<string> = data.map((place) => place.name.common);

      const response = await api.get<Array<number>>('location/statistics/count');

      // combina o count recebido da api com o nome dos países, e por fim ordena o resultado pelo vlaor do count.
      setStatistics(
        countries
          .map(
            (country, index) => ({ country, count: response.data[index] })
          )
          .sort(
            (a, b) => b.count - a.count
          )
      );
    }

    getStatistics();
  }, [])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:"#FDFEFF" }}>
      <Logo />
      <ElevatedContainer>
        <ScrollView style={{flex: 1, width: '90%', height: '80%', marginTop: 20}}>
        <View style={{ flexDirection: 'row', height: 40, alignItems: 'center', justifyContent: 'space-between', paddingLeft: 10, paddingRight: 10 }}>
              <Text style={{fontSize: 18}}>
                Country
              </Text>
              <Text style={{fontSize: 18, fontWeight: '600'}}>
                Count of users
              </Text>
            </View>
        {
          statistics.length > 0 
          ? statistics.map(statistic => (
            <>
              <View style={{ flexDirection: 'row', height: 60, alignItems: 'center', justifyContent: 'space-between', paddingLeft: 10, paddingRight: 30 }}>
                <View>
                  <Text style={{fontSize: 16}}>
                    {statistic.country.substring(0, 20)}
                  </Text>
                </View>
                <Text style={{fontSize: 24, fontWeight: '600'}}>
                  {statistic.count}
                </Text>
              </View>
              <View style={{ height: 2, width: '98%', backgroundColor: '#384A57', borderRadius: 3, marginBottom: 10}} />
            </>
          ))
        : (
          <View style={{ flexDirection: 'row', height: 60, alignItems: 'center', justifyContent: 'space-around' }}>
            <ActivityIndicator color='#384A57' size="large" />
          </View>
        )
        }
        </ScrollView>
      </ElevatedContainer>
      <Button backgroundColor='#003154' text='Get back' onPress={() => navigation.navigate('Home')} />
    </View>
  );
}
