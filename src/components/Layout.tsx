import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header.tsx";
import UserDetailModal from "./UserDetail.tsx";

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <UserDetailModal />
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
