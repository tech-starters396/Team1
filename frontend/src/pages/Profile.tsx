export default function Profile() {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Your Profile</h2>
      <div className="bg-white rounded-xl shadow p-8">
        
        <div className="flex items-center gap-6 mb-8 border-b pb-8">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-4xl">
            👤
          </div>
          <div>
            <h3 className="text-2xl font-bold">John Doe</h3>
            <p className="text-gray-500 flex items-center mt-1"><span className="mr-2">✉️</span> john.doe@example.com</p>
            <p className="text-gray-500 flex items-center mt-1"><span className="mr-2">💼</span> CS Student @ University</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Skills (Comma separated)</label>
            <input type="text" defaultValue="Python, React, Django, TypeScript" className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Resume Link</label>
            <input type="url" defaultValue="https://docs.google.com/..." className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg mt-4 hover:bg-blue-700 transition-colors">
            Save Changes.
          </button>
        </div>
      </div>
    </div>
  );
}