
import { useState } from 'react';
import { 
  MoreVertical, 
  Play, 
  FileEdit, 
  Eye, 
  CalendarClock, 
  Trash2, 
  Calendar, 
  Clock 
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

interface EpisodeProps {
  episode: {
    id: string;
    seasonId: string;
    title: string;
    number: number;
    duration: string;
    thumbnail: string;
    status: 'published' | 'draft' | 'scheduled';
    videoId: string;
    views: number;
    releaseDate: string;
    isFreePreview: boolean;
  };
  seasonTitle: string;
}

const EpisodeCard = ({ episode, seasonTitle }: EpisodeProps) => {
  const handlePlay = () => {
    toast.info(`Playing episode: ${episode.title}`);
  };
  
  const handleEdit = () => {
    toast.info(`Editing episode: ${episode.title}`);
  };
  
  const handleDelete = () => {
    toast.warning(`This would delete episode: ${episode.title}`);
  };
  
  // Helper function to format views
  const formatViews = (views: number) => {
    return views.toLocaleString();
  };
  
  // Helper function for status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'draft':
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
      case 'scheduled':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  return (
    <Card className="overflow-hidden hover:border-primary transition-colors">
      <CardContent className="p-0">
        <div className="flex items-stretch h-24 sm:h-auto">
          <div className="relative w-36 sm:w-48 flex-shrink-0 overflow-hidden">
            <img 
              src={episode.thumbnail} 
              alt={episode.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <Button 
                variant="secondary" 
                size="icon" 
                className="h-9 w-9 rounded-full bg-white text-black hover:bg-white/90"
                onClick={handlePlay}
              >
                <Play className="h-5 w-5" />
              </Button>
            </div>
            {episode.isFreePreview && (
              <Badge className="absolute top-2 left-2 bg-green-600 hover:bg-green-700">
                Free Preview
              </Badge>
            )}
            <div className="absolute bottom-2 right-2 bg-black/70 px-1.5 py-0.5 rounded text-xs text-white">
              {episode.duration}
            </div>
          </div>
          
          <div className="flex-1 p-4 flex flex-col justify-between">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium px-2 py-0.5 bg-primary/10 text-primary rounded">
                    Episode {episode.number}
                  </span>
                  <Badge className={getStatusColor(episode.status)}>
                    {episode.status.charAt(0).toUpperCase() + episode.status.slice(1)}
                  </Badge>
                </div>
                <h3 className="font-medium line-clamp-1">{episode.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{seasonTitle}</p>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleEdit}>
                    <FileEdit className="h-4 w-4 mr-2" />
                    Edit Episode
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CalendarClock className="h-4 w-4 mr-2" />
                    Schedule
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Eye className="h-4 w-4 mr-2" />
                    View Analytics
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive" onClick={handleDelete}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Episode
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{episode.releaseDate}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                <span>{formatViews(episode.views)} views</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{episode.duration}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EpisodeCard;
