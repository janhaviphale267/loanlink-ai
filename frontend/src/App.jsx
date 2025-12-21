import Header from "../components/Header";
import UserDashboard from "../components/UserDashboard";
import MainChat from "../components/MainChat";
import { LoanProvider } from "../hooks/LoanContext";
import { AuthProvider, useAuth } from "../hooks/AuthContext";

function GuardedApp() {
  const { user } = useAuth();

  if (!user?.isAuthenticated) {
    return (
      <div className="h-screen flex items-center justify-center text-sm text-gray-600">
        Please sign in to continue.
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Header userName={user.name} role={user.role} />
      <div className="flex flex-1 overflow-hidden">
        <div className="hidden md:block">
          <UserDashboard />
        </div>
        <main className="flex-1 overflow-hidden">
          <MainChat />
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <LoanProvider>
        <GuardedApp />
      </LoanProvider>
    </AuthProvider>
  );
}
