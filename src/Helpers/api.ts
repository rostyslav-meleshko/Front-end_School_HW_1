export const BASE_URL = 'https://tiktok33.p.rapidapi.com';

// eslint-disable-next-line
const serverRequest = (url: string): Promise<any> => fetch(`${BASE_URL}${url}`, {
  method: 'GET',
  headers: {
    'x-rapidapi-host': `${process.env.REACT_APP_API_HOST}`,
    'x-rapidapi-key': `${process.env.REACT_APP_API_KEY}`,
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error('Server error occurred');
    }

    return response.json();
  });

export default serverRequest;
