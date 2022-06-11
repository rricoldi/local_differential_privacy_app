import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #FDFEFF;
`;

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
