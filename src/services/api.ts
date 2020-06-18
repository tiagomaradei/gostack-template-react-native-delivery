import axios from 'axios';

const api = axios.create({
  baseURL: 'http://2d3d483c21c9.ngrok.io/',
});

export default api;
