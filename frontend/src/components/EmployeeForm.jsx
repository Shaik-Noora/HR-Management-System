import { useEffect, useState } from "react";

export default function EmployeeForm({
  initialData,
  onSubmit,
  onCancel,
  teams = [],
}) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [selectedTeams, setSelectedTeams] = useState([]);

  useEffect(() => {
    if (initialData) {
      setForm({
        firstName: initialData.first_name || initialData.firstName || "",
        lastName: initialData.last_name || initialData.lastName || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
      });

      const assigned =
        initialData.teams ||
        initialData.Teams ||
        [];

      setSelectedTeams(assigned.map((t) => t.id));
    }
  }, [initialData]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const toggleTeam = (teamId) => {
    setSelectedTeams((prev) =>
      prev.includes(teamId)
        ? prev.filter((id) => id !== teamId)
        : [...prev, teamId]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      teamIds: selectedTeams,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        <h2 className="text-lg font-semibold mb-4">
          {initialData ? "Edit Employee" : "Add Employee"}
        </h2>

        <form className="space-y-3" onSubmit={handleSubmit}>
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="First name"
            className="w-full border rounded-lg px-3 py-2"
          />
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Last name"
            className="w-full border rounded-lg px-3 py-2"
          />
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border rounded-lg px-3 py-2"
          />
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full border rounded-lg px-3 py-2"
          />

          <div className="border rounded-lg p-3">
            <p className="text-sm font-semibold mb-2">Assign to Teams</p>
            <div className="space-y-1 max-h-40 overflow-y-auto">
              {teams.map((team) => (
                <label
                  key={team.id}
                  className="flex items-center gap-2 text-sm"
                >
                  <input
                    type="checkbox"
                    checked={selectedTeams.includes(team.id)}
                    onChange={() => toggleTeam(team.id)}
                  />
                  {team.name}
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border rounded-lg text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
