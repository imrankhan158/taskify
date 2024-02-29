import Footer from "@/components/landing/Footer";
import Header from "@/components/landing/Header";
import { RootState } from "@/interfaces";
import Main from "@/pages/landing/Main";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const LandingLayout = () => {
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
      <Main />
      <Footer />
    </>
  );
};

export default LandingLayout;
