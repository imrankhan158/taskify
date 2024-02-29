import Footer from "@/components/landing/Footer";
import Header from "@/components/landing/Header";
import { RootState } from "@/interfaces";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      console.log("outside isLoggedIn: ", isLoggedIn);
      navigate("/organization");
    }
  }, [isLoggedIn]);
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default AuthLayout;
