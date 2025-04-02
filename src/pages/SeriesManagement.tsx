
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

// Define proper types
type SeriesStatus = 'published' | 'draft' | 'scheduled';
type MonetizationType = 'free' | 'subscription' | 'pay-per-view';

// Mock data for series
const mockSeries = [
  {
    id: '1',
    title: 'Product Mastery Course',
    description: 'Complete guide to mastering our product suite',
    thumbnail: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'Educational',
    seasons: 2,
    episodes: 12,
    views: 34500,
    createdAt: '2023-08-10',
    monetization: 'subscription' as MonetizationType,
    status: 'published' as SeriesStatus,
  },
  {
    id: '2',
    title: 'Marketing Strategies',
    description: 'Advanced marketing techniques for growth',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'Marketing',
    seasons: 1,
    episodes: 8,
    views: 21300,
    createdAt: '2023-09-05',
    monetization: 'free' as MonetizationType,
    status: 'published' as SeriesStatus,
  },
  {
    id: '3',
    title: 'Developer Workshop',
    description: 'Hands-on development tutorials',
    thumbnail: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'Technical',
    seasons: 3,
    episodes: 24,
    views: 52100,
    createdAt: '2023-07-22',
    monetization: 'pay-per-view' as MonetizationType,
    status: 'published' as SeriesStatus,
  },
  {
    id: '4',
    title: 'Customer Success Stories',
    description: 'Case studies and success stories',
    thumbnail: 'https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'Case Studies',
    seasons: 1,
    episodes: 6,
    views: 8700,
    createdAt: '2023-10-18',
    monetization: 'free' as MonetizationType,
    status: 'draft' as SeriesStatus,
  },
];

const SeriesManagement = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [seriesList, setSeriesList] = useState(mockSeries);
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
      status: 'draft' as SeriesStatus, // Cast to specific string literal type
      monetization: (seriesData.monetization || 'free') as MonetizationType // Ensure proper type casting
    };
    
    setSeriesList([newSeries, ...seriesList]);
    toast.success('Series created successfully!');
    setIsCreateDialogOpen(false);
  };

  const handleSeriesClick = (seriesId: string) => {
    navigate(`/series/${seriesId}`);
  };

  // Filter series based on status
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
