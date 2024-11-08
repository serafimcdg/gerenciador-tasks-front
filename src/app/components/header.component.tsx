"use client";

import { useRouter } from "next/navigation";
import { AppIcon } from "../utils/icons";

const Header = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <header className="bg-blue-500 p-4 text-white shadow-md h-1/6"> 
    <div className="container mx-auto flex justify-between items-center"> 
      <div className="flex flex-col items-center cursor-pointer">
        <h1 className="flex items-center space-x-1"> 
          <span className="font-normal text-xl">TASK</span> 
          <span className="font-bold text-2xl ">MANAGER</span> 
        </h1>
      </div>
      <nav className="flex"> 
        <button onClick={handleLogout}>
          <AppIcon icone="logout" size={48} />
        </button>
      </nav>
    </div>
  </header>
  );
};

export default Header;
