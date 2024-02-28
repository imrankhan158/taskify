import Header from "@/components/landing/Header";
import React from "react";
import { Outlet } from "react-router-dom";

const BoardLayout = () => {
  return (
    <div>
      <Header isUserLoggedIn={true} />
      <div className="flex mt-24 mx-12">
        <Outlet />
      </div>
    </div>
  );
};

export default BoardLayout;
