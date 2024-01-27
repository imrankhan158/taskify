import logo from "@/assets/taskify.png";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to={"/"}>
      <div className="w-20">
        <img src={logo} alt="Taskfy" />
      </div>
    </Link>
  );
};

export default Logo;
