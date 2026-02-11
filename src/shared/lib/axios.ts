import axios from 'axios';

const API_BASE_URL = 'https://698cc4ca21a248a273628e82.mockapi.io';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
