import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const setOptions = async (
  options: AxiosRequestConfig,
): Promise<AxiosRequestConfig> => {
  options = { ...options };

  // baseURLを付加
  if (options.baseURL == null) {
    options.baseURL = API_BASE_URL;
  }

  return options;
};

export const requestGet = async <T>(
  url: string,
  options: AxiosRequestConfig = {},
): Promise<AxiosResponse<T>> => {
  options = await setOptions(options);
  return axios.get<T>(url, options);
};

export const requestPost = async <T, U = undefined>(
  url: string,
  payload: U,
  options: AxiosRequestConfig = {},
): Promise<AxiosResponse<T>> => {
  options = await setOptions(options);
  return axios.post<T>(url, payload, options);
};

export const requestPut = async <T, U = undefined>(
  url: string,
  payload: U,
  options: AxiosRequestConfig = {},
): Promise<AxiosResponse<T>> => {
  options = await setOptions(options);
  return axios.put<T>(url, payload, options);
};

export const requestDelete = async <T>(
  url: string,
  options: AxiosRequestConfig = {},
): Promise<AxiosResponse<T>> => {
  options = await setOptions(options);

  return axios.delete<T>(url, options);
};
