import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const Main = () => {
  return (
    <div className="flex items-center justify-center flex-col my-24 gap-12">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl text-gray-900 font-bold mb-4">
          Welcome to Taskify
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Your ultimate task management solution
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="flex items-center justify-center flex-col p-6 bg-white rounded-lg shadow-lg">
          <CheckCircle className="h-12 w-12 text-blue-600 mb-4" />
          <h2 className="text-xl md:text-2xl text-gray-900 font-semibold mb-2">
            Stay Organized
          </h2>
          <p className="text-gray-600">
            Keep track of your tasks and projects in one place.
          </p>
        </div>
        <div className="flex items-center justify-center flex-col p-6 bg-white rounded-lg shadow-lg">
          <CheckCircle className="h-12 w-12 text-blue-600 mb-4" />
          <h2 className="text-xl md:text-2xl text-gray-900 font-semibold mb-2">
            Collaborate Effortlessly
          </h2>
          <p className="text-gray-600">
            Work together with your team in real-time.
          </p>
        </div>
        <div className="flex items-center justify-center flex-col p-6 bg-white rounded-lg shadow-lg">
          <CheckCircle className="h-12 w-12 text-blue-600 mb-4" />
          <h2 className="text-xl md:text-2xl text-gray-900 font-semibold mb-2">
            Boost Productivity
          </h2>
          <p className="text-gray-600">
            Prioritize tasks and focus on what matters most.
          </p>
        </div>
      </div>
      <Button className="mt-6" size="lg" asChild>
        <Link to="/auth/register">Get Started with Taskify Today</Link>
      </Button>
    </div>
  );
};

export default Main;
