export default function DocumentItem({
  title,
  description,
  uploaded,
  onUpload,
}) {
  return (
    <div className="flex items-center justify-between gap-4 border rounded-xl p-4">
      {/* LEFT */}
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
          📄
        </div>

        <div>
          <p className="font-medium text-gray-900">{title}</p>
          <p className="text-sm text-gray-500">{description}</p>

          {!uploaded && (
            <p className="text-xs text-red-500 mt-1">Required</p>
          )}
        </div>
      </div>

      {/* RIGHT */}
      {uploaded ? (
        <span className="px-4 py-1.5 text-sm bg-green-100 text-green-700 rounded-full font-medium">
          Uploaded ✓
        </span>
      ) : (
        <label className="relative cursor-pointer">
          <input
            type="file"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={onUpload}
          />
          <span className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Choose File
          </span>
        </label>
      )}
    </div>
  );
}
