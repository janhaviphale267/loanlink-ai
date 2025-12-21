import Header from "../components/Header";
import UserDashboard from "../components/UserDashboard";
import MainChat from "../components/MainChat";
import { LoanProvider } from "../hooks/LoanContext";

export default function App() {
  return (
    <LoanProvider>
      <div className="h-screen flex flex-col bg-gray-50">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <div className="hidden md:block">
            <UserDashboard />
          </div>
          <main className="flex-1 overflow-hidden">
            <MainChat />
          </main>
        </div>
      </div>
    </LoanProvider>
  );
}
