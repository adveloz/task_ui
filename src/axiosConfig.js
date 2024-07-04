import axios from 'axios';

const serviTask = axios.create({
  baseURL: 'https://task-api.kodekraft.tech/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default serviTask;
