import { useState } from "react";
import Welcome from "./pages/Welcome";
import Discover from "./pages/Discover";
import MyJobs from "./pages/MyJobs";
import Profile from "./pages/Profile";

function App() {
  const [currentPage, setCurrentPage] = useState("welcome");

  const renderPage = () => {
    switch (currentPage) {
      case "welcome":
        return <Welcome setCurrentPage={setCurrentPage} />;
      case "discover":
        return <Discover />;
      case "my-jobs":
        return <MyJobs />;
      case "profile":
        return <Profile />;
      default:
        return <Welcome setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <nav className="bg-white px-6 py-4 flex justify-between items-center shadow-sm">
        <div 
          className="font-bold text-xl text-blue-600 cursor-pointer" 
          onClick={() => setCurrentPage("welcome")}
        >
          InternPortal
        </div>
        <div className="flex gap-6">
          <button 
            onClick={() => setCurrentPage("welcome")} 
            className={`font-medium ${currentPage === "welcome" ? "text-blue-600" : "text-gray-600 hover:text-gray-900"}`}
          >
            Home
          </button>
          <button 
            onClick={() => setCurrentPage("discover")} 
            className={`font-medium ${currentPage === "discover" ? "text-blue-600" : "text-gray-600 hover:text-gray-900"}`}
          >
            Discover
          </button>
          <button 
            onClick={() => setCurrentPage("my-jobs")} 
            className={`font-medium ${currentPage === "my-jobs" ? "text-blue-600" : "text-gray-600 hover:text-gray-900"}`}
          >
            My Jobs
          </button>
          <button 
            onClick={() => setCurrentPage("profile")} 
            className={`font-medium ${currentPage === "profile" ? "text-blue-600" : "text-gray-600 hover:text-gray-900"}`}
          >
            Profile
          </button>
        </div>
      </nav>
      <main>{renderPage()}</main>
    </div>
  );
}

export default App;