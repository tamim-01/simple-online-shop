import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header.tsx";

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
