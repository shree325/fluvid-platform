
import { useState } from 'react';
import { Clock, Plus, Trash2, HelpCircle, Target, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export interface Chapter {
  id: string;
  title: string;
  startTime: string; // Format: MM:SS
}

export interface InteractiveElement {
  id: string;
  type: 'hotspot' | 'quiz' | 'poll';
  title: string;
  startTime: string; // Format: MM:SS
  content?: string;
  options?: string[];
}

interface VideoChaptersProps {
  chapters: Chapter[];
  onChaptersChange: (chapters: Chapter[]) => void;
  videoDuration?: string; // Format: MM:SS
}

const VideoChapters = ({ chapters, onChaptersChange, videoDuration = '00:00' }: VideoChaptersProps) => {
  const [newChapterTitle, setNewChapterTitle] = useState('');
  const [newChapterTime, setNewChapterTime] = useState('');
  const [activeTab, setActiveTab] = useState('chapters');
  
  // Interactive elements state
  const [interactiveElements, setInteractiveElements] = useState<InteractiveElement[]>([
    {
      id: '1',
      type: 'hotspot',
      title: 'Product Feature Highlight',
      startTime: '01:24',
      content: 'Click to learn more about this feature'
    },
    {
      id: '2',
      type: 'quiz',
      title: 'Understanding Check',
      startTime: '03:45',
      content: 'What is the main benefit of this feature?',
      options: ['Increased Speed', 'Better Organization', 'Enhanced Security', 'All of the above']
    },
    {
      id: '3',
      type: 'poll',
      title: 'User Preference',
      startTime: '07:15',
      content: 'Which feature would you like to see next?',
      options: ['Advanced Analytics', 'Mobile Integration', 'Team Collaboration', 'Custom Branding']
    }
  ]);
  
  const [newElementType, setNewElementType] = useState<'hotspot' | 'quiz' | 'poll'>('hotspot');
  const [newElementTitle, setNewElementTitle] = useState('');
  const [newElementTime, setNewElementTime] = useState('');
  const [newElementContent, setNewElementContent] = useState('');
  const [newElementOptions, setNewElementOptions] = useState('');

  const addChapter = () => {
    if (!newChapterTitle.trim()) {
      toast.error('Please enter a chapter title');
      return;
    }

    if (!newChapterTime) {
      toast.error('Please enter a start time');
      return;
    }

    // Validate time format
    const timeRegex = /^([0-5][0-9]):([0-5][0-9])$/;
    if (!timeRegex.test(newChapterTime)) {
      toast.error('Please enter a valid time in MM:SS format');
      return;
    }

    // Check if time is within video duration
    const [durationMin, durationSec] = videoDuration.split(':').map(Number);
    const [chapterMin, chapterSec] = newChapterTime.split(':').map(Number);
    
    const durationInSeconds = durationMin * 60 + durationSec;
    const chapterInSeconds = chapterMin * 60 + chapterSec;
    
    if (chapterInSeconds > durationInSeconds) {
      toast.error('Chapter start time cannot exceed video duration');
      return;
    }

    // Check if there's already a chapter at this time
    if (chapters.some(chapter => chapter.startTime === newChapterTime)) {
      toast.error('A chapter already exists at this time');
      return;
    }

    const newChapter: Chapter = {
      id: Date.now().toString(),
      title: newChapterTitle,
      startTime: newChapterTime,
    };

    // Add new chapter and sort by start time
    const updatedChapters = [...chapters, newChapter].sort((a, b) => {
      const [aMin, aSec] = a.startTime.split(':').map(Number);
      const [bMin, bSec] = b.startTime.split(':').map(Number);
      const aSeconds = aMin * 60 + aSec;
      const bSeconds = bMin * 60 + bSec;
      return aSeconds - bSeconds;
    });

    onChaptersChange(updatedChapters);
    setNewChapterTitle('');
    setNewChapterTime('');
    toast.success('Chapter added');
  };

  const removeChapter = (id: string) => {
    const updatedChapters = chapters.filter(chapter => chapter.id !== id);
    onChaptersChange(updatedChapters);
    toast.success('Chapter removed');
  };
  
  const addInteractiveElement = () => {
    if (!newElementTitle.trim()) {
      toast.error('Please enter an element title');
      return;
    }

    if (!newElementTime) {
      toast.error('Please enter a start time');
      return;
    }

    // Validate time format
    const timeRegex = /^([0-5][0-9]):([0-5][0-9])$/;
    if (!timeRegex.test(newElementTime)) {
      toast.error('Please enter a valid time in MM:SS format');
      return;
    }

    // Check if time is within video duration
    const [durationMin, durationSec] = videoDuration.split(':').map(Number);
    const [elementMin, elementSec] = newElementTime.split(':').map(Number);
    
    const durationInSeconds = durationMin * 60 + durationSec;
    const elementInSeconds = elementMin * 60 + elementSec;
    
    if (elementInSeconds > durationInSeconds) {
      toast.error('Element start time cannot exceed video duration');
      return;
    }
    
    const newElement: InteractiveElement = {
      id: Date.now().toString(),
      type: newElementType,
      title: newElementTitle,
      startTime: newElementTime,
      content: newElementContent,
      options: newElementType !== 'hotspot' && newElementOptions.trim() 
        ? newElementOptions.split('\n').filter(option => option.trim())
        : undefined
    };

    // Add new element and sort by start time
    const updatedElements = [...interactiveElements, newElement].sort((a, b) => {
      const [aMin, aSec] = a.startTime.split(':').map(Number);
      const [bMin, bSec] = b.startTime.split(':').map(Number);
      const aSeconds = aMin * 60 + aSec;
      const bSeconds = bMin * 60 + bSec;
      return aSeconds - bSeconds;
    });

    setInteractiveElements(updatedElements);
    setNewElementTitle('');
    setNewElementTime('');
    setNewElementContent('');
    setNewElementOptions('');
    toast.success(`${newElementType} added`);
  };
  
  const removeInteractiveElement = (id: string) => {
    const updatedElements = interactiveElements.filter(element => element.id !== id);
    setInteractiveElements(updatedElements);
    toast.success('Interactive element removed');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Video Timeline Elements
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="chapters">Chapters</TabsTrigger>
            <TabsTrigger value="interactive">Interactive Elements</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chapters" className="space-y-4">
            <div className="flex flex-col space-y-2">
              <p className="text-sm text-muted-foreground">
                Add chapters to help viewers navigate your video. Chapters will appear in the video player timeline.
              </p>
              
              <div className="grid grid-cols-12 gap-2 mt-4">
                <div className="col-span-7">
                  <Label htmlFor="chapter-title">Chapter Title</Label>
                  <Input 
                    id="chapter-title"
                    value={newChapterTitle}
                    onChange={(e) => setNewChapterTitle(e.target.value)}
                    placeholder="Introduction"
                  />
                </div>
                <div className="col-span-3">
                  <Label htmlFor="chapter-time">Start Time (MM:SS)</Label>
                  <Input 
                    id="chapter-time"
                    value={newChapterTime}
                    onChange={(e) => setNewChapterTime(e.target.value)}
                    placeholder="00:00"
                    maxLength={5}
                  />
                </div>
                <div className="col-span-2 flex items-end">
                  <Button 
                    onClick={addChapter} 
                    className="w-full"
                    variant="outline"
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add
                  </Button>
                </div>
              </div>
            </div>

            {chapters.length > 0 ? (
              <div className="border rounded-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left p-2 font-medium text-sm">Time</th>
                      <th className="text-left p-2 font-medium text-sm">Title</th>
                      <th className="text-right p-2 font-medium text-sm">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {chapters.map((chapter) => (
                      <tr key={chapter.id} className="border-t">
                        <td className="p-2 text-sm">{chapter.startTime}</td>
                        <td className="p-2 text-sm">{chapter.title}</td>
                        <td className="p-2 text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeChapter(chapter.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-6 text-sm text-muted-foreground border border-dashed rounded-md">
                No chapters added yet. Add your first chapter above.
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="interactive" className="space-y-4">
            <div className="flex flex-col space-y-2">
              <p className="text-sm text-muted-foreground">
                Add interactive elements such as hotspots, quizzes, and polls to engage your viewers.
              </p>
              
              <div className="grid grid-cols-12 gap-2 mt-4">
                <div className="col-span-2">
                  <Label htmlFor="element-type">Element Type</Label>
                  <Select 
                    value={newElementType} 
                    onValueChange={(value: 'hotspot' | 'quiz' | 'poll') => setNewElementType(value)}
                  >
                    <SelectTrigger id="element-type">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hotspot">Hotspot</SelectItem>
                      <SelectItem value="quiz">Quiz</SelectItem>
                      <SelectItem value="poll">Poll</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-5">
                  <Label htmlFor="element-title">Title</Label>
                  <Input 
                    id="element-title"
                    value={newElementTitle}
                    onChange={(e) => setNewElementTitle(e.target.value)}
                    placeholder="Feature Highlight"
                  />
                </div>
                <div className="col-span-3">
                  <Label htmlFor="element-time">Start Time (MM:SS)</Label>
                  <Input 
                    id="element-time"
                    value={newElementTime}
                    onChange={(e) => setNewElementTime(e.target.value)}
                    placeholder="00:00"
                    maxLength={5}
                  />
                </div>
                <div className="col-span-2 flex items-end">
                  <Button 
                    onClick={addInteractiveElement} 
                    className="w-full"
                    variant="outline"
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add
                  </Button>
                </div>
                
                <div className="col-span-12">
                  <Label htmlFor="element-content">
                    {newElementType === 'hotspot' ? 'Hotspot Text' : 
                     newElementType === 'quiz' ? 'Question' : 'Poll Question'}
                  </Label>
                  <Input 
                    id="element-content"
                    value={newElementContent}
                    onChange={(e) => setNewElementContent(e.target.value)}
                    placeholder={
                      newElementType === 'hotspot' ? 'Click to learn more' : 
                      newElementType === 'quiz' ? 'What is the main benefit?' : 
                      'Which feature would you prefer?'
                    }
                  />
                </div>
                
                {newElementType !== 'hotspot' && (
                  <div className="col-span-12">
                    <Label htmlFor="element-options">
                      {newElementType === 'quiz' ? 'Answer Options' : 'Poll Options'} (one per line)
                    </Label>
                    <Textarea 
                      id="element-options"
                      value={newElementOptions}
                      onChange={(e) => setNewElementOptions(e.target.value)}
                      placeholder="Option 1&#10;Option 2&#10;Option 3&#10;Option 4"
                      rows={4}
                    />
                  </div>
                )}
              </div>
            </div>

            {interactiveElements.length > 0 ? (
              <div className="border rounded-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left p-2 font-medium text-sm">Time</th>
                      <th className="text-left p-2 font-medium text-sm">Type</th>
                      <th className="text-left p-2 font-medium text-sm">Title</th>
                      <th className="text-right p-2 font-medium text-sm">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {interactiveElements.map((element) => (
                      <tr key={element.id} className="border-t">
                        <td className="p-2 text-sm">{element.startTime}</td>
                        <td className="p-2 text-sm capitalize">
                          <span className="flex items-center">
                            {element.type === 'hotspot' && <Target className="h-4 w-4 mr-2" />}
                            {element.type === 'quiz' && <HelpCircle className="h-4 w-4 mr-2" />}
                            {element.type === 'poll' && <BarChart className="h-4 w-4 mr-2" />}
                            {element.type}
                          </span>
                        </td>
                        <td className="p-2 text-sm">{element.title}</td>
                        <td className="p-2 text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeInteractiveElement(element.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-6 text-sm text-muted-foreground border border-dashed rounded-md">
                No interactive elements added yet. Add your first element above.
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default VideoChapters;
