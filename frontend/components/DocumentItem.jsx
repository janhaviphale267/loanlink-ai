import { Upload, CheckCircle } from "lucide-react";

export default function DocumentItem({
  title,
  description,
  uploaded,
  onUpload,
}) {
  return (
    <div className="flex items-center justify-between gap-4 border rounded-lg p-4">
      {/* LEFT */}
      <div className="flex items-start gap-3 flex-1">
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
          <Upload size={16} className="text-gray-500" />
        </div>

        <div>
          <p className="font-medium text-gray-900">{title}</p>
          <p className="text-sm text-gray-500">{description}</p>

          {!uploaded && (
            <p className="text-xs text-red-500 mt-1">Required</p>
          )}

          {uploaded && (
            <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
              <CheckCircle size={12} />
              Uploaded successfully
            </div>
          )}
        </div>
      </div>

      {/* RIGHT */}
      {!uploaded && (
        <button
          onClick={onUpload}
          className="shrink-0 px-4 py-2 text-sm font-medium
                     bg-blue-600 text-white rounded-md
                     hover:bg-blue-700 whitespace-nowrap"
        >
          Choose File
        </button>
      )}
    </div>
  );
}
