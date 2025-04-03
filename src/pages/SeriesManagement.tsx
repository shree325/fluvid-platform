import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  Calendar,
  Play,
  Folder,
  FolderPlus,
  Edit,
  Settings,
  List,
  Grid,
  Filter,
} from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import SeriesCard from '@/components/series/SeriesCard';
import CreateSeriesDialog from '@/components/series/CreateSeriesDialog';

type SeriesStatus = 'published' | 'draft' | 'scheduled';
type MonetizationType = 'free' | 'subscription' | 'pay-per-view';

const series = [
  {
    id: "1",
    title: "Web Development Fundamentals",
    description: "Learn the basics of HTML, CSS, and JavaScript",
    thumbnail: "https://via.placeholder.com/300x200",
    category: "technology",
    seasons: 2,
    episodes: 24,
    views: 150000,
    createdAt: "2022-11-15",
    monetization: "free" as "free" | "subscription" | "pay-per-view",
    status: "published" as "published" | "draft" | "scheduled",
  },
  {
    id: "2",
    title: "Advanced React Patterns",
    description: "Dive deep into advanced React concepts and patterns",
    thumbnail: "https://via.placeholder.com/300x200",
    category: "technology",
    seasons: 1,
    episodes: 12,
    views: 75000,
    createdAt: "2023-01-20",
    monetization: "subscription" as "free" | "subscription" | "pay-per-view",
    status: "published" as "published" | "draft" | "scheduled",
  },
  {
    id: "3",
    title: "Content Creation Masterclass",
    description: "Learn how to create engaging video content",
    thumbnail: "https://via.placeholder.com/300x200",
    category: "creativity",
    seasons: 3,
    episodes: 36,
    views: 200000,
    createdAt: "2022-09-05",
    monetization: "pay-per-view" as "free" | "subscription" | "pay-per-view",
    status: "scheduled" as "published" | "draft" | "scheduled",
  },
  {
    id: "4",
    title: "Customer Success Stories",
    description: "Case studies and success stories",
    thumbnail: "https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "Case Studies",
    seasons: 1,
    episodes: 6,
    views: 8700,
    createdAt: "2023-10-18",
    monetization: "free" as MonetizationType,
    status: "draft" as SeriesStatus,
  },
];

const SeriesManagement = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [seriesList, setSeriesList] = useState(series);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleCreateSeries = (seriesData: any) => {
    const newSeries = {
      id: Date.now().toString(),
      ...seriesData,
      seasons: 0,
      episodes: 0,
      views: 0,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'draft' as SeriesStatus,
      monetization: (seriesData.monetization || 'free') as MonetizationType
    };
    
    setSeriesList([newSeries, ...seriesList]);
    toast.success('Series created successfully!');
    setIsCreateDialogOpen(false);
  };

  const handleSeriesClick = (seriesId: string) => {
    navigate(`/series/${seriesId}`);
  };

  const filteredSeries = filterStatus === 'all' 
    ? seriesList 
    : seriesList.filter(series => series.status === filterStatus);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Series Management</h1>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewMode('grid')}
            className={viewMode === 'grid' ? 'bg-accent' : ''}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline"
            size="icon"
            onClick={() => setViewMode('list')}
            className={viewMode === 'list' ? 'bg-accent' : ''}
          >
            <List className="h-4 w-4" />
          </Button>
          
          <Button
            onClick={() => setIsCreateDialogOpen(true)}
            className="gap-2"
          >
            <FolderPlus className="h-4 w-4" />
            Create Series
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Tabs defaultValue="all" className="w-[400px]" onValueChange={setFilterStatus}>
          <TabsList>
            <TabsTrigger value="all">All Series</TabsTrigger>
            <TabsTrigger value="published">Published</TabsTrigger>
            <TabsTrigger value="draft">Drafts</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex items-center gap-2">
          <Input 
            placeholder="Search series..." 
            className="w-[250px]" 
          />
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3' : 'grid-cols-1'}`}>
        {filteredSeries.map((series) => (
          <SeriesCard
            key={series.id}
            series={series}
            onClick={() => handleSeriesClick(series.id)}
            layout={viewMode}
          />
        ))}
      </div>
      
      <CreateSeriesDialog 
        open={isCreateDialogOpen} 
        onClose={() => setIsCreateDialogOpen(false)}
        onCreateSeries={handleCreateSeries} 
      />
    </div>
  );
};

export default SeriesManagement;
