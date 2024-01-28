import Header from "@/components/landing/Header";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

const Organization = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { orgId } = useParams();
  console.log("orgId" + orgId);

  if (!isLoggedIn) {
    return <Navigate to={"/auth/login"} />;
  }
  return (
    <div>
      <Header isUserLoggedIn={true} />
    </div>
  );
};

export default Organization;
