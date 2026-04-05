import JobTrackerBoard from "../components/JobTrackerBoard";

interface AuthUser {
  id: number;
  username: string;
  is_staff: boolean;
  is_superuser: boolean;
}

export default function Profile({ currentUser }: { currentUser: AuthUser | null }) {
  if (!currentUser) {
    return (
      <div className="p-8 max-w-3xl mx-auto">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Your Profile</h2>
          <p className="text-gray-600">Sign in to view your profile and job tracker.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Your Profile</h2>
      <div className="bg-white rounded-xl shadow p-8">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-4xl">
            👤
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{currentUser.username}</h3>
            <p className="text-gray-500 flex items-center mt-1"><span className="mr-2">🔐</span> {currentUser.is_staff ? "Admin" : "User"} account</p>
            <p className="text-gray-500 flex items-center mt-1"><span className="mr-2">💼</span> Manage your personal job search information here.</p>
          </div>
        </div>
      </div>
      {!currentUser.is_staff && <JobTrackerBoard />}
    </div>
  );
}
