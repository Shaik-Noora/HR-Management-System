import { useEffect, useState } from "react";
import api from "../services/api";
import Loader from "./Loader";
import toast from "react-hot-toast";
import TeamForm from "./TeamForm";
import AssignModal from "./AssignModal";

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const [teamRes, empRes] = await Promise.all([
        api.get("/teams"),
        api.get("/employees"),
      ]);

      setTeams(teamRes.data || []);
      setEmployees(empRes.data || []);
    } catch (err) {
      console.error("Failed to load teams/employees", err);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = () => {
    setEditing(null);
    setShowForm(true);
  };

  const handleEdit = (team) => {
    setEditing(team);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this team?")) return;
    try {
      await api.delete(`/teams/${id}`);
      toast.success("Team deleted");
      loadData();
    } catch (err) {
      console.error("Delete failed", err);
      toast.error("Could not delete team");
    }
  };

  const handleSubmit = async (data) => {
    try {
      if (editing) {
        await api.put(`/teams/${editing.id}`, data);
        toast.success("Team updated");
      } else {
        await api.post(`/teams`, data);
        toast.success("Team created");
      }
      setShowForm(false);
      setEditing(null);
      loadData();
    } catch (err) {
      console.error("Save failed", err);
      toast.error("Could not save team");
    }
  };

  const openAssign = (team) => {
    setSelectedTeam(team);
    setShowAssignModal(true);
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Teams</h2>
        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
        >
          + Add Team
        </button>
      </div>

      {loading ? (
        <Loader />
      ) : teams.length === 0 ? (
        <p className="text-slate-500">No teams yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {teams.map((team) => {
            // ✅ NAMING CONVENTION NORMALIZATION
            const members = team.employees || team.Employees || [];

            return (
              <div
                key={team.id}
                className="bg-white dark:bg-slate-900 p-5 rounded-xl shadow-sm border"
              >
                <h3 className="text-xl font-semibold">{team.name}</h3>
                <p className="text-sm text-slate-500 mb-3">
                  {team.description}
                </p>

                {members.length > 0 ? (
                  <div className="mb-3">
                    <p className="text-sm font-semibold">Members:</p>
                    <ul className="list-disc ml-6 text-sm text-slate-600">
                      {members.map((emp) => (
                        <li key={emp.id}>
                          {emp.firstName} {emp.lastName} ({emp.email})
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="text-sm text-slate-400">No members yet.</p>
                )}

                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => openAssign(team)}
                    className="text-indigo-600 text-sm"
                  >
                    Assign / Unassign Employee
                  </button>

                  <div className="space-x-2">
                    <button
                      onClick={() => handleEdit(team)}
                      className="px-3 py-1 text-xs border rounded-lg"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(team.id)}
                      className="px-3 py-1 text-xs bg-red-500 text-white rounded-lg"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showForm && (
        <TeamForm
          initialData={editing}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditing(null);
          }}
        />
      )}

      {showAssignModal && (
        <AssignModal
          team={selectedTeam}
          employees={employees}
          onClose={() => setShowAssignModal(false)}
          onUpdated={loadData}
        />
      )}
    </div>
  );
}
