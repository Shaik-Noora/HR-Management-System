import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="fixed top-0 left-0 h-screen w-60 bg-slate-900 text-white p-6 z-50">
      <h1 className="text-xl font-bold mb-6">HRMS</h1>

      <nav className="space-y-4">
        <Link to="/" className="block hover:text-indigo-300">
          Dashboard
        </Link>
        <Link to="/employees" className="block hover:text-indigo-300">
          Employees
        </Link>
        <Link to="/teams" className="block hover:text-indigo-300">
          Teams
        </Link>
        <Link to="/logs" className="block hover:text-indigo-300">
          Logs
        </Link>
      </nav>
    </div>
  );
}
