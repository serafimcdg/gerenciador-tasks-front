import axios from 'axios';

const API_URL = 'http://localhost:3000/api/users'; 

const sendVerificationCode = async (email: string) => {
  try {
    const response = await axios.post(`${API_URL}/send-verification-code`, { email });
    return response.data;
  } catch (error) {
    throw new Error('Erro ao enviar o codigo de verificação.');
  }
};

const resendVerificationCode = async (email: string) => {
  try {
    const response = await axios.post(`${API_URL}/send-verification-code`, { email });
    return response.data;
  } catch (error) {
    throw new Error('Erro ao reenviar o codigo de verificação.');
  }
};

const validateVerificationCode = async (email: string, verificationCode: string) => {
  try {
    const response = await axios.post(`${API_URL}/validate-code`, { email, verificationCode });
    return response.data;
  } catch (error) {
    throw new Error('codigo de verificação invalido.');
  }
};

const registerUser = async (name: string, email: string, password: string, verificationCode: string) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { name, email, password, verificationCode });
    return response.data;
  } catch (error) {
    throw new Error('Erro ao registrar o usuario.');
  }
};

export const RegisterService = {
  sendVerificationCode,
  resendVerificationCode,
  validateVerificationCode,
  registerUser,
};
