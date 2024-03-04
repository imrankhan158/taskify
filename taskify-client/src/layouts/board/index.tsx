import Header from "@/components/landing/Header";
import ModalProvider from "@/components/providers/ModalProvider";
import React from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

const BoardLayout = () => {
  return (
    <div>
      <Toaster />
      <ModalProvider />
      <Header isUserLoggedIn={true} />
      <div className="flex mt-12">
        <Outlet />
      </div>
    </div>
  );
};

export default BoardLayout;
