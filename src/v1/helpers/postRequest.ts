import axios, {  isAxiosError } from 'axios';
import PostData from '../interfaces/PostData';
import { ApiError } from '../../../helpers';

export async function postRequest(data: PostData ) {
  const url = `${process.env.API_URL}`;
  const username = `${process.env.API_USERNAME}`;
  const password = `${process.env.API_PASSWORD}`;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`,
    },
  };

  try {
    const response = await axios.post(url, data, config);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return new ApiError({
        statusCode: error.response?.status || 500,
        message: error.response?.data,
        title: 'Error en la petición a la API de Seguro Plus',
      });
    }
  }
}
