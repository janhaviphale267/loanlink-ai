const mockApplications = [
  {
    id: "LN-001",
    amount: 500000,
    tenureMonths: 60,
    status: "Under Review",
    risk: "Medium",
    emi: 9500,
    interestRate: 8.5,
    dti: 28,
    confidence: 0.72,
    lastActivity: new Date().toISOString(),
  },
  {
    id: "LN-002",
    amount: 200000,
    tenureMonths: 36,
    status: "Applied",
    risk: "Low",
    emi: 6100,
    interestRate: 7.9,
    dti: 20,
    confidence: 0.88,
    lastActivity: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString(),
  },
];

const mockConversations = {
  "session-1": [
    {
      id: "m1",
      from: "ai",
      text: "Hello! I am LoanLink. How can I help you today?",
      meta: { confidence: 0.92 },
      ts: Date.now() - 60000,
    },
  ],
};

const mockDocuments = {};

function delay(ms = 250) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/* ---------------- CHAT ---------------- */

export async function sendChatMessage(sessionId = "session-1", message) {
  await delay(350);

  const userMsg = {
    id: `m${Date.now()}`,
    from: "user",
    text: message,
    ts: Date.now(),
  };

  mockConversations[sessionId] = mockConversations[sessionId] || [];
  mockConversations[sessionId].push(userMsg);

  const aiMsg = {
    id: `m${Date.now() + 1}`,
    from: "ai",
    text: `Mock reply to: "${message}"`,
    meta: { confidence: 0.8 },
    ts: Date.now() + 100,
  };

  mockConversations[sessionId].push(aiMsg);

  return {
    message: aiMsg,
    conversation: mockConversations[sessionId],
  };
}

export async function getConversation(sessionId = "session-1", limit = 100) {
  await delay(120);
  return (mockConversations[sessionId] || []).slice(-limit);
}

export async function startSession(userId = "user-1") {
  await delay(200);
  const sessionId = `session-${Date.now()}`;
  mockConversations[sessionId] = [
    {
      id: `m${Date.now()}`,
      from: "ai",
      text: "Session started. How can I help?",
      ts: Date.now(),
    },
  ];
  return { sessionId };
}

/* ---------------- LOANS ---------------- */

export async function fetchApplications() {
  await delay(200);
  return mockApplications;
}

export async function getApplication(loanId) {
  await delay(120);
  return mockApplications.find((a) => a.id === loanId) || null;
}

export async function createApplication(payload = {}) {
  await delay(300);

  const amount = payload.amount || 100000;
  const tenure = payload.tenureMonths || 36;

  const app = {
    id: `LN-${Math.floor(Math.random() * 900 + 100)}`,
    amount,
    tenureMonths: tenure,
    status: "Applied",
    risk: "Pending",
    emi: Math.round(amount / tenure),
    interestRate: 8.5,
    dti: 25,
    confidence: 0.5,
    lastActivity: new Date().toISOString(),
    ...payload,
  };

  mockApplications.unshift(app);
  return app;
}

export async function updateApplication(loanId, updates = {}) {
  await delay(200);
  const idx = mockApplications.findIndex((a) => a.id === loanId);
  if (idx === -1) throw new Error("Not found");

  mockApplications[idx] = {
    ...mockApplications[idx],
    ...updates,
    lastActivity: new Date().toISOString(),
  };

  return mockApplications[idx];
}

export async function updateStatus(loanId, status) {
  return updateApplication(loanId, { status });
}

/* ---------------- DOCUMENTS ---------------- */

export async function uploadDocument(loanId, file, metadata = {}) {
  await delay(500);

  const id = `doc-${Date.now()}`;
  mockDocuments[id] = {
    id,
    loanId,
    name: file?.name || metadata?.name || "uploaded-file.pdf",
    status: "Pending",
    uploadedAt: new Date().toISOString(),
    metadata,
  };

  return mockDocuments[id];
}

export async function listDocuments(loanId) {
  await delay(150);
  return Object.values(mockDocuments).filter((d) => d.loanId === loanId);
}

export async function verifyDocument(documentId) {
  await delay(600);
  if (!mockDocuments[documentId]) throw new Error("Document not found");

  mockDocuments[documentId].status = "Verified";
  mockDocuments[documentId].verifiedAt = new Date().toISOString();

  return mockDocuments[documentId];
}

/* ---------------- ADMIN ---------------- */

export async function fetchAdminApplications(filters = {}) {
  await delay(200);

  let results = [...mockApplications];
  if (filters.risk) results = results.filter((r) => r.risk === filters.risk);
  if (filters.status)
    results = results.filter((s) => s.status === filters.status);

  return results;
}

export async function getAuditTrail(loanId) {
  await delay(200);
  return [
    {
      ts: Date.now() - 48 * 3600_000,
      actor: "system",
      action: "application_submitted",
      details: {},
    },
    {
      ts: Date.now() - 24 * 3600_000,
      actor: "loan-bot",
      action: "initial_scoring",
      details: { score: 0.72 },
    },
  ];
}

export async function overrideDecision(loanId, payload = {}) {
  await delay(300);
  const app = mockApplications.find((a) => a.id === loanId);
  if (!app) throw new Error("Loan not found");

  app.status = payload.status || app.status;
  return { success: true, application: app };
}

export async function fetchRecommendations(loanId) {
  await delay(200);
  return {
    loanId,
    recommendedAction: "Request more docs",
    confidence: 0.67,
  };
}
