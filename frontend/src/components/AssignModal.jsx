// frontend/src/components/AssignModal.jsx
import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

export default function AssignModal({ team, employees, onClose, onUpdated }) {
  const [selected, setSelected] = useState("");

  const members = team.employees || team.Employees || [];
  const assignedIds = members.map((e) => e.id);

  const handleAssign = async () => {
    if (!selected) return toast.error("Select an employee");

    try {
      // send employee_id (already snake_case, interceptor will leave as is)
      await api.post(`/teams/${team.id}/assign`, {
        employee_id: selected,
      });

      toast.success("Employee assigned");
      await onUpdated();
      onClose();
    } catch (err) {
      console.error("ASSIGN FAILED:", err);
      toast.error("Assignment failed");
    }
  };

  const handleUnassign = async (empId) => {
    try {
      // DELETE with body -> axios uses { data: ... }
      await api.delete(`/teams/${team.id}/unassign`, {
        data: { employee_id: empId },
      });

      toast.success("Employee unassigned");
      await onUpdated();
      onClose();
    } catch (err) {
      console.error("UNASSIGN FAILED:", err);
      toast.error("Unassign failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">
          Manage Team: {team.name}
        </h3>

        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="w-full border p-2 rounded mb-3"
        >
          <option value="">Select Employee</option>
          {employees
  .filter((emp) => !assignedIds.includes(emp.id))
  .map((emp) => (
    <option key={emp.id} value={emp.id}>
      {(emp.first_name || emp.firstName || "")} {(emp.last_name || emp.lastName || "")}
      {(!emp.first_name && !emp.firstName) ? emp.email : ""}
    </option>
))}

        </select>

        <button
          onClick={handleAssign}
          className="w-full bg-indigo-600 text-white py-2 rounded mb-4"
        >
          Assign Employee
        </button>

        {members.length > 0 && (
          <div className="space-y-2">
            <p className="font-semibold">Current Members</p>

            {members.map((emp) => (
              <div
                key={emp.id}
                className="flex justify-between text-sm border p-2 rounded"
              >
                <span>
                  {emp.first_name} {emp.last_name}
                  <span className="text-xs text-slate-500">
                    {" "}
                    ({emp.email})
                  </span>
                </span>
                <button
                  onClick={() => handleUnassign(emp.id)}
                  className="text-red-600 text-xs"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-4 w-full border py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}
