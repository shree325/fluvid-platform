
import { 
  Play, 
  Clock, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Share2, 
  Eye, 
  ThumbsUp 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from './ui/dropdown-menu';

interface VideoCardProps {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: number;
  likes: number;
  createdAt: string;
  interactive?: boolean;
}

const VideoCard = ({ 
  id, 
  title, 
  thumbnail, 
  duration, 
  views, 
  likes, 
  createdAt,
  interactive = false
}: VideoCardProps) => {
  const navigate = useNavigate();

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/editor/${id}`);
  };

  const formatViews = (count: number) => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + 'M';
    }
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count.toString();
  };

  return (
    <Card 
      className="video-card cursor-pointer overflow-hidden h-full" 
      onClick={() => navigate(`/video/${id}`)}
    >
      <div className="relative">
        <img 
          src={thumbnail} 
          alt={title} 
          className="w-full aspect-video object-cover rounded-t-lg"
        />
        <div className="absolute bottom-2 right-2 bg-black/70 px-1.5 py-0.5 rounded text-xs text-white flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          {duration}
        </div>
        {interactive && (
          <div className="absolute top-2 left-2">
            <span className="bg-brand-purple text-white text-xs px-2 py-0.5 rounded-full">
              Interactive
            </span>
          </div>
        )}
      </div>
      <div className="p-3">
        <div className="flex justify-between items-start gap-2">
          <h3 className="text-base font-medium line-clamp-2">{title}</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleEdit}>
                <Edit2 className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={(e) => e.stopPropagation()} 
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="flex items-center gap-3 text-sm text-muted-foreground mt-2">
          <div className="flex items-center gap-1">
            <Eye className="h-3.5 w-3.5" />
            <span>{formatViews(views)}</span>
          </div>
          <div className="flex items-center gap-1">
            <ThumbsUp className="h-3.5 w-3.5" />
            <span>{formatViews(likes)}</span>
          </div>
        </div>
      </div>

      <div className="video-card-overlay">
        <Button size="icon" variant="secondary" className="rounded-full">
          <Play className="h-6 w-6" />
        </Button>
      </div>
    </Card>
  );
};

export default VideoCard;
