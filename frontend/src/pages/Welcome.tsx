export default function Welcome({ setCurrentPage }: { setCurrentPage: (page: string) => void }) {
  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center bg-blue-50">
      <div className="text-center max-w-2xl px-4">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">Find Your Dream SDE Internship</h1>
        <p className="text-lg text-gray-600 mb-8">
          Discover opportunities, track your applications, and land your next big role.
        </p>
        <div className="space-x-4">
          <button 
            onClick={() => setCurrentPage('discover')} 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Explore Jobs
          </button>
          <button className="bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}