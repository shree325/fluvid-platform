
import { useState } from 'react';
import { Clock, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

export interface Chapter {
  id: string;
  title: string;
  startTime: string; // Format: MM:SS
}

interface VideoChaptersProps {
  chapters: Chapter[];
  onChaptersChange: (chapters: Chapter[]) => void;
  videoDuration?: string; // Format: MM:SS
}

const VideoChapters = ({ chapters, onChaptersChange, videoDuration = '00:00' }: VideoChaptersProps) => {
  const [newChapterTitle, setNewChapterTitle] = useState('');
  const [newChapterTime, setNewChapterTime] = useState('');

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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Video Chapters
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
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
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoChapters;
