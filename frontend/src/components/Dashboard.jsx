import { useEffect, useState } from "react";
import api from "../services/api";
import Loader from "./Loader";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [stats, setStats] = useState({
    employees: 0,
    teams: 0,
    logs: 0,
  });

  const [loading, setLoading] = useState(true);

  const loadStats = async () => {
    try {
      setLoading(true);

      const [empRes, teamRes, logRes] = await Promise.all([
        api.get("/employees"),
        api.get("/teams"),
        api.get("/logs"),
      ]);

      setStats({
        employees: empRes.data.length || 0,
        teams: teamRes.data.length || 0,
        logs: logRes.data.length || 0,
      });
    } catch (err) {
      console.error("Dashboard load error:", err);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-slate-500 text-sm">Total Employees</p>
          <p className="text-3xl font-bold">{stats.employees}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-slate-500 text-sm">Total Teams</p>
          <p className="text-3xl font-bold">{stats.teams}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-slate-500 text-sm">Log Entries</p>
          <p className="text-3xl font-bold">{stats.logs}</p>
        </div>
      </div>
    </div>
  );
}
