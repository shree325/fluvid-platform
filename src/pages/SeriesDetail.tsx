
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  PenSquare,
  PlayCircle,
  Plus,
  Calendar,
  Settings,
  FolderPlus,
  Eye,
  ArrowUpDown,
  MoreVertical,
  FileEdit,
  Trash2,
  CalendarClock,
  DollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import EpisodeCard from '@/components/series/EpisodeCard';
import CreateSeasonDialog from '@/components/series/CreateSeasonDialog';
import EditSeriesDialog from '@/components/series/EditSeriesDialog';
import AddEpisodeDialog from '@/components/series/AddEpisodeDialog';
import ScheduleReleaseDialog from '@/components/series/ScheduleReleaseDialog';
import MonetizationSettingsDialog from '@/components/series/MonetizationSettingsDialog';

// Mock data for a specific series
const mockSeriesData = {
  id: '1',
  title: 'Product Mastery Course',
  description: 'Complete guide to mastering our product suite with in-depth tutorials and real-world examples. Learn from experts and advance your skills.',
  thumbnail: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  category: 'Educational',
  views: 34500,
  createdAt: '2023-08-10',
  updatedAt: '2023-11-15',
  monetization: 'subscription',
  price: 29.99,
  status: 'published',
  author: 'John Smith',
  tags: ['product', 'tutorial', 'mastery', 'course'],
};

// Mock data for seasons
const mockSeasons = [
  {
    id: '1',
    title: 'Getting Started',
    description: 'Introduction to the basics',
    episodeCount: 5,
    releaseDate: '2023-08-15',
    status: 'published',
  },
  {
    id: '2',
    title: 'Advanced Techniques',
    description: 'Deep dive into advanced features',
    episodeCount: 7,
    releaseDate: '2023-09-20',
    status: 'published',
  },
  {
    id: '3',
    title: 'Expert Masterclass',
    description: 'Expert-level techniques and case studies',
    episodeCount: 0,
    releaseDate: '2023-12-25',
    status: 'scheduled',
  }
];

// Mock data for episodes
const mockEpisodes = [
  {
    id: '1',
    seasonId: '1',
    title: 'Introduction to the Platform',
    number: 1,
    duration: '10:45',
    thumbnail: 'https://images.unsplash.com/photo-1591267990532-e5bdb1b0ceb8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    status: 'published',
    videoId: 'video-1',
    views: 15320,
    releaseDate: '2023-08-15',
    isFreePreview: true,
  },
  {
    id: '2',
    seasonId: '1',
    title: 'Setting Up Your Account',
    number: 2,
    duration: '08:23',
    thumbnail: 'https://images.unsplash.com/photo-1472289065668-ce650ac443d2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    status: 'published',
    videoId: 'video-2',
    views: 12800,
    releaseDate: '2023-08-15',
    isFreePreview: false,
  },
  {
    id: '3',
    seasonId: '1',
    title: 'Basic Navigation and Features',
    number: 3,
    duration: '15:18',
    thumbnail: 'https://images.unsplash.com/photo-1579403124614-197f69d8187b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    status: 'published',
    videoId: 'video-3',
    views: 10450,
    releaseDate: '2023-08-22',
    isFreePreview: false,
  },
  {
    id: '4',
    seasonId: '2',
    title: 'Advanced Data Visualization',
    number: 1,
    duration: '22:05',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    status: 'published',
    videoId: 'video-4',
    views: 8700,
    releaseDate: '2023-09-20',
    isFreePreview: true,
  },
  {
    id: '5',
    seasonId: '2',
    title: 'Custom Reporting Tools',
    number: 2,
    duration: '19:47',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    status: 'published',
    videoId: 'video-5',
    views: 7320,
    releaseDate: '2023-09-27',
    isFreePreview: false,
  },
];

const SeriesDetail = () => {
  const { seriesId } = useParams();
  const navigate = useNavigate();
  const [series, setSeries] = useState(mockSeriesData);
  const [seasons, setSeasons] = useState(mockSeasons);
  const [episodes, setEpisodes] = useState(mockEpisodes);
  const [currentSeason, setCurrentSeason] = useState(seasons[0]?.id || 'all');
  
  // Dialog states
  const [isCreateSeasonOpen, setIsCreateSeasonOpen] = useState(false);
  const [isEditSeriesOpen, setIsEditSeriesOpen] = useState(false);
  const [isAddEpisodeOpen, setIsAddEpisodeOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isMonetizationOpen, setIsMonetizationOpen] = useState(false);
  
  const handleGoBack = () => {
    navigate('/series');
  };
  
  const handleEditSeries = (seriesData: any) => {
    setSeries({...series, ...seriesData});
    toast.success('Series updated successfully');
    setIsEditSeriesOpen(false);
  };
  
  const handleCreateSeason = (seasonData: any) => {
    const newSeason = {
      id: Date.now().toString(),
      ...seasonData,
      episodeCount: 0,
    };
    setSeasons([...seasons, newSeason]);
    toast.success(`Season "${seasonData.title}" created successfully`);
    setIsCreateSeasonOpen(false);
  };
  
  const handleAddEpisode = (episodeData: any) => {
    const newEpisode = {
      id: Date.now().toString(),
      seasonId: episodeData.seasonId,
      title: episodeData.title,
      number: episodeData.number,
      duration: '00:00',
      thumbnail: episodeData.thumbnail || 'https://images.unsplash.com/photo-1579403124614-197f69d8187b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      status: 'draft',
      videoId: episodeData.videoId,
      views: 0,
      releaseDate: episodeData.releaseDate || new Date().toISOString().split('T')[0],
      isFreePreview: episodeData.isFreePreview || false,
    };
    
    setEpisodes([...episodes, newEpisode]);
    
    // Update episode count for the season
    const updatedSeasons = seasons.map(season => {
      if (season.id === episodeData.seasonId) {
        return {
          ...season,
          episodeCount: season.episodeCount + 1
        };
      }
      return season;
    });
    setSeasons(updatedSeasons);
    
    toast.success('Episode added successfully');
    setIsAddEpisodeOpen(false);
  };
  
  const handleScheduleRelease = (scheduleData: any) => {
    toast.success('Release schedule updated');
    setIsScheduleOpen(false);
  };
  
  const handleMonetizationSettings = (monetizationData: any) => {
    setSeries({
      ...series,
      monetization: monetizationData.type,
      price: monetizationData.price
    });
    toast.success('Monetization settings updated');
    setIsMonetizationOpen(false);
  };
  
  const filteredEpisodes = currentSeason === 'all'
    ? episodes
    : episodes.filter(episode => episode.seasonId === currentSeason);
  
  const totalViews = episodes.reduce((sum, episode) => sum + episode.views, 0);
  const totalEpisodes = episodes.length;
  const publishedEpisodes = episodes.filter(episode => episode.status === 'published').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={handleGoBack}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-semibold">{series.title}</h1>
        <Badge className={series.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
          {series.status.charAt(0).toUpperCase() + series.status.slice(1)}
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-6">
                <div className="w-1/3 aspect-video rounded-md overflow-hidden">
                  <img 
                    src={series.thumbnail} 
                    alt={series.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <p className="text-muted-foreground mb-4">{series.description}</p>
                  
                  <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Category:</span>
                      <span className="font-medium">{series.category}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Created:</span>
                      <span className="font-medium">{series.createdAt}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Last Updated:</span>
                      <span className="font-medium">{series.updatedAt}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Author:</span>
                      <span className="font-medium">{series.author}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Monetization:</span>
                      <span className="font-medium capitalize">{series.monetization}</span>
                    </div>
                    {series.monetization !== 'free' && (
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Price:</span>
                        <span className="font-medium">${series.price}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    {series.tags.map((tag: string) => (
                      <Badge key={tag} variant="outline" className="capitalize">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => setIsEditSeriesOpen(true)}>
                <PenSquare className="h-4 w-4 mr-2" />
                Edit Series
              </Button>
              <Button variant="outline" onClick={() => setIsScheduleOpen(true)}>
                <Calendar className="h-4 w-4 mr-2" />
                Schedule
              </Button>
              <Button variant="outline" onClick={() => setIsMonetizationOpen(true)}>
                <DollarSign className="h-4 w-4 mr-2" />
                Monetization
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => setIsCreateSeasonOpen(true)}>
                <FolderPlus className="h-4 w-4 mr-2" />
                Add Season
              </Button>
              <Button onClick={() => setIsAddEpisodeOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Episode
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <Tabs value={currentSeason} onValueChange={setCurrentSeason}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Episodes</TabsTrigger>
                {seasons.map((season) => (
                  <TabsTrigger key={season.id} value={season.id}>
                    {season.title}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <TabsContent value={currentSeason} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">
                    {currentSeason === 'all' 
                      ? 'All Episodes'
                      : `${seasons.find(s => s.id === currentSeason)?.title} (${seasons.find(s => s.id === currentSeason)?.episodeCount} Episodes)`}
                  </h3>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <ArrowUpDown className="h-4 w-4 mr-2" />
                      Re-order
                    </Button>
                  </div>
                </div>
                
                {filteredEpisodes.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No episodes found. Add your first episode to get started.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredEpisodes.map((episode) => (
                      <EpisodeCard 
                        key={episode.id} 
                        episode={episode} 
                        seasonTitle={seasons.find(s => s.id === episode.seasonId)?.title || ''}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Series Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total Views</span>
                  <span className="font-semibold">{totalViews.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Seasons</span>
                  <span className="font-semibold">{seasons.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Episodes</span>
                  <span className="font-semibold">{totalEpisodes}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Published</span>
                  <span className="font-semibold">{publishedEpisodes} / {totalEpisodes}</span>
                </div>
              </div>
              
              <Button variant="outline" className="w-full mt-4">
                <Eye className="h-4 w-4 mr-2" />
                View Full Analytics
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Seasons</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[300px]">
                <div className="px-6 divide-y">
                  {seasons.map((season) => (
                    <div key={season.id} className="py-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{season.title}</h4>
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {season.description}
                          </p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <FileEdit className="h-4 w-4 mr-2" />
                              Edit Season
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <CalendarClock className="h-4 w-4 mr-2" />
                              Schedule Release
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Season
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center gap-3 text-xs">
                          <Badge
                            variant="outline"
                            className={season.status === 'published' 
                              ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                              : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                            }
                          >
                            {season.status}
                          </Badge>
                          <span className="text-muted-foreground">
                            {season.episodeCount} {season.episodeCount === 1 ? 'Episode' : 'Episodes'}
                          </span>
                          <span className="text-muted-foreground">
                            Released: {season.releaseDate}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              <div className="p-4 border-t">
                <Button variant="outline" className="w-full" onClick={() => setIsCreateSeasonOpen(true)}>
                  <FolderPlus className="h-4 w-4 mr-2" />
                  Add Season
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Dialogs */}
      <CreateSeasonDialog
        open={isCreateSeasonOpen}
        onClose={() => setIsCreateSeasonOpen(false)}
        onCreateSeason={handleCreateSeason}
      />
      
      <EditSeriesDialog
        open={isEditSeriesOpen}
        onClose={() => setIsEditSeriesOpen(false)}
        onEditSeries={handleEditSeries}
        series={series}
      />
      
      <AddEpisodeDialog
        open={isAddEpisodeOpen}
        onClose={() => setIsAddEpisodeOpen(false)}
        onAddEpisode={handleAddEpisode}
        seasons={seasons}
      />
      
      <ScheduleReleaseDialog
        open={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
        onSchedule={handleScheduleRelease}
        series={series}
        seasons={seasons}
      />
      
      <MonetizationSettingsDialog
        open={isMonetizationOpen}
        onClose={() => setIsMonetizationOpen(false)}
        onSave={handleMonetizationSettings}
        currentSettings={{
          type: series.monetization,
          price: series.price
        }}
      />
    </div>
  );
};

export default SeriesDetail;
