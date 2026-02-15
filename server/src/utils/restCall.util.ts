import axios, { AxiosRequestConfig } from 'axios';

export const postRestCall = async (url: string, reqBody: any): Promise<any> => {
  const headers = {
    'Content-Type': 'application/json',
    'x-client-id': process.env.CLIENT_ID,
    'x-auth-key': process.env.AUTH_KEY,
  };
  var options: AxiosRequestConfig = {
    method: 'POST',
    url: url,
    headers: headers,
    data: reqBody,
  };

  return axios.request(options).then((res) => {
    return res.data;
  });
};

export const getRestCall = async (url: string): Promise<any> => {
  const headers = {
    'Content-Type': 'application/json',
    'x-client-id': process.env.CLIENT_ID,
    'x-auth-key': process.env.AUTH_KEY,
  };
  return axios
    .get(url, { headers })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

const getQueryString = (queryParams: any): string => {
  return Object.keys(queryParams)
    .map((key) => key + '=' + queryParams[key])
    .join('&');
};
