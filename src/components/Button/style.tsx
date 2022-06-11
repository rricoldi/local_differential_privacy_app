import React from 'react';
import styled from 'styled-components/native';

export const ButtonView = styled.View<{ backgroundColor: string }>`
  background-color: ${props => props.backgroundColor};
  width: 280px;
  height: 64px;
  border-radius: 12px;
  margin-bottom: 35px;
  align-items: center;
  justify-content: center;
  elevation: 2;
  shadow-color: #5F5F5F;
  shadow-offset: {width: 0, height: 3};
  shadow-opacity: 0.25;
  shadow-radius: 10;
`;

export const ButtonText = styled.Text<{ color: string }>`
  color: ${props => props.color};
  text-align: center;
  font-size: 28px;
  font-weight: 400;
`;
