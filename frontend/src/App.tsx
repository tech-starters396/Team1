import { useEffect, useState } from "react";
import apiClient from "./api/client";
import Auth from "./pages/Auth";
import Welcome from "./pages/Welcome";
import Discover from "./pages/Discover";
import Profile from "./pages/Profile";

interface AuthUser {
  id: number;
  username: string;
  is_staff: boolean;
  is_superuser: boolean;
}

function App() {
  const [currentPage, setCurrentPage] = useState("welcome");
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("current_user");
    const accessToken = localStorage.getItem("access_token");

    if (storedUser && accessToken) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("current_user");
      }
    }
  }, []);

  const navButtonClass = (page: string) =>
    `rounded-full border border-transparent px-4 py-2 text-sm font-semibold transition-colors ${
      currentPage === page
        ? "bg-blue-600 text-white shadow-sm"
        : "bg-transparent text-slate-600 hover:bg-blue-50 hover:text-blue-700"
    }`;

  const handleLogin = (user: AuthUser) => {
    setCurrentUser(user);
    setCurrentPage(user.is_staff ? "discover" : "profile");
  };

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refresh_token");
      if (refreshToken) {
        await apiClient.post("/token/refresh/", { refresh: refreshToken });
      }
    } catch (error) {
      console.error("Logout refresh check failed:", error);
    } finally {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("current_user");
      setCurrentUser(null);
      setCurrentPage("welcome");
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case "welcome":
        return <Welcome setCurrentPage={setCurrentPage} />;
      case "auth":
        return <Auth onLogin={handleLogin} onCancel={() => setCurrentPage("welcome")} />;
      case "discover":
        return <Discover currentUser={currentUser} onRequireAuth={() => setCurrentPage("auth")} />;
      case "profile":
        return <Profile currentUser={currentUser} />;
      default:
        return <Welcome setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <nav className="bg-white px-6 py-4 flex justify-between items-center shadow-sm">
        <div 
          className="font-bold text-xl text-blue-700 cursor-pointer" 
          onClick={() => setCurrentPage("welcome")}
        >
          InternPortal
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setCurrentPage("welcome")} 
            className={navButtonClass("welcome")}
          >
            Home
          </button>
          <button 
            onClick={() => setCurrentPage("discover")} 
            className={navButtonClass("discover")}
          >
            Discover
          </button>
          <button 
            onClick={() => setCurrentPage("profile")} 
            className={navButtonClass("profile")}
          >
            Profile
          </button>
          {currentUser ? (
            <button
              onClick={handleLogout}
              className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
            >
              Sign Out
            </button>
          ) : (
            <button
              onClick={() => setCurrentPage("auth")}
              className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Sign In
            </button>
          )}
        </div>
      </nav>
      <main>{renderPage()}</main>
    </div>
  );
}

export default App;
