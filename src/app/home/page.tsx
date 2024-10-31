"use client";
import withAuth from "../utils/withAuth";

const HomePage = () => {
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default withAuth(HomePage); 
