import React from 'react';
import { GestureResponderEvent, TouchableOpacity } from 'react-native';
import { ButtonText, ButtonView } from './style';

interface IProps {
  backgroundColor: string;
  text: string;
  textColor?: string;
  onPress?: (event: GestureResponderEvent) => void;
}

export const Button: React.FC<IProps> = ({
  text,
  backgroundColor,
  onPress,
  textColor
}) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
    <ButtonView backgroundColor={backgroundColor}>
      <ButtonText color={textColor ?? '#FFF'}>{text}</ButtonText>
    </ButtonView>
  </TouchableOpacity>
);
