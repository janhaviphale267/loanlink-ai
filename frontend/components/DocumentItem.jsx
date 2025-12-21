export default function DocumentItem({
  title,
  description,
  uploaded,
  onUpload,
}) {
  return (
    <div className="flex items-center justify-between border rounded-lg p-4">
      <div>
        <p className="font-medium text-gray-900">{title}</p>
        <p className="text-sm text-gray-500">
          {description} <span className="text-red-500">*</span>
        </p>
      </div>

      {uploaded ? (
        <span className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full">
          Uploaded
        </span>
      ) : (
        <input
          type="file"
          onChange={onUpload}
          className="text-sm"
        />
      )}
    </div>
  );
}
