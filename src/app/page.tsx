"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "./styles/page.css";
import { login } from "./services/login.service";
import RegisterPage from "./components/registerPage.component";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const data = await login(email, password);
      sessionStorage.setItem("token", data.token);
      router.push("/home");
    } catch (err) {
      setError("Email ou senha invalidos");
    }
  };

  return (
    <div className="background-container w-full flex">
      <div className="flex min-h-screen w-full bg-gray-100">
        <div
          className="image-container bg-cover bg-left"
          style={{
            backgroundImage: "url('/assets/background.png')",
          }}
        ></div>
        <div className="custom-blue-bg flex flex-col justify-center items-center p-8 rounded-lg shadow-md w-full md:w-1/2">
          {!isRegister ? (
            <>
              <h1 className="text-3xl font-bold mb-6 text-white pb-16">
                Login
              </h1>

              <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center w-full"
              >
                <div className="mb-4 w-3/4">
                  <div className="block text-white mb-2">Email</div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border-b-2 border-white bg-transparent text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div className="mb-6 w-3/4">
                  <div className="block text-white mb-2">Senha</div>
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
                  className="w-1/2 bg-custom-yellow text-black py-2 rounded-lg hover:bg-custom-yellow-hover"
                >
                  Entrar
                </button>
              </form>

              <p className="text-white mt-4">
                Não possui uma conta?
                <div className="container">
                  <button
                    className="text-blue-300 cursor-pointer"
                    onClick={() => setIsRegister(true)}
                    aria-label="Cadastre-se aqui"
                  >
                    Cadastre-se aqui
                  </button>
                </div>
              </p>
            </>
          ) : (
            <RegisterPage setIsRegister={setIsRegister} />
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
