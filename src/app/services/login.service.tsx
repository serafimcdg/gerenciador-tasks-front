import axios from 'axios';

const API_URL = 'http://localhost:3000/';

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}api/users/login`, {
      email,
      password,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true, 
    });

    return response.data; 
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw new Error('Erro ao fazer login');
  }
};

export const validateVerificationCode = async (email: string, verificationCode: string) => {
    try {
      const response = await axios.post(`${API_URL}api/users/validate-code`, {
        email,
        verificationCode,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, 
      });
  
      return response.data;
    } catch (error) {
      console.error('Erro ao validar o código de verificação:', error);
      throw new Error('Erro ao validar o código de verificação');
    }
  };