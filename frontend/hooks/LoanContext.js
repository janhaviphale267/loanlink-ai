import { createContext, useContext } from "react";
import useLoan from "./useLoan";
import useChat from "./useChat";

const LoanContext = createContext(null);

export function LoanProvider({ children }) {
  const loan = useLoan();      
  const chat = useChat();      

  return (
    <LoanContext.Provider
      value={{
        // Loan
        applicationId: loan.applicationId,
        summary: loan.summary,
        loanLoading: loan.loading,
        loanError: loan.error,
        startApplication: loan.startApplication,
        resetApplication: loan.resetApplication,

        // Chat
        messages: chat.messages,
        chatLoading: chat.loading,
        chatError: chat.error,
        sendMessage: chat.sendMessage,
        resetChat: chat.resetChat,
      }}
    >
      {children}
    </LoanContext.Provider>
  );
}

export function useLoanContext() {
  const ctx = useContext(LoanContext);
  if (!ctx) {
    throw new Error("useLoanContext must be used within LoanProvider");
  }
  return ctx;
}
