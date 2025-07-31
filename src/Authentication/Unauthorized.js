export default function Unauthorized() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-red-600">
        🚫 Access Denied — You don’t have permission to view this page
      </h1>
    </div>
  );
}
