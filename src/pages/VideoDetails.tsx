
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Play,
  Pause,
  Volume2,
  VolumeX,
  SkipBack,
  SkipForward,
  Maximize,
  Settings,
  Share2,
  Download,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Bookmark,
  Flag,
  Clock,
  Eye,
  BarChart3
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import VideoCard from '@/components/VideoCard';

// Mock data for recommended videos
const recommendedVideos = [
  {
    id: '1',
    title: 'How to Create Interactive Product Tutorials',
    thumbnail: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    duration: '12:34',
    views: 45689,
    likes: 2345,
    createdAt: '2023-10-15',
  },
  {
    id: '2',
    title: 'Enterprise Onboarding Video Series - Part 1',
    thumbnail: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    duration: '08:21',
    views: 12050,
    likes: 932,
    createdAt: '2023-10-12',
  },
  {
    id: '3',
    title: 'Customer Success Story: How XYZ Improved Conversion by 300%',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    duration: '15:49',
    views: 8726,
    likes: 1243,
    createdAt: '2023-10-08',
  },
];

// Mock comments
const comments = [
  {
    id: '1',
    author: 'Jane Cooper',
    avatar: 'https://i.pravatar.cc/150?img=5',
    content: 'This tutorial was super helpful! I was able to implement the interactive hotspots on my product demo right away.',
    timestamp: '2 days ago',
    likes: 24
  },
  {
    id: '2',
    author: 'Alex Morgan',
    avatar: 'https://i.pravatar.cc/150?img=12',
    content: 'The quiz feature is amazing. Can you please make a video specifically about implementing quizzes with branching logic?',
    timestamp: '1 week ago',
    likes: 18
  },
  {
    id: '3',
    author: 'Robert Chen',
    avatar: 'https://i.pravatar.cc/150?img=22',
    content: 'Great content as always! One question - how do you handle analytics for these interactive elements?',
    timestamp: '2 weeks ago',
    likes: 10
  }
];

