import React from 'react';
import styled from 'styled-components/native';

export const ButtonView = styled.View<{ backgroundColor: string }>`
  flex: 1;
  background-color: ${props => props.backgroundColor};
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text<{ color: string }>`
  color: ${props => props.color};
  text-align: center;
  font-size: 28px;
  font-weight: 500;
`;

export const ElevatedContainer = styled.View`
  width: 304px;
  height: 420px;
  border-radius: 20px;
  elevation: 2;
  background-color: #fff;
  shadow-color: #5F5F5F;
  shadow-offset: {width: 0, height: 3};
  shadow-opacity: 0.25;
  shadow-radius: 10;
  align-items: center;
  margin-bottom: 19px;
`;