
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Save, 
  Play, 
  Pause, 
  Settings, 
  Plus, 
  PlusCircle, 
  Layers, 
  MessageCircle, 
  HelpCircle, 
  AlertCircle, 
  FileQuestion, 
  Link2, 
  Sparkles,
  MousePointerClick,
  CheckCircle2
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';

const VideoEditor = () => {
  const { videoId } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(100);
  const [interactiveElements, setInteractiveElements] = useState<any[]>([
    {
      id: '1',
      type: 'quiz',
      title: 'Knowledge Check',
      timestamp: 25,
    },
    {
      id: '2',
      type: 'hotspot',
      title: 'Feature Highlight',
      timestamp: 45,
    },
    {
      id: '3',
      type: 'poll',
      title: 'User Feedback',
      timestamp: 75,
    },
  ]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const timeline = e.currentTarget;
    const rect = timeline.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const percentage = offsetX / rect.width;
    const newTime = Math.floor(percentage * duration);
    setCurrentTime(newTime);
  };

  const handleAddElement = (type: string) => {
    const newElement = {
      id: Math.random().toString(36).substring(2, 9),
      type,
      title: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
      timestamp: currentTime,
    };
    
    setInteractiveElements([...interactiveElements, newElement]);
    toast.success(`Added new ${type} element at ${formatTime(currentTime)}`);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const getElementIcon = (type: string) => {
    switch (type) {
      case 'quiz':
        return FileQuestion;
      case 'hotspot':
        return MousePointerClick;
      case 'poll':
        return MessageCircle;
      case 'branch':
        return Layers;
      default:
        return Plus;
    }
  };

  const handleSave = () => {
    toast.success('Project saved successfully!');
  };

  const elementTypeColors = {
    quiz: 'bg-blue-500',
    hotspot: 'bg-green-500',
    poll: 'bg-yellow-500',
    branch: 'bg-purple-500',
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">
              {videoId ? 'Edit Video' : 'Create New Video'}
            </h1>
            <p className="text-muted-foreground">
              Drag and drop elements to create interactive content
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => toast('Preview mode')}>Preview</Button>
            <Button onClick={handleSave} className="gap-2">
              <Save className="h-4 w-4" />
              Save
            </Button>
          </div>
        </div>

        {/* Video Preview */}
        <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
          {/* Video placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Play className="h-16 w-16 text-white/50" />
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
              
              <span className="text-white text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
              
              <div className="flex-1" />
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white h-8 w-8"
                onClick={() => toast('Settings')}
              >
                <Settings className="h-4 w-4" />
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
              
              {/* Interactive elements on timeline */}
              {interactiveElements.map((element) => (
                <div 
                  key={element.id}
                  className={`absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full ${elementTypeColors[element.type as keyof typeof elementTypeColors] || 'bg-gray-500'}`}
                  style={{ left: `${(element.timestamp / duration) * 100}%` }}
                  title={`${element.title} (${formatTime(element.timestamp)})`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Timeline editor */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Timeline</h3>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1">
                    <PlusCircle className="h-4 w-4" />
                    Add Element
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => handleAddElement('quiz')}>
                    <FileQuestion className="h-4 w-4 mr-2" />
                    Quiz Question
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleAddElement('hotspot')}>
                    <MousePointerClick className="h-4 w-4 mr-2" />
                    Hotspot
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleAddElement('poll')}>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Poll
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleAddElement('branch')}>
                    <Layers className="h-4 w-4 mr-2" />
                    Branching Point
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <div className="space-y-2">
              {interactiveElements
                .sort((a, b) => a.timestamp - b.timestamp)
                .map((element) => {
                  const Icon = getElementIcon(element.type);
                  return (
                    <div 
                      key={element.id}
                      className="flex items-center gap-3 p-2 rounded-md border hover:bg-accent"
                    >
                      <div className={`h-8 w-8 rounded-md flex items-center justify-center ${elementTypeColors[element.type as keyof typeof elementTypeColors] || 'bg-gray-500'}`}>
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">{element.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatTime(element.timestamp)} • {element.type.charAt(0).toUpperCase() + element.type.slice(1)}
                        </p>
                      </div>
                      <div className="flex-1" />
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => toast(`Edit ${element.type}`)}
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Right sidebar */}
      <div>
        <Tabs defaultValue="elements">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="elements">Elements</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="elements" className="mt-4">
            <Card>
              <CardContent className="p-4 space-y-4">
                <ScrollArea className="h-[500px] pr-4">
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="h-auto flex flex-col items-center gap-2 p-4" onClick={() => handleAddElement('quiz')}>
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <FileQuestion className="h-5 w-5 text-blue-500" />
                      </div>
                      <span className="text-sm font-medium">Quiz</span>
                    </Button>
                    
                    <Button variant="outline" className="h-auto flex flex-col items-center gap-2 p-4" onClick={() => handleAddElement('hotspot')}>
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                        <MousePointerClick className="h-5 w-5 text-green-500" />
                      </div>
                      <span className="text-sm font-medium">Hotspot</span>
                    </Button>
                    
                    <Button variant="outline" className="h-auto flex flex-col items-center gap-2 p-4" onClick={() => handleAddElement('poll')}>
                      <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                        <MessageCircle className="h-5 w-5 text-yellow-500" />
                      </div>
                      <span className="text-sm font-medium">Poll</span>
                    </Button>
                    
                    <Button variant="outline" className="h-auto flex flex-col items-center gap-2 p-4" onClick={() => handleAddElement('branch')}>
                      <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                        <Layers className="h-5 w-5 text-purple-500" />
                      </div>
                      <span className="text-sm font-medium">Branch</span>
                    </Button>
                    
                    <Button variant="outline" className="h-auto flex flex-col items-center gap-2 p-4" onClick={() => toast('Coming soon')}>
                      <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      </div>
                      <span className="text-sm font-medium">Alert</span>
                    </Button>
                    
                    <Button variant="outline" className="h-auto flex flex-col items-center gap-2 p-4" onClick={() => toast('Coming soon')}>
                      <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                        <Link2 className="h-5 w-5 text-indigo-500" />
                      </div>
                      <span className="text-sm font-medium">Link</span>
                    </Button>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-sm font-medium mb-3">Element Properties</h3>
                    
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="appearance">
                        <AccordionTrigger className="text-sm">Appearance</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-3 pt-2">
                            <div className="space-y-1">
                              <Label htmlFor="element-position">Position</Label>
                              <Select defaultValue="center">
                                <SelectTrigger id="element-position">
                                  <SelectValue placeholder="Select position" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="top-left">Top Left</SelectItem>
                                  <SelectItem value="top-center">Top Center</SelectItem>
                                  <SelectItem value="top-right">Top Right</SelectItem>
                                  <SelectItem value="center-left">Center Left</SelectItem>
                                  <SelectItem value="center">Center</SelectItem>
                                  <SelectItem value="center-right">Center Right</SelectItem>
                                  <SelectItem value="bottom-left">Bottom Left</SelectItem>
                                  <SelectItem value="bottom-center">Bottom Center</SelectItem>
                                  <SelectItem value="bottom-right">Bottom Right</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div className="space-y-1">
                              <Label htmlFor="element-animation">Animation</Label>
                              <Select defaultValue="fade">
                                <SelectTrigger id="element-animation">
                                  <SelectValue placeholder="Select animation" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="fade">Fade In</SelectItem>
                                  <SelectItem value="slide">Slide In</SelectItem>
                                  <SelectItem value="zoom">Zoom In</SelectItem>
                                  <SelectItem value="bounce">Bounce</SelectItem>
                                  <SelectItem value="none">None</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="behavior">
                        <AccordionTrigger className="text-sm">Behavior</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-3 pt-2">
                            <div className="flex items-center justify-between">
                              <Label htmlFor="pause-video">Pause video when shown</Label>
                              <Switch id="pause-video" defaultChecked />
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <Label htmlFor="required-interaction">Required interaction</Label>
                              <Switch id="required-interaction" />
                            </div>
                            
                            <div className="space-y-1">
                              <Label htmlFor="display-duration">Display duration (seconds)</Label>
                              <Input id="display-duration" type="number" defaultValue={5} min={1} />
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="templates" className="mt-4">
            <Card>
              <CardContent className="p-4 space-y-4">
                <ScrollArea className="h-[500px] pr-4">
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      {
                        title: "Product Tour",
                        description: "Guide users through key features with hotspots",
                        icon: Sparkles,
                      },
                      {
                        title: "Knowledge Quiz",
                        description: "Test comprehension with interactive questions",
                        icon: FileQuestion,
                      },
                      {
                        title: "Decision Tree",
                        description: "Create branching scenarios based on choices",
                        icon: Layers,
                      },
                      {
                        title: "Feedback Collection",
                        description: "Gather user opinions with interactive polls",
                        icon: MessageCircle,
                      },
                      {
                        title: "Onboarding Flow",
                        description: "Step-by-step guide for new users",
                        icon: CheckCircle2,
                      },
                    ].map((template, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="h-auto justify-start text-left p-4 gap-3"
                        onClick={() => toast(`Applied ${template.title} template`)}
                      >
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <template.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{template.title}</p>
                          <p className="text-xs text-muted-foreground">{template.description}</p>
                        </div>
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="mt-4">
            <Card>
              <CardContent className="p-4 space-y-4">
                <ScrollArea className="h-[500px] pr-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="video-title">Video Title</Label>
                      <Input id="video-title" defaultValue="Interactive Product Tour" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="video-description">Description</Label>
                      <Input id="video-description" defaultValue="A comprehensive walkthrough of our platform's features." />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="video-category">Category</Label>
                      <Select defaultValue="tutorial">
                        <SelectTrigger id="video-category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tutorial">Tutorial</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="educational">Educational</SelectItem>
                          <SelectItem value="product">Product</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="pt-2">
                      <h3 className="text-sm font-medium mb-3">Playback Settings</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="autoplay">Autoplay</Label>
                          <Switch id="autoplay" />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Label htmlFor="loop">Loop video</Label>
                          <Switch id="loop" />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Label htmlFor="controls">Show controls</Label>
                          <Switch id="controls" defaultChecked />
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <h3 className="text-sm font-medium mb-3">Branding</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="show-logo">Show logo</Label>
                          <Switch id="show-logo" defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Label htmlFor="custom-player">Custom player colors</Label>
                          <Switch id="custom-player" />
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default VideoEditor;
