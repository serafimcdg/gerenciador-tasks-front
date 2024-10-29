"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RegisterService } from "../services/register.service";

interface RegisterPageProps {
  setIsRegister: (value: boolean) => void;
}

const RegisterPage = ({ setIsRegister }: RegisterPageProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [verificationCodeSent, setVerificationCodeSent] = useState(false);
  const [isCodeValidated, setIsCodeValidated] = useState(false);
  const [showResendButton, setShowResendButton] = useState(false);


  const [isLoadingSendCode, setIsLoadingSendCode] = useState(false); 
  const [isLoadingResendCode, setIsLoadingResendCode] = useState(false); 
  const [isLoadingValidateCode, setIsLoadingValidateCode] = useState(false); 
  const [isLoadingRegister, setIsLoadingRegister] = useState(false);
  const router = useRouter();

  const handleSendVerificationCode = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setSuccessMessage("");
    setIsLoadingSendCode(true); 

    try {
      await RegisterService.sendVerificationCode(email);
      setVerificationCodeSent(true);
      setSuccessMessage("Código de verificação enviado. Verifique seu e-mail.");
      setShowResendButton(false);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erro desconhecido ao enviar o código de verificação.");
      }
      setShowResendButton(true);
    } finally {
      setIsLoadingSendCode(false); 
    }
  };

  const handleResendVerificationCode = async () => {
    setError("");
    setSuccessMessage("");
    setIsLoadingResendCode(true); 

    try {
      await RegisterService.resendVerificationCode(email);
      setSuccessMessage("Código reenviado. Verifique seu e-mail.");
      setShowResendButton(false);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erro desconhecido ao reenviar o código de verificação.");
      }
    } finally {
      setIsLoadingResendCode(false); 
    }
  };

  const handleValidateVerificationCode = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setSuccessMessage("");
    setIsLoadingValidateCode(true); 

    try {
      await RegisterService.validateVerificationCode(email, verificationCode);
      setIsCodeValidated(true);
      setError("");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Código de verificação inválido.");
      }
      setShowResendButton(true);
    } finally {
      setIsLoadingValidateCode(false);
    }
  };

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setIsLoadingRegister(true); 

    try {
      await RegisterService.registerUser(
        name,
        email,
        password,
        verificationCode
      );
      router.push("/login");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erro desconhecido ao registrar.");
      }
    } finally {
      setIsLoadingRegister(false); 
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-6 text-white pb-16">Registre-se</h1>

      <form
        onSubmit={handleSendVerificationCode}
        className="flex flex-col items-center w-full"
      >
        <div className="mb-4 w-3/4">
          <label className="block text-white mb-2">Email</label>
          <div className="flex items-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border-b-2 border-white bg-transparent text-white focus:outline-none focus:border-blue-500"
              required
            />
            {showResendButton &&  !isCodeValidated &&(
              <button
                type="button"
                onClick={handleResendVerificationCode}
                className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 relative"
                disabled={isLoadingResendCode}
              >
                Reenviar
                {isLoadingResendCode && (
                  <div className="absolute inset-0 flex items-center justify-center bg-opacity-50">
                    <div className="animate-spin rounded-full h-6 w-6 border-4 border-t-transparent border-b-transparent border-l-white border-r-white opacity-75"></div>
                  </div>
                )}
              </button>
            )}
          </div>
        </div>

        {successMessage && (
          <p className="text-green-500 mb-4">{successMessage}</p>
        )}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {!verificationCodeSent && (
          <button
            type="submit"
            className="w-1/2 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 mb-4 relative"
            disabled={isLoadingSendCode}
          >
            Enviar Código de Verificação
            {isLoadingSendCode && (
              <div className="absolute inset-0 flex items-center justify-center bg-opacity-50">
                <div className="animate-spin rounded-full h-6 w-6 border-4 border-t-transparent border-b-transparent border-l-white border-r-white opacity-75"></div>
              </div>
            )}
          </button>
        )}
      </form>

      {verificationCodeSent && !isCodeValidated && (
        <form
          onSubmit={handleValidateVerificationCode}
          className="flex flex-col items-center w-full"
        >
          <div className="mb-4 w-3/4">
            <label className="block text-white mb-2">
              Código de Verificação
            </label>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="w-full px-3 py-2 border-b-2 border-white bg-transparent text-white focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-1/2 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 mb-4 relative"
            disabled={isLoadingValidateCode}
          >
            Validar Código
            {isLoadingValidateCode && (
              <div className="absolute inset-0 flex items-center justify-center bg-opacity-50">
                <div className="animate-spin rounded-full h-6 w-6 border-4 border-t-transparent border-b-transparent border-l-white border-r-white opacity-75"></div>
              </div>
            )}
          </button>
        </form>
      )}

      {isCodeValidated && (
        <form
          onSubmit={handleRegister}
          className="flex flex-col items-center w-full"
        >
          <div className="mb-4 w-3/4">
            <label className="block text-white mb-2">Nome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border-b-2 border-white bg-transparent text-white focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4 w-3/4">
            <label className="block text-white mb-2">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border-b-2 border-white bg-transparent text-white focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-1/2 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 mb-4 relative"
            disabled={isLoadingRegister}
          >
            Registrar
            {isLoadingRegister && (
              <div className="absolute inset-0 flex items-center justify-center bg-opacity-50">
                <div className="animate-spin rounded-full h-6 w-6 border-4 border-t-transparent border-b-transparent border-l-white border-r-white opacity-75"></div>
              </div>
            )}
          </button>
        </form>
      )}

      <button
        type="button"
        onClick={() => setIsRegister(false)}
        className="w-1/2 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600"
      >
        Voltar para o Login
      </button>
    </div>
  );
};

export default RegisterPage;
