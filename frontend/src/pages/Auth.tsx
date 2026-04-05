import { useState } from "react";
import apiClient from "../api/client";

interface AuthUser {
  id: number;
  username: string;
  is_staff: boolean;
  is_superuser: boolean;
}

export default function Auth({
  onLogin,
  onCancel,
}: {
  onLogin: (user: AuthUser) => void;
  onCancel: () => void;
}) {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [role, setRole] = useState<"user" | "admin">("user");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = mode === "signup"
        ? await apiClient.post("/auth/signup/", {
            username,
            password,
            password_confirm: passwordConfirm,
          })
        : await apiClient.post("/auth/login/", {
            username,
            password,
            role,
          });

      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      localStorage.setItem("current_user", JSON.stringify(response.data.user));
      onLogin(response.data.user);
    } catch (err: any) {
      const detail = err.response?.data?.detail;
      const nonFieldErrors = err.response?.data?.non_field_errors?.[0];
      const passwordConfirmError = err.response?.data?.password_confirm?.[0];
      const usernameError = err.response?.data?.username?.[0];
      setError(detail || nonFieldErrors || passwordConfirmError || usernameError || (mode === "signup" ? "Sign up failed. Please check your details." : "Sign in failed. Check your credentials and role."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-blue-50 px-4">
      <div className="w-full max-w-4xl overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-xl">
        <div className="grid md:grid-cols-[1.1fr_0.9fr]">
          <div className="bg-blue-600 px-8 py-12 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">InternPortal</p>
            <h1 className="mt-6 text-4xl font-bold leading-tight">Sign in once, then use the app as an admin or a job seeker.</h1>
            <p className="mt-4 text-base text-blue-100">
              Admins can manage Discover jobs. Users can save jobs and manage their tracker from Profile.
            </p>
          </div>

          <div className="px-8 py-10">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{mode === "signup" ? "Create Account" : "Sign In"}</h2>
                <p className="mt-2 text-sm text-gray-500">
                  {mode === "signup" ? "Create a regular user account to save jobs and manage your tracker." : "Choose your account type and enter your credentials."}
                </p>
              </div>
              <button onClick={onCancel} className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-200">
                Back
              </button>
            </div>

            <div className="mb-4 flex rounded-xl bg-gray-100 p-1">
              <button
                type="button"
                onClick={() => setMode("signin")}
                className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition ${mode === "signin" ? "bg-white text-blue-700 shadow-sm" : "text-gray-500"}`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode("signup");
                  setRole("user");
                }}
                className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition ${mode === "signup" ? "bg-white text-blue-700 shadow-sm" : "text-gray-500"}`}
              >
                Sign Up
              </button>
            </div>

            {mode === "signin" && (
              <div className="mb-6 flex rounded-xl bg-gray-100 p-1">
                <button
                  type="button"
                  onClick={() => setRole("user")}
                  className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition ${role === "user" ? "bg-white text-blue-700 shadow-sm" : "text-gray-500"}`}
                >
                  User Login
                </button>
                <button
                  type="button"
                  onClick={() => setRole("admin")}
                  className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition ${role === "admin" ? "bg-white text-blue-700 shadow-sm" : "text-gray-500"}`}
                >
                  Admin Login
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Username</label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none focus:border-blue-300 focus:bg-white focus:ring-2 focus:ring-blue-500"
                  placeholder={role === "admin" ? "admin username" : "your username"}
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none focus:border-blue-300 focus:bg-white focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                  required
                />
              </div>
              {mode === "signup" && (
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Confirm Password</label>
                  <input
                    type="password"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none focus:border-blue-300 focus:bg-white focus:ring-2 focus:ring-blue-500"
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              )}

              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading
                  ? mode === "signup" ? "Creating Account..." : "Signing In..."
                  : mode === "signup"
                    ? "Create User Account"
                    : role === "admin"
                      ? "Sign In as Admin"
                      : "Sign In as User"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
