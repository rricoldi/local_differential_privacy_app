import React from 'react';
import styled from 'styled-components/native';

export const AlertContainer = styled.View`
  width: 304px;
  height: 76px;
  border-radius: 76px;
  elevation: 2;
  background-color: #fff;
  shadow-color: #5F5F5F;
  shadow-offset: {width: 0, height: 3};
  shadow-opacity: 0.25;
  shadow-radius: 5;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  z-index: 100;
`;

export const AlertText = styled.Text`
  color: #444444;
  text-align: center;
  font-size: 28px;
  font-weight: 600;
  margin-left: 16px;
`;