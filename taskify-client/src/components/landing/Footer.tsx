import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-4 flex w-full justify-between flex-col overflow-hidden">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <Logo />
        </div>
        <div className="space-x-4">
          <div className="flex">
            <Button
              size="sm"
              variant="ghost"
              className="text-gray-300 hover:text-gray-900"
            >
              About Us
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-gray-300 hover:text-gray-900"
            >
              Contact Us
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-gray-300 hover:text-gray-900"
            >
              Privacy Policy
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-gray-300 hover:text-gray-900"
            >
              Terms of Service
            </Button>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Link to={""} className="text-gray-300 hover:text-gray-100">
            <Facebook size={24} />
          </Link>
          <Link to={""} className="text-gray-300 hover:text-gray-100">
            <Twitter size={24} />
          </Link>
          <Link to={""} className="text-gray-300 hover:text-gray-100">
            <Instagram size={24} />
          </Link>
        </div>
      </div>
      <p className="ml-2 text-gray-300 flex w-full text-center justify-center mt-2">
        © 2024 Taskify. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
