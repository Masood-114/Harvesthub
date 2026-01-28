import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const ModeratorPage = () => {
  const { user } = useSelector((state) => state.users);

  // Sample mock data
  const reports = [
    {
      id: 1,
      user: "Bob User",
      content: "Inappropriate post",
      status: "Pending",
    },
    {
      id: 2,
      user: "Charlie User",
      content: "Spam comment",
      status: "Reviewed",
    },
    {
      id: 3,
      user: "Dana User",
      content: "Offensive language",
      status: "Pending",
    },
  ];

  return (
    <div className="min-h-screen bg-emerald-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-slate-900 mb-6">
          Moderator Dashboard 🌿
        </h1>
        <p className="text-slate-600 mb-6">
          Welcome, {user?.name}. Review and moderate user content here.
        </p>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Reported Content</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-4 text-slate-700">User</th>
                  <th className="py-2 px-4 text-slate-700">Content</th>
                  <th className="py-2 px-4 text-slate-700">Status</th>
                  <th className="py-2 px-4 text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report.id} className="border-b hover:bg-emerald-50">
                    <td className="py-2 px-4">{report.user}</td>
                    <td className="py-2 px-4">{report.content}</td>
                    <td className="py-2 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-sm font-medium ${
                          report.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {report.status}
                      </span>
                    </td>
                    <td className="py-2 px-4 space-x-2">
                      <button className="bg-emerald-600 text-white px-3 py-1 rounded hover:bg-emerald-700">
                        Approve
                      </button>
                      <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ModeratorPage;