const VideoDetails = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(100);
  const [volume, setVolume] = useState(80);
  const [newComment, setNewComment] = useState('');
  
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };
  
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseInt(e.target.value));
  };
  
  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const timeline = e.currentTarget;
    const rect = timeline.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const percentage = offsetX / rect.width;
    const newTime = Math.floor(percentage * duration);
    setCurrentTime(newTime);
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim()) {
      return;
    }
    
    toast.success('Comment posted successfully!');
    setNewComment('');
  };
  
  const handleLike = () => {
    toast('Video liked');
  };
  
  const handleDislike = () => {
    toast('Video disliked');
  };
  
  const handleSave = () => {
    toast('Video saved to your library');
  };
  
  const handleShare = () => {
    toast('Share options opened');
  };
  
  const handleDownload = () => {
    toast('Download started');
  };
  
  const handleReport = () => {
    toast('Report submitted');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        {/* Video player */}
        <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
          {/* Video placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Play className="h-16 w-16 text-white/50" />
          </div>
          
          {/* Interactive element appearing at specific timestamp */}
          <div className="absolute top-1/4 right-1/4 bg-white p-3 rounded-lg shadow-lg">
            <h3 className="font-medium text-lg">Interactive Hotspot</h3>
            <p className="text-sm">This is a sample interactive element that appears at a specific timestamp.</p>
            <div className="flex gap-2 mt-2">
              <Button size="sm">Learn More</Button>
              <Button variant="outline" size="sm">Dismiss</Button>
            </div>
          </div>
          
          {/* Video controls overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <div className="flex items-center gap-3 mb-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white h-8 w-8"
                onClick={handlePlayPause}
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white h-8 w-8"
              >
                <SkipBack className="h-4 w-4" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white h-8 w-8"
              >
                <SkipForward className="h-4 w-4" />
              </Button>
              
              <span className="text-white text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
              
              <div className="flex-1" />
              
              <div className="flex items-center gap-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-white h-8 w-8"
                  onClick={handleMuteToggle}
                >
                  {isMuted ? (
                    <VolumeX className="h-4 w-4" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </Button>
                <div className="w-20 hidden md:block">
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={volume} 
                    onChange={handleVolumeChange}
                    className="w-full h-1 bg-white/30 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                  />
                </div>
              </div>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white h-8 w-8"
              >
                <Settings className="h-4 w-4" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white h-8 w-8"
              >
                <Maximize className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Timeline with elements */}
            <div 
              className="h-2 bg-gray-700 rounded-full relative cursor-pointer"
              onClick={handleTimelineClick}
            >
              {/* Progress bar */}
              <div 
                className="absolute top-0 left-0 h-full bg-primary rounded-full" 
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
              
              {/* Interactive elements markers */}
              <div 
                className="absolute top-1/2 -translate-y-1/2 h-4 w-4 bg-blue-500 rounded-full"
                style={{ left: `25%` }}
                title="Quiz (1:40)"
              />
              <div 
                className="absolute top-1/2 -translate-y-1/2 h-4 w-4 bg-green-500 rounded-full"
                style={{ left: `40%` }}
                title="Hotspot (2:40)"
              />
              <div 
                className="absolute top-1/2 -translate-y-1/2 h-4 w-4 bg-yellow-500 rounded-full"
                style={{ left: `75%` }}
                title="Poll (6:15)"
              />
            </div>
          </div>
        </div>
        
        {/* Video info */}
        <div className="space-y-4">
          <div>
            <h1 className="text-2xl font-bold">Creating Advanced Interactive Video Experiences</h1>
            <div className="flex items-center gap-2 text-muted-foreground mt-1 text-sm">
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                45.3K views
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                Published 2 weeks ago
              </div>
            </div>
          </div>
          
          <div className="flex gap-4 flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10"><AvatarImage src="https://i.pravatar.cc/150?img=3" /><AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">John Doe</p>
                <p className="text-sm text-muted-foreground">15.4K subscribers</p>
              </div>
              <Button variant="outline" size="sm" className="ml-2">
                Subscribe
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <Button variant="outline" size="sm" className="gap-1 rounded-r-none" onClick={handleLike}>
                  <ThumbsUp className="h-4 w-4" />
                  2.4K
                </Button>
                <Button variant="outline" size="sm" className="gap-1 rounded-l-none border-l-0" onClick={handleDislike}>
                  <ThumbsDown className="h-4 w-4" />
                  120
                </Button>
              </div>
              
              <Button variant="outline" size="sm" className="gap-1" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              
              <Button variant="outline" size="sm" className="gap-1" onClick={handleSave}>
                <Bookmark className="h-4 w-4" />
                Save
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1">
                    <BarChart3 className="h-4 w-4" />
                    More
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleDownload}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleReport} className="text-destructive focus:text-destructive">
                    <Flag className="h-4 w-4 mr-2" />
                    Report
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <Card>
            <CardContent className="p-4">
              <p className="mb-2 font-medium">Description</p>
              <p className="text-sm text-muted-foreground">
                In this comprehensive tutorial, we walk through creating advanced interactive video experiences using 
                Fluvid. Learn how to add quizzes, hotspots, polls, and branching scenarios to create engaging and 
                dynamic content that adapts to viewer input. Perfect for product demos, training videos, and 
                educational content.
              </p>
              <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="text-xs">
                  <p className="text-muted-foreground">Category</p>
                  <p className="font-medium">Tutorial</p>
                </div>
                <div className="text-xs">
                  <p className="text-muted-foreground">Upload Date</p>
                  <p className="font-medium">Oct 15, 2023</p>
                </div>
                <div className="text-xs">
                  <p className="text-muted-foreground">Duration</p>
                  <p className="font-medium">12:34</p>
                </div>
                <div className="text-xs">
                  <p className="text-muted-foreground">Language</p>
                  <p className="font-medium">English</p>
                </div>
              </div>
              
              <div className="mt-4 flex flex-wrap gap-2">
                <div className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs">#interactive</div>
                <div className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs">#tutorial</div>
                <div className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs">#productdemo</div>
                <div className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs">#videomarketing</div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Comments */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Comments (256)</h2>
          
          <div className="flex gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://i.pravatar.cc/150?img=4" />
              <AvatarFallback>YD</AvatarFallback>
            </Avatar>
            <form onSubmit={handlePostComment} className="flex-1">
              <input 
                type="text" 
                placeholder="Add a comment..." 
                className="w-full bg-transparent border-b focus:border-primary outline-none pb-2 text-sm"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <div className="flex justify-end mt-2 gap-2">
                <Button variant="ghost" size="sm" type="button" onClick={() => setNewComment('')}>
                  Cancel
                </Button>
                <Button size="sm" type="submit">
                  Comment
                </Button>
              </div>
            </form>
          </div>
          
          <div className="space-y-4 mt-4">
            <Select defaultValue="relevant">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevant">Most Relevant</SelectItem>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="liked">Most Liked</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="space-y-6 mt-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <Avatar className="h-8 w-8"><AvatarImage src={comment.avatar} />
                    <AvatarFallback>{comment.author[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm">{comment.author}</p>
                      <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
                    </div>
                    <p className="text-sm mt-1">{comment.content}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <button className="text-xs flex items-center gap-1 text-muted-foreground hover:text-foreground">
                        <ThumbsUp className="h-3 w-3" />
                        {comment.likes}
                      </button>
                      <button className="text-xs flex items-center gap-1 text-muted-foreground hover:text-foreground">
                        <ThumbsDown className="h-3 w-3" />
                      </button>
                      <button className="text-xs text-muted-foreground hover:text-foreground">
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Sidebar with recommended videos */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Recommended Videos</h2>
        
        <div className="grid grid-cols-1 gap-4">
          {recommendedVideos.map((video) => (
            <VideoCard
              key={video.id}
              id={video.id}
              title={video.title}
              thumbnail={video.thumbnail}
              duration={video.duration}
              views={video.views}
              likes={video.likes}
              createdAt={video.createdAt}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;
