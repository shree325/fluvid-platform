
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Grid, 
  List, 
  Filter, 
  Plus, 
  Lock, 
  Globe, 
  Eye, 
  EyeOff 
} from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import VideoCard from '@/components/VideoCard';
import { useAuth } from '@/contexts/AuthContext';
import { useRole } from '@/contexts/RoleContext';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import ImportVideoDialog from '@/components/ImportVideoDialog';

// Define video privacy types
type VideoPrivacy = 'public' | 'private' | 'unlisted';

// Mock videos data
const mockVideos = [
  {
    id: '1',
    title: 'How to Create Interactive Product Tutorials',
    thumbnail: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    duration: '12:34',
    views: 45689,
    likes: 2345,
    createdAt: '2023-10-15',
    privacy: 'public' as VideoPrivacy,
    interactive: true,
    ageRestricted: false,
    tags: ['tutorial', 'product', 'interactive']
  },
  {
    id: '2',
    title: 'Enterprise Onboarding Video Series - Part 1',
    thumbnail: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    duration: '08:21',
    views: 12050,
    likes: 932,
    createdAt: '2023-10-12',
    privacy: 'public' as VideoPrivacy,
    interactive: false,
    ageRestricted: false,
    tags: ['enterprise', 'onboarding']
  },
  {
    id: '3',
    title: 'Advanced Video Editing Techniques for Marketers',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    duration: '22:15',
    views: 32456,
    likes: 4532,
    createdAt: '2023-10-05',
    privacy: 'private' as VideoPrivacy,
    interactive: false,
    ageRestricted: false,
    tags: ['editing', 'marketing']
  },
  {
    id: '4',
    title: 'Interactive Quiz: Test Your Product Knowledge',
    thumbnail: 'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    duration: '05:30',
    views: 15678,
    likes: 2876,
    createdAt: '2023-10-01',
    privacy: 'unlisted' as VideoPrivacy,
    interactive: true,
    ageRestricted: true,
    tags: ['quiz', 'product', 'interactive']
  }
];

const MyVideos = () => {
  const { user } = useAuth();
  const { hasPermission } = useRole();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [videos, setVideos] = useState(mockVideos);
  const [filteredVideos, setFilteredVideos] = useState(mockVideos);
  const [privacyFilter, setPrivacyFilter] = useState<string>('all');
  const navigate = useNavigate();

  const handleImport = (videoData: any) => {
    const newVideo = {
      id: Date.now().toString(),
      title: videoData.title,
      thumbnail: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      duration: '00:00',
      views: 0,
      likes: 0,
      createdAt: new Date().toISOString().split('T')[0],
      privacy: 'private' as VideoPrivacy,
      interactive: false,
      ageRestricted: false,
      tags: []
    };
    
    setVideos([newVideo, ...videos]);
    setFilteredVideos([newVideo, ...filteredVideos]);
    
    toast.success('Video imported successfully!');
  };

  const updatePrivacy = (videoId: string, privacy: VideoPrivacy) => {
    const updatedVideos = videos.map(video => 
      video.id === videoId ? { ...video, privacy } : video
    );
    
    setVideos(updatedVideos);
    
    // Apply current filter
    if (privacyFilter !== 'all') {
      setFilteredVideos(updatedVideos.filter(v => v.privacy === privacyFilter));
    } else {
      setFilteredVideos(updatedVideos);
    }
    
    toast.success(`Video privacy updated to ${privacy}`);
  };

  const updateAgeRestriction = (videoId: string, restricted: boolean) => {
    const updatedVideos = videos.map(video => 
      video.id === videoId ? { ...video, ageRestricted: restricted } : video
    );
    
    setVideos(updatedVideos);
    setFilteredVideos(updatedVideos);
    
    toast.success(`Age restriction ${restricted ? 'applied' : 'removed'}`);
  };

  const handleFilterChange = (privacy: string) => {
    setPrivacyFilter(privacy);
    
    if (privacy === 'all') {
      setFilteredVideos(videos);
    } else {
      setFilteredVideos(videos.filter(v => v.privacy === privacy));
    }
  };

  const getPrivacyIcon = (privacy: VideoPrivacy) => {
    switch(privacy) {
      case 'public': return <Globe className="h-4 w-4" />;
      case 'private': return <Lock className="h-4 w-4" />;
      case 'unlisted': return <EyeOff className="h-4 w-4" />;
      default: return <Globe className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">My Videos</h1>
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
          
          <ImportVideoDialog onImport={handleImport} />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Tabs defaultValue="all" className="w-[400px]" onValueChange={handleFilterChange}>
          <TabsList>
            <TabsTrigger value="all">All Videos</TabsTrigger>
            <TabsTrigger value="public">Public</TabsTrigger>
            <TabsTrigger value="private">Private</TabsTrigger>
            <TabsTrigger value="unlisted">Unlisted</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex items-center gap-2">
          <Input 
            placeholder="Search videos..." 
            className="w-[250px]" 
          />
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1'}`}>
        {filteredVideos.map((video) => (
          <div key={video.id} className="relative group">
            <VideoCard
              id={video.id}
              title={video.title}
              thumbnail={video.thumbnail}
              duration={video.duration}
              views={video.views}
              likes={video.likes}
              createdAt={video.createdAt}
              interactive={video.interactive}
            />
            
            {hasPermission('edit:video') && (
              <div className="absolute top-2 right-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {getPrivacyIcon(video.privacy)}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Privacy Settings</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => updatePrivacy(video.id, 'public')}>
                      <Globe className="h-4 w-4 mr-2" />
                      Public
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => updatePrivacy(video.id, 'private')}>
                      <Lock className="h-4 w-4 mr-2" />
                      Private
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => updatePrivacy(video.id, 'unlisted')}>
                      <EyeOff className="h-4 w-4 mr-2" />
                      Unlisted
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Age Restriction</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => updateAgeRestriction(video.id, true)}>
                      <Eye className="h-4 w-4 mr-2" />
                      18+ Content
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => updateAgeRestriction(video.id, false)}>
                      <Eye className="h-4 w-4 mr-2" />
                      All Ages
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyVideos;
