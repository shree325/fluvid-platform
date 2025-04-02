
import { useState } from 'react';
import { Grid, ListFilter } from 'lucide-react';
import VideoFilter from '../components/VideoFilter';
import VideoCard from '../components/VideoCard';
import ImportVideoDialog from '../components/ImportVideoDialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

// Mock data
const mockVideos = [
  {
    id: '1',
    title: 'How to Create Interactive Product Tutorials',
    thumbnail: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    duration: '12:34',
    views: 45689,
    likes: 2345,
    createdAt: '2023-10-15',
    interactive: true,
    category: 'tutorials',
  },
  {
    id: '2',
    title: 'Enterprise Onboarding Video Series - Part 1',
    thumbnail: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    duration: '08:21',
    views: 12050,
    likes: 932,
    createdAt: '2023-10-12',
    interactive: false,
    category: 'marketing',
  },
  {
    id: '3',
    title: 'Customer Success Story: How XYZ Improved Conversion by 300%',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    duration: '15:49',
    views: 8726,
    likes: 1243,
    createdAt: '2023-10-08',
    interactive: true,
    category: 'marketing',
  },
  {
    id: '4',
    title: 'Advanced Video Editing Techniques for Marketers',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    duration: '22:15',
    views: 32456,
    likes: 4532,
    createdAt: '2023-10-05',
    interactive: false,
    category: 'tutorials',
  },
  {
    id: '5',
    title: 'Interactive Quiz: Test Your Product Knowledge',
    thumbnail: 'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    duration: '05:30',
    views: 15678,
    likes: 2876,
    createdAt: '2023-10-01',
    interactive: true,
    category: 'educational',
  },
  {
    id: '6',
    title: 'New Feature Tutorial: Branching Scenarios',
    thumbnail: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    duration: '10:12',
    views: 9872,
    likes: 1564,
    createdAt: '2023-09-28',
    interactive: true,
    category: 'product',
  },
];

const Dashboard = () => {
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [videos, setVideos] = useState(mockVideos);
  const [filteredVideos, setFilteredVideos] = useState(mockVideos);

  const handleImport = (videoData: any) => {
    const newVideo = {
      id: videoData.id,
      title: videoData.title,
      thumbnail: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      duration: '00:00',
      views: 0,
      likes: 0,
      createdAt: new Date().toISOString().split('T')[0],
      interactive: false,
      category: 'uncategorized',
    };
    
    setVideos([newVideo, ...videos]);
    setFilteredVideos([newVideo, ...filteredVideos]);
    
    toast.success('Video imported successfully!');
  };

  const handleFilterChange = (filters: any) => {
    // Apply filters to videos
    console.log('Filters applied:', filters);
    // For demo, just show a toast
    toast('Filters applied');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Your Videos</h1>
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
            <ListFilter className="h-4 w-4" />
          </Button>
          
          <ImportVideoDialog onImport={handleImport} />
        </div>
      </div>

      <VideoFilter onFilterChange={handleFilterChange} />
      
      <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1'}`}>
        {filteredVideos.map((video) => (
          <VideoCard
            key={video.id}
            id={video.id}
            title={video.title}
            thumbnail={video.thumbnail}
            duration={video.duration}
            views={video.views}
            likes={video.likes}
            createdAt={video.createdAt}
            interactive={video.interactive}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
