import React, { useState, useRef, useEffect } from "react";
import * as documentApi from "../api/documentApi";
import { fetchApplications as fetchAppsFromMock } from "../api/mockApi";

export default function DocumentUploadPanel() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loanId, setLoanId] = useState("");
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");
  const [applications, setApplications] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    fetchAppsFromMock().then((list) => {
      if (list?.length) {
        setApplications(list);
        setLoanId(list[0].id);
      }
    });
  }, []);

  async function handleUpload(e) {
    e?.preventDefault();
    if (!selectedFile || !loanId) {
      setStatusMessage("Select a loan and a file to upload.");
      return;
    }

    setStatusMessage("Uploading...");
    setProgress(0);

    try {
      await documentApi.uploadDocument(loanId, selectedFile, {
        uploadedBy: "frontend",
      });
      setProgress(100);
      setStatusMessage("Uploaded successfully. Verification in progress.");
    } catch (err) {
      console.error(err);
      setStatusMessage("Upload failed. Try again.");
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setSelectedFile(file);
      setStatusMessage(`Selected ${file.name}`);
    }
  }

  function handleSelectFile(e) {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setStatusMessage(`Selected ${file.name}`);
    }
  }

  function clearFile() {
    setSelectedFile(null);
    setProgress(0);
    setStatusMessage("Cleared");
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="panel" role="region" aria-label="Document upload">
      <h3 style={{ marginTop: 0, color: "var(--primary)" }}>
        Upload Documents
      </h3>
      <div className="small">
        Drag & drop or choose files to satisfy document requests.
      </div>

      <form onSubmit={handleUpload} style={{ marginTop: 12 }}>
        <div style={{ marginBottom: 8 }}>
          <label className="small">Select application</label>
          <br />
          <select
            value={loanId}
            onChange={(e) => setLoanId(e.target.value)}
            aria-label="Select loan"
          >
            {applications.map((a) => (
              <option key={a.id} value={a.id}>
                {a.id} • ₹{a.amount.toLocaleString()}
              </option>
            ))}
          </select>
        </div>

        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          style={{
            border: "2px dashed #e6eef8",
            borderRadius: 10,
            padding: 18,
            textAlign: "center",
            marginBottom: 12,
          }}
        >
          <div className="small">Drop files here</div>
          <div style={{ marginTop: 8 }}>
            <input
              ref={inputRef}
              type="file"
              onChange={handleSelectFile}
              aria-label="Select document file"
            />
          </div>

          {selectedFile && (
            <div style={{ marginTop: 8 }}>
              {selectedFile.name} •{" "}
              {(selectedFile.size / 1024).toFixed(1)} KB
            </div>
          )}
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <button type="submit" className="btn primary">
            Upload
          </button>
          <button
            type="button"
            className="btn ghost"
            onClick={clearFile}
          >
            Clear
          </button>
        </div>

        {statusMessage && (
          <div className="small" style={{ marginTop: 12 }}>
            {statusMessage}
          </div>
        )}

        {progress > 0 && (
          <div className="small" style={{ marginTop: 4 }}>
            Progress: {progress}%
          </div>
        )}
      </form>
    </div>
  );
}
