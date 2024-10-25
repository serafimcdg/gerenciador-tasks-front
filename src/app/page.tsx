'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import './styles/page.css';
import { login } from './services/login.service';
import RegisterPage from './components/registerPage.component';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegister, setIsRegister] = useState(false); 
  const router = useRouter();
  

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const data = await login(email, password); 
      localStorage.setItem('token', data.token); 
      router.push(''); 
    } catch (err) {
      setError('Email ou senha inválidos');
    }
  };

  return (
    <div className="flex justify-end items-center min-h-screen bg-gray-100">
      <div className="custom-blue-bg flex flex-col justify-center items-center p-8 rounded-lg shadow-md">
        {!isRegister ? ( 
          <>
            <h1 className="text-3xl font-bold mb-6 text-white pb-16">Login</h1>

            <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
              <div className="mb-4 w-3/4">
                <label className="block text-white mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border-b-2 border-white bg-transparent text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="mb-6 w-3/4">
                <label className="block text-white mb-2">Senha</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border-b-2 border-white bg-transparent text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              {error && <p className="text-red-500 mb-4">{error}</p>}

              <button
                type="submit"
                className="w-1/2 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
              >
                Entrar
              </button>
            </form>

            <p className="text-white mt-4">
              Não possui uma conta?{' '}
              <span className="text-blue-300 cursor-pointer" onClick={() => setIsRegister(true)}>
                Cadastre-se aqui
              </span>
            </p>
          </>
        ) : (
          <RegisterPage setIsRegister={setIsRegister} />
        )}
      </div>
    </div>
  );
};

export default LoginPage;
