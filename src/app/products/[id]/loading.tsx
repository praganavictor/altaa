export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-8" />

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            <div className="relative aspect-square bg-gray-200 rounded-lg animate-pulse" />

            <div className="flex flex-col">
              <div className="h-8 w-32 bg-gray-200 rounded-full animate-pulse mb-4" />
              <div className="h-10 bg-gray-200 rounded animate-pulse mb-4" />
              <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-6" />
              <div className="h-12 w-32 bg-gray-200 rounded animate-pulse mb-6" />
              <div className="space-y-2 mb-8">
                <div className="h-6 bg-gray-200 rounded animate-pulse" />
                <div className="h-6 bg-gray-200 rounded animate-pulse" />
                <div className="h-6 bg-gray-200 rounded animate-pulse" />
                <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse" />
              </div>
              <div className="h-12 bg-gray-200 rounded-lg animate-pulse mt-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
