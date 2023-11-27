import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { toast } from 'react-toastify';
import { getToken } from './token';

type DetailMessageType = {
  type: string;
  message: string;
};

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.NOT_FOUND]: true,
};

const shouldDisplayError = (response: AxiosResponse) => !!StatusCodeMapping[response.status];

const REQUEST_TIMEOUT = 5000;

export const createAPI = (onUnauthorized: () => void): AxiosInstance => {
  const api = axios.create({
    timeout: REQUEST_TIMEOUT,
  });

  const onFail = (err: AxiosError<DetailMessageType>) => {
    const { response } = err;

    if (response?.status === StatusCodes.UNAUTHORIZED) {
      onUnauthorized();
    } else {
      if (response && shouldDisplayError(response)) {
        const detailMessage = response.data;
        toast.warn(detailMessage.message);
      }
    }
    throw err;
  };

  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers['x-token'] = token;
    }

    return config;
  });

  api.interceptors.response.use(response => response, onFail);

  return api;
};
