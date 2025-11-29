import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function RegisterOrg() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    organisation_name: "",
    admin_name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const payload = {
      orgName: form.organisation_name,
      adminName: form.admin_name,
      email: form.email,
      password: form.password,
    };

    try {
      const res = await api.post("/auth/register", payload, { skipSnake: true });
      login(res.data.token);
      navigate("/");
    } catch (err) {
      console.error("REGISTER ERROR:", err);
      setError("Could not register organisation. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Register Organisation
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 p-2 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="organisation_name"
            placeholder="Organisation Name"
            value={form.organisation_name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
          />

          <input
            type="text"
            name="admin_name"
            placeholder="Admin Name"
            value={form.admin_name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
          />

          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
          />

          <input
            type="password"
            name="password"
            placeholder="Admin Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
          >
            Create Organisation
          </button>
        </form>

        <p className="text-center text-sm text-slate-600 mt-4">
          Already registered?{" "}
          <button
            className="text-indigo-600 font-medium"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
