import { StatusCodes } from 'http-status-codes';

export interface IResponse<T = unknown> {
  config: IConfig;
  data: T;
  headers: IResponseHeaders;
  request: unknown;
  status: StatusCodes;
  statusText: string;
}

interface IConfig {
  adapter: string[];
  allowAbsoluteUrls: boolean;
  baseURL: string;
  env: unknown;
  headers: IConfigHeaders;
  maxBodyLength: number;
  maxContentLength: number;
  method: string;
  timeout: number;
  transformRequest: null[];
  transformResponse: null[];
  transitional: ITransitional;
  url: string;
  xsrfCookieName: string;
  xsrfHeaderName: string;
}

interface IConfigHeaders {
  Accept: string;
}

interface IResponseHeaders {
  'content-type': string;
}

interface ITransitional {
  clarifyTimeoutError: boolean;
  forcedJSONParsing: boolean;
  silentJSONParsing: boolean;
}
