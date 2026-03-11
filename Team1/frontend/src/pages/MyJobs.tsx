export default function MyJobs() {
  const applications = [
    { id: 1, role: 'Frontend Intern', company: 'WebTech', status: 'Interviewing', date: 'Mar 10, 2026' },
    { id: 2, role: 'SDE Intern', company: 'CloudNet', status: 'Applied', date: 'Mar 08, 2026' },
    { id: 3, role: 'Full Stack Developer', company: 'StartUp Inc', status: 'Rejected', date: 'Feb 28, 2026' },
  ];

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">My Jobs</h2>
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 font-semibold text-gray-600">Role</th>
              <th className="px-6 py-4 font-semibold text-gray-600">Company</th>
              <th className="px-6 py-4 font-semibold text-gray-600">Date Applied</th>
              <th className="px-6 py-4 font-semibold text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(app => (
              <tr key={app.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{app.role}</td>
                <td className="px-6 py-4 text-gray-600">{app.company}</td>
                <td className="px-6 py-4 text-gray-600">{app.date}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    app.status === 'Interviewing' ? 'bg-yellow-100 text-yellow-800' : 
                    app.status === 'Applied' ? 'bg-blue-100 text-blue-800' : 
                    'bg-red-100 text-red-800'
                  }`}>
                    {app.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}