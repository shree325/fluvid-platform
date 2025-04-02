
import { 
  CalendarDays, 
  PlayCircle, 
  Folder, 
  EyeIcon, 
  DollarSign, 
  Clock 
} from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface SeriesProps {
  series: {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    category: string;
    seasons: number;
    episodes: number;
    views: number;
    createdAt: string;
    monetization: 'free' | 'subscription' | 'pay-per-view';
    status: 'published' | 'draft' | 'scheduled';
  };
  onClick: () => void;
  layout: 'grid' | 'list';
}

const SeriesCard = ({ series, onClick, layout }: SeriesProps) => {
  // Helper function to format numbers with commas
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  // Helper function to determine badge color based on monetization type
  const getMonetizationColor = (type: string) => {
    switch (type) {
      case 'free':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'subscription':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'pay-per-view':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };
  
  // Helper function to determine status badge color
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

  if (layout === 'list') {
    return (
      <Card className="cursor-pointer hover:border-primary transition-colors" onClick={onClick}>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="w-24 h-16 rounded-md overflow-hidden flex-shrink-0">
              <img 
                src={series.thumbnail} 
                alt={series.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold truncate">{series.title}</h3>
                <Badge className={getStatusColor(series.status)}>
                  {series.status.charAt(0).toUpperCase() + series.status.slice(1)}
                </Badge>
              </div>
              
              <p className="text-sm text-muted-foreground line-clamp-1">{series.description}</p>
              
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Folder className="h-3 w-3" />
                  <span>{series.seasons} {series.seasons === 1 ? 'Season' : 'Seasons'}</span>
                </div>
                
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <PlayCircle className="h-3 w-3" />
                  <span>{series.episodes} {series.episodes === 1 ? 'Episode' : 'Episodes'}</span>
                </div>
                
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <EyeIcon className="h-3 w-3" />
                  <span>{formatNumber(series.views)} Views</span>
                </div>
                
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Badge className={getMonetizationColor(series.monetization)}>
                    {series.monetization === 'pay-per-view' ? 'Pay Per View' : series.monetization.charAt(0).toUpperCase() + series.monetization.slice(1)}
                  </Badge>
                </div>
              </div>
            </div>
            
            <Button variant="ghost" size="sm">
              Manage
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="cursor-pointer hover:border-primary transition-colors overflow-hidden" onClick={onClick}>
      <div className="relative aspect-video">
        <img 
          src={series.thumbnail} 
          alt={series.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 flex gap-1">
          <Badge className={getMonetizationColor(series.monetization)}>
            {series.monetization === 'pay-per-view' ? 'Pay Per View' : series.monetization.charAt(0).toUpperCase() + series.monetization.slice(1)}
          </Badge>
          <Badge className={getStatusColor(series.status)}>
            {series.status.charAt(0).toUpperCase() + series.status.slice(1)}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold truncate">{series.title}</h3>
          <Badge variant="outline">{series.category}</Badge>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{series.description}</p>
        
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Folder className="h-3 w-3" />
            <span>{series.seasons} {series.seasons === 1 ? 'Season' : 'Seasons'}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <PlayCircle className="h-3 w-3" />
            <span>{series.episodes} {series.episodes === 1 ? 'Episode' : 'Episodes'}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <EyeIcon className="h-3 w-3" />
            <span>{formatNumber(series.views)} Views</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <CalendarDays className="h-3 w-3" />
            <span>{series.createdAt}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button variant="outline" size="sm" className="gap-1">
          <PlayCircle className="h-4 w-4" />
          Preview
        </Button>
        <Button variant="outline" size="sm" className="gap-1">
          Manage
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SeriesCard;
