import axios from 'axios';
const axiosIns = axios.create({
  timeout: 3000,
});
axiosIns.interceptors.request.use((config) => {
  return config;
});

axiosIns.interceptors.response.use((response) => response.data);

export const initAxios = () => {
  return axiosIns;
};
