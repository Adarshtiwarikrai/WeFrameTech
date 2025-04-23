import { EyeIcon, ImageIcon, MoreVerticalIcon } from './Font';
import Image from 'next/image';

function StoryCard({ story }) {
  return (
    <div className="relative h-80 rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      {/* Optimized Image */}
      <Image
        src={story.image || "/api/placeholder/400/320"}
        alt={story.title}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        quality={80}
        priority={story.id <= 4}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70" />

      {/* Top action buttons */}
      <div className="absolute top-2 right-2 z-10 flex space-x-1">
        <button className="hover:bg-white flex items-center justify-center">
          <EyeIcon />
        </button>
        <button className="w-6 h-6 rounded-md bg-white/80 p-1 backdrop-blur-sm hover:bg-white flex items-center justify-center">
          <ImageIcon className="h-4 w-4 text-black" />
        </button>
      </div>
      {/* Card footer */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-3">
        {/* Title */}
        <h3 className="mb-1 line-clamp-2 text-lg font-medium text-white">
          {story.title}
        </h3>

        {/* Meta info */}
        <div className="mb-2 flex items-center justify-between text-xs">
          <div className="text-gray-200">
            <span className="font-bold">{story.category}</span>
            <span className="mx-2 text-gray-400">•</span>
            <span>{story.date}</span>
          </div>
          <span
            className={`rounded-md px-2 py-1 text-xs capitalize ${
              story.status === "published"
                ? "bg-green-100 text-green-800"
                : story.status === "draft"
                ? "bg-gray-100 text-gray-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {story.status}
          </span>
        </div>

        {/* Footer action buttons */}
        <div className="flex justify-between gap-2">
          <button 
            className="flex-1 rounded-md border border-gray-300 bg-blue-100 px-4 py-2 text-sm font-medium text-black hover:bg-white transition-colors"
            aria-label="View story"
          >
            View
          </button>
          <button 
            className="rounded-md bg-white/90 p-2 text-gray-700 hover:bg-white transition-colors flex items-center justify-center"
            aria-label="More options"
          >
            <MoreVerticalIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default StoryCard;