import Header from "../components/Header";
import UserDashboard from "../components/UserDashboard";
import MainChat from "../components/MainChat";

export default function App() {
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* HEADER */}
      <Header />

      {/* MAIN LAYOUT */}
      <div className="flex flex-1 overflow-hidden">
        {/* LEFT SIDEBAR */}
        <div className="hidden md:block">
          <UserDashboard />
        </div>

        {/* CHAT AREA */}
        <main className="flex-1 overflow-hidden">
          <MainChat />
        </main>
      </div>
    </div>
  );
}
