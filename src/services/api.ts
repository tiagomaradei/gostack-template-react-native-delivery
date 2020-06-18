import axios from 'axios';

const api = axios.create({
  baseURL: 'http://729455013c05.ngrok.io/',
});

export default api;
