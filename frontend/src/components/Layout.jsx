import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-100">
      
      {/* ✅ Fixed Sidebar */}
      <Sidebar />

      {/* ✅ Content shifted right to avoid overlap */}
      <div className="ml-60 min-h-screen flex flex-col">
        <Topbar />

        <main className="p-6 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>

    </div>
  );
}
