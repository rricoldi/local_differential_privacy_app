import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface IProps {
  id: number;
  name: string;
  position: {
    latitude: number;
    longitude: number;
  };
}

export const Ride: React.FC<IProps> = ({
  id,
  name,
  position: {
    latitude,
    longitude
  },
}) => (
  <View key={id}>
    <View>
      <View>
        <Text>{name ?? `Corrida ${id}`}</Text>
      </View>
      <Text>{`Latitude: ${latitude}`}</Text>
      <Text>{`Longitude: ${longitude}`}</Text>
    </View>
    <TouchableOpacity>
      <View>
        <Text>Send</Text>
      </View>
    </TouchableOpacity>
  </View>
);
