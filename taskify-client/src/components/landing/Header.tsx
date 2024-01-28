import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import WorkspaceSwitcher from "./WorkspaceSwitcher";

const Header = ({ isUserLoggedIn = false }) => {
  return (
    <header className="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center">
      <div className="mx-auto flex items-center w-full justify-between">
        <div className="flex gap-4 items-end">
          <Logo />
          {isUserLoggedIn && (
            <>
              <Button
                variant="default"
                size="sm"
                className="rounded-sm hidden md:block px-2 h-8 mb-1"
              >
                Create
              </Button>
            </>
          )}
        </div>
        <div className="space-x-4 flex items-center justify-between">
          {!isUserLoggedIn ? (
            <>
              <Button size="sm" variant="outline" asChild>
                <Link to="/auth/login">Login</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/auth/register">Get Taskify for free</Link>
              </Button>
            </>
          ) : (
            <>
              <WorkspaceSwitcher />
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
