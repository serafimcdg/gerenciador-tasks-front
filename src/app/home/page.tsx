"use client";

import Header from "../components/header.component";
import Panel from "../components/panel.component";
// import withAuth from "../utils/withAuth";

const HomePage = () => {
  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold"><Panel/></h1>
      </div>
    </div>
  );
};

// export default withAuth(HomePage);
export default HomePage;
