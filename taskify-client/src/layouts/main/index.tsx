import Info from "@/components/dashboard/boards/Info";
import Header from "@/components/landing/Header";
import Sidebar from "@/pages/dashboard/Sidebar";
import { FetchOrganization } from "@/redux/slices/organization";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const MainLayout = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FetchOrganization());
  }, []);
  if (!isLoggedIn) {
    navigate("/auth/login");
  }
  return (
    <div>
      <Header isUserLoggedIn={true} />
      <div className="flex mt-24 mx-12">
        {/* Sidebar */}
        <Sidebar />
        <div className="flex w-full h-full flex-col gap-6 mx-6 divide-y">
          <Info />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
