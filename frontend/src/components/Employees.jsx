import { useEffect, useState } from "react";
import api from "../services/api";
import EmployeeForm from "./EmployeeForm";
import Loader from "./Loader";
import toast from "react-hot-toast";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const normalizeEmployee = (emp) => ({
    ...emp,
    firstName: emp.first_name || emp.firstName || "",
    lastName: emp.last_name || emp.lastName || "",
    teams: emp.teams || emp.Teams || [],
  });

  const loadData = async () => {
    try {
      setLoading(true);
      const [empRes, teamRes] = await Promise.all([
        api.get("/employees"),
        api.get("/teams"),
      ]);

      const normalized = (empRes.data || []).map(normalizeEmployee);
      setEmployees(normalized);
      setTeams(teamRes.data || []);
    } catch (err) {
      console.error("Failed to load employees/teams", err);
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

  const handleEdit = (emp) => {
    setEditing(emp);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this employee?")) return;
    try {
      await api.delete(`/employees/${id}`);
      toast.success("Employee deleted");
      loadData();
    } catch (err) {
      console.error("Delete failed", err);
      toast.error("Could not delete employee");
    }
  };

  const handleSubmit = async (data) => {
    try {
      const payload = {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone,
        team_ids: data.teamIds,
      };

      if (editing) {
        await api.put(`/employees/${editing.id}`, payload);
        toast.success("Employee updated");
      } else {
        await api.post("/employees", payload);
        toast.success("Employee created");
      }

      setShowForm(false);
      setEditing(null);
      loadData();
    } catch (err) {
      console.error("Save failed", err);
      toast.error("Could not save employee");
    }
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Employees</h2>
        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
        >
          + Add Employee
        </button>
      </div>

      {loading ? (
        <Loader />
      ) : employees.length === 0 ? (
        <p className="text-slate-500">No employees yet.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-sm border">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Phone</th>
                <th className="px-4 py-2 text-left">Teams</th>
                <th className="px-4 py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id} className="border-t">
                  <td className="px-4 py-2">
                    {emp.firstName} {emp.lastName}
                  </td>
                  <td className="px-4 py-2">{emp.email}</td>
                  <td className="px-4 py-2">{emp.phone}</td>
                  <td className="px-4 py-2">
                    {emp.teams.length > 0
                      ? emp.teams.map((t) => t.name).join(", ")
                      : "—"}
                  </td>
                  <td className="px-4 py-2 text-right space-x-2">
                    <button
                      onClick={() => handleEdit(emp)}
                      className="px-3 py-1 text-xs border rounded-lg"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(emp.id)}
                      className="px-3 py-1 text-xs bg-red-500 text-white rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showForm && (
        <EmployeeForm
          initialData={editing}
          teams={teams}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditing(null);
          }}
        />
      )}
    </div>
  );
}
