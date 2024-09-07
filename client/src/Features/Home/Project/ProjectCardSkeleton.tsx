export default function ProjectCardSkeleton() {
  return (
    <div className="relative backdrop-blur-md bg-[#00041b]/30 rounded-lg p-6 shadow-lg border border-[#00041b]/50 overflow-hidden animate-pulse">
    {/* Image placeholder */}
    <div className="w-full h-48 bg-gray-700 rounded-t-lg mb-4"></div>
    
    {/* Title placeholder */}
    <div className="h-8 bg-gray-700 rounded w-3/4 mb-4"></div>
    
    {/* Description placeholder */}
    <div className="space-y-2">
      <div className="h-4 bg-gray-700 rounded"></div>
      <div className="h-4 bg-gray-700 rounded w-5/6"></div>
      <div className="h-4 bg-gray-700 rounded w-4/6"></div>
    </div>
    
    {/* Technologies placeholder */}
    <div className="mt-6">
      <div className="h-6 bg-gray-700 rounded w-1/3 mb-2"></div>
      <div className="flex flex-wrap gap-2">
        {[1, 2, 3, 4].map((index) => (
          <div key={index} className="h-8 w-20 bg-gray-700 rounded-full"></div>
        ))}
      </div>
    </div>
  </div>
  )
}
