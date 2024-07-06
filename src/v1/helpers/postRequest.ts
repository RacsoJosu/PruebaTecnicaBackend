import axios from 'axios';
import PostData from '../interfaces/PostData';

export async function postRequest({ data }: { data: PostData }) {
  const url = `${process.env.API_URL}`;
  const username = `${process.env.API_USERNAME}`;
  const password = `${process.env.API_PASSWORD}`;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`,
    },
  };

  const response = await axios.post(url, data, config);
  return response.data;
}
