import axios, { AxiosInstance } from 'axios';

const BACK_API_URI = `${process.env.NEXT_PUBLIC_BACK_URI}/api`;

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: BACK_API_URI
});
