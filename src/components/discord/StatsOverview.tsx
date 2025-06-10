import { Users, Star, Activity } from 'lucide-react';
import { DiscordGuildDetails } from '@/lib/discord/types';
import { Skeleton } from '@/components/ui/skeleton';

interface StatsOverviewProps {
  guild?: DiscordGuildDetails;
  className?: string;
  isLoading?: boolean;
}

export function StatsOverview({ guild, className, isLoading }: StatsOverviewProps) {
  if (isLoading) {
    return (
      <div className={`grid grid-cols-2 md:grid-cols-3 gap-4 ${className}`}>
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 gap-4 ${className}`}>
      <div className="bg-gray-800 p-4 rounded-lg">
        <div className="flex items-center">
          <Users className="w-5 h-5 text-blue-500 mr-2" />
          <span className="text-gray-300 text-sm">Membres</span>
        </div>
        <p className="text-white text-2xl font-bold mt-1">
          {guild?.member_count?.toLocaleString() ?? 'N/A'}
        </p>
      </div>
      
      <div className="bg-gray-800 p-4 rounded-lg">
        <div className="flex items-center">
          <Star className="w-5 h-5 text-yellow-500 mr-2" />
          <span className="text-gray-300 text-sm">Boosts</span>
        </div>
        <p className="text-white text-2xl font-bold mt-1">
          {guild?.premium_subscription_count?.toLocaleString() ?? 'N/A'}
        </p>
      </div>
      
      <div className="bg-gray-800 p-4 rounded-lg">
        <div className="flex items-center">
          <Activity className="w-5 h-5 text-green-500 mr-2" />
          <span className="text-gray-300 text-sm">En ligne</span>
        </div>
        <p className="text-white text-2xl font-bold mt-1">
          {guild?.approximate_presence_count?.toLocaleString() ?? 'N/A'}
        </p>
      </div>
    </div>
  );
}