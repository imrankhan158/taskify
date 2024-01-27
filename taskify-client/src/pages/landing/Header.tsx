import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center">
      <div className="mx-auto flex items-center w-full justify-between">
        <Logo />
        <div className="space-x-4 flex items-center justify-between">
          <Button size="sm" variant="outline" asChild>
            <Link to="/auth/login">Login</Link>
          </Button>
          <Button size="sm" asChild>
            <Link to="/auth/register">Get Taskify for free</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
