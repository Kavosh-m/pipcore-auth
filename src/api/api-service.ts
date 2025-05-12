import {useState} from 'react';

const baseURL = 'https://effiscope.space:4011/api';

const loginEndpoint = '/users/login';

export const useLogin = (email: string, password: string) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const login = async () => {
    setIsLoading(true);
    setIsSuccess(false);
    setData(null);
    setError(null);
    try {
      const response = await fetch(`${baseURL}${loginEndpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      setIsLoading(false);

      if (!response.ok) {
        // throw new Error('Network response was not ok');
        setIsSuccess(false);
      }

      setIsSuccess(true);

      const data = await response.json();

      setData(data);
    } catch (error: any) {
      setIsLoading(false);
      setError(error);
      setData(null);
      console.error('Error:', error);
    }
  };

  return {data, error, isLoading, isSuccess, login};
};
