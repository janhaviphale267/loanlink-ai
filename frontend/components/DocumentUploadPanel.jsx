import { useState } from "react";
import { Upload, Mic, CheckCircle } from "lucide-react";
import { useLoanContext } from "../hooks/LoanContext";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export default function DocumentUploadPanel() {
  const { resetChat } = useLoanContext(); // optional future use
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  async function handleUpload() {
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(`${API_BASE}/api/documents/audio`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Audio upload failed");
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-900">
        Upload Audio Document
      </h3>

      <div className="border rounded-lg p-4 bg-gray-50">
        <label className="flex flex-col items-center justify-center gap-2 cursor-pointer">
          <Mic className="text-blue-600" size={20} />
          <span className="text-xs text-gray-600">
            Upload audio file (call recording / voice note)
          </span>
          <input
            type="file"
            accept="audio/*"
            className="hidden"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>

        {file && (
          <p className="text-xs text-gray-500 mt-2">
            Selected: {file.name}
          </p>
        )}
      </div>

      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-2 rounded-md text-sm font-medium"
      >
        <Upload size={14} />
        {uploading ? "Uploading…" : "Upload Audio"}
      </button>

      {error && (
        <p className="text-xs text-red-600">{error}</p>
      )}

      {result && (
        <div className="bg-white border rounded-lg p-3">
          <div className="flex items-center gap-2 text-green-600 text-sm font-medium mb-2">
            <CheckCircle size={16} />
            Audio Processed
          </div>
          <p className="text-xs text-gray-600">
            <span className="font-semibold">Transcript:</span>{" "}
            {result.transcript}
          </p>
        </div>
      )}
    </div>
  );
}
