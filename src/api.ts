import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000',
  maxBodyLength: 100000000,
  maxContentLength: 100000000,
  timeout: 6000,
});