import React from 'react';
import { GestureResponderEvent, TouchableOpacity } from 'react-native';
import { AlertContainer, AlertText } from './style';
import { AntDesign } from '@expo/vector-icons';

interface IProps {
  onPress?: (event: GestureResponderEvent) => void;
}

export const Alert: React.FC<IProps> = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
    <AlertContainer>
    <AntDesign name="checkcircleo" size={32} color="green" />
      <AlertText>Location sent</AlertText>
    </AlertContainer>
  </TouchableOpacity>
);
