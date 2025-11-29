import { useEffect, useState } from "react";
import api from "../services/api";
import Loader from "./Loader";
import toast from "react-hot-toast";

export default function Logs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadLogs = async () => {
    try {
      setLoading(true);
      const res = await api.get("/logs");
      setLogs(res.data || []);
    } catch (err) {
      console.error("Failed to load logs", err);
      toast.error("Failed to load logs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  const formatMeta = (meta) => {
    if (!meta) return "-";
    if (typeof meta === "object") return JSON.stringify(meta);
    try {
      const parsed = JSON.parse(meta);
      return JSON.stringify(parsed);
    } catch {
      return String(meta);
    }
  };

  // ✅ Unified timestamp formatter
  const formatTime = (ts) => {
    if (!ts) return "-";
    const d = new Date(ts);
    if (Number.isNaN(d.getTime())) return "-";
    return d.toLocaleString();
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Activity Logs</h2>
      </div>

      {loading ? (
        <Loader />
      ) : logs.length === 0 ? (
        <p className="text-slate-500">No logs yet.</p>
      ) : (
        <div className="overflow-x-auto bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                <th className="px-4 py-2 text-left">Action</th>
                <th className="px-4 py-2 text-left">User</th>
                <th className="px-4 py-2 text-left">Organisation</th>
                <th className="px-4 py-2 text-left">Meta</th>
                <th className="px-4 py-2 text-left">Time</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr
                  key={log.id}
                  className="border-t border-slate-100 dark:border-slate-800"
                >
                  <td className="px-4 py-2">{log.action}</td>
                  <td className="px-4 py-2">{log.userId || "-"}</td>
                  <td className="px-4 py-2">{log.organisationId || "-"}</td>
                  <td className="px-4 py-2 max-w-xs truncate">
                    <span title={formatMeta(log.meta)}>
                      {formatMeta(log.meta)}
                    </span>
                  </td>

                  {/* ✅ FINAL, CORRECT TIME SIGNAL */}
                  <td className="px-4 py-2">
                    {formatTime(log.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
