
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRole } from '@/contexts/RoleContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ChevronDown, Save, Play, Upload, Video } from 'lucide-react';
import VideoChapters, { Chapter } from '@/components/video/VideoChapters';
import ThumbnailCustomizer from '@/components/video/ThumbnailCustomizer';
import MonetizationChecks from '@/components/video/MonetizationChecks';

// Mock video data
const mockVideoData = {
  id: '1',
  title: 'How to Create Interactive Product Tutorials',
  description: 'Learn the best practices for creating engaging and interactive product tutorials that help users understand your product better.',
  tags: ['tutorial', 'interactive', 'product'],
  visibility: 'private',
  ageRestricted: false,
  monetization: true,
  commentsEnabled: true,
  thumbnail: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  duration: '12:34',
  chapters: [
    {
      id: '1',
      title: 'Introduction',
      startTime: '00:00',
    },
    {
      id: '2',
      title: 'Planning Your Tutorial',
      startTime: '01:45',
    },
    {
      id: '3',
      title: 'Adding Interactive Elements',
      startTime: '05:20',
    },
    {
      id: '4',
      title: 'Best Practices',
      startTime: '08:15',
    },
    {
      id: '5',
      title: 'Conclusion',
      startTime: '10:30',
    }
  ],
};

const VideoEditor = () => {
  const { videoId } = useParams();
  const { hasPermission } = useRole();
  const [activeTab, setActiveTab] = useState('basic');
  
  // Video details state
  const [videoData, setVideoData] = useState(mockVideoData);
  const [isLoading, setIsLoading] = useState(false);
  
  // For video chapters
  const [chapters, setChapters] = useState<Chapter[]>(mockVideoData.chapters);
  
  // For monetization status
  const [monetizationStatus, setMonetizationStatus] = useState<'eligible' | 'limited' | 'ineligible'>('eligible');

  // Handle form input changes
  const handleInputChange = (field: string, value: string | boolean | string[]) => {
    setVideoData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle thumbnail change
  const handleThumbnailChange = (thumbnailUrl: string) => {
    setVideoData(prev => ({
      ...prev,
      thumbnail: thumbnailUrl,
    }));
  };

  // Handle chapters change
  const handleChaptersChange = (updatedChapters: Chapter[]) => {
    setChapters(updatedChapters);
    setVideoData(prev => ({
      ...prev,
      chapters: updatedChapters,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Video details saved successfully!');
    }, 1000);
  };

  return (
    <div className="max-w-6xl mx-auto py-6 space-y-6">
      <div className="flex flex-col space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">
          {videoId ? 'Edit Video' : 'Upload New Video'}
        </h1>
        <p className="text-muted-foreground">
          {videoId ? 'Make changes to your existing video.' : 'Upload and configure a new video.'}
        </p>
      </div>

      {!videoId && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <Video className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">Upload a Video</h2>
            <p className="text-muted-foreground text-center max-w-md mb-6">
              Drag and drop a video file here or click to select a file to upload.
              Supported formats: MP4, MOV, AVI, WMV.
            </p>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Select File
            </Button>
          </CardContent>
        </Card>
      )}

      {(videoId || mockVideoData) && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="relative pb-[56.25%] overflow-hidden rounded-md bg-muted">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img 
                      src={videoData.thumbnail} 
                      alt="Video preview"
                      className="w-full h-full object-cover"
                    />
                    <Button 
                      size="lg" 
                      className="absolute" 
                      variant="outline"
                    >
                      <Play className="h-6 w-6 fill-current" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4">
                <TabsTrigger value="basic">Basic Details</TabsTrigger>
                <TabsTrigger value="chapters">Chapters</TabsTrigger>
                <TabsTrigger value="thumbnail">Thumbnail</TabsTrigger>
                <TabsTrigger value="monetization">Monetization</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic" className="space-y-4 mt-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input 
                      id="title"
                      value={videoData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="Enter video title"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description"
                      value={videoData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Enter video description"
                      rows={5}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags (comma separated)</Label>
                    <Input 
                      id="tags"
                      value={videoData.tags.join(', ')}
                      onChange={(e) => handleInputChange('tags', e.target.value.split(',').map(tag => tag.trim()))}
                      placeholder="tutorial, product, guide"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="visibility">Visibility</Label>
                      <select
                        id="visibility"
                        value={videoData.visibility}
                        onChange={(e) => handleInputChange('visibility', e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="public">Public</option>
                        <option value="unlisted">Unlisted</option>
                        <option value="private">Private</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="comments-enabled"
                      checked={videoData.commentsEnabled}
                      onCheckedChange={(checked) => handleInputChange('commentsEnabled', checked)}
                    />
                    <Label htmlFor="comments-enabled">Enable comments</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="age-restricted"
                      checked={videoData.ageRestricted}
                      onCheckedChange={(checked) => handleInputChange('ageRestricted', checked)}
                    />
                    <Label htmlFor="age-restricted">Age-restricted content (18+)</Label>
                  </div>
                  
                  <Button type="submit" disabled={isLoading}>
                    <Save className="h-4 w-4 mr-2" />
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="chapters" className="mt-4">
                <VideoChapters 
                  chapters={chapters} 
                  onChaptersChange={handleChaptersChange}
                  videoDuration={videoData.duration}
                />
              </TabsContent>
              
              <TabsContent value="thumbnail" className="mt-4">
                <ThumbnailCustomizer 
                  videoId={videoData.id}
                  currentThumbnail={videoData.thumbnail}
                  onThumbnailChange={handleThumbnailChange}
                />
              </TabsContent>
              
              <TabsContent value="monetization" className="mt-4">
                <MonetizationChecks 
                  videoId={videoData.id}
                  onStatusChange={(status) => setMonetizationStatus(status)}
                />
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">Video Settings</h3>
                <div className="space-y-4">
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm font-medium">Video ID</span>
                    <span className="text-sm text-muted-foreground">{videoData.id}</span>
                  </div>
                  
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm font-medium">Duration</span>
                    <span className="text-sm text-muted-foreground">{videoData.duration}</span>
                  </div>
                  
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm font-medium">Upload Date</span>
                    <span className="text-sm text-muted-foreground">April 3, 2023</span>
                  </div>
                  
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm font-medium">Monetization Status</span>
                    <span className={`text-sm ${
                      monetizationStatus === 'eligible' 
                        ? 'text-green-600' 
                        : monetizationStatus === 'limited' 
                          ? 'text-yellow-600'
                          : 'text-red-600'
                    }`}>
                      {monetizationStatus === 'eligible' 
                        ? 'Eligible for monetization' 
                        : monetizationStatus === 'limited' 
                          ? 'Limited monetization'
                          : 'Not eligible for monetization'}
                    </span>
                  </div>
                  
                  <div className="border-t pt-4 mt-4">
                    <h4 className="text-sm font-medium mb-2">Advanced Settings</h4>
                    <Button variant="outline" size="sm" className="w-full">
                      Advanced Settings
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoEditor;
