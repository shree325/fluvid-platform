
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { format, addDays, addWeeks } from 'date-fns';
import { CalendarPlus } from 'lucide-react';

interface ScheduleReleaseDialogProps {
  open: boolean;
  onClose: () => void;
  onSchedule: (data: any) => void;
  series: any;
  seasons: any[];
}

const ScheduleReleaseDialog = ({ open, onClose, onSchedule, series, seasons }: ScheduleReleaseDialogProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [releaseType, setReleaseType] = useState('all-at-once');
  const [selectedSeason, setSelectedSeason] = useState<string>('all');
  const [releaseFrequency, setReleaseFrequency] = useState<'daily' | 'weekly'>('weekly');
  const [releaseTab, setReleaseTab] = useState('all-at-once');
  
  const handleSchedule = () => {
    if (!selectedDate) {
      toast.error('Please select a release date');
      return;
    }
    
    const scheduleData = {
      date: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : null,
      type: releaseType,
      season: selectedSeason,
      frequency: releaseFrequency,
    };
    
    onSchedule(scheduleData);
  };
  
  // Calculate release dates preview
  const getReleaseDatesPreview = () => {
    if (!selectedDate) return [];
    
    // Simulate 3 episodes for the preview
    const dates = [];
    let currentDate = selectedDate;
    
    for (let i = 0; i < 3; i++) {
      dates.push({
        episode: `Episode ${i + 1}`,
        date: new Date(currentDate),
      });
      
      if (releaseFrequency === 'daily') {
        currentDate = addDays(currentDate, 1);
      } else {
        currentDate = addWeeks(currentDate, 1);
      }
    }
    
    return dates;
  };
  
  const releaseDatesPreview = getReleaseDatesPreview();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Schedule Release</DialogTitle>
        </DialogHeader>
        
        <Tabs value={releaseTab} onValueChange={setReleaseTab} className="w-full">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="all-at-once">All at Once</TabsTrigger>
            <TabsTrigger value="staggered">Staggered Release</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all-at-once" className="space-y-4 pt-4">
            <p className="text-sm text-muted-foreground">
              Release all episodes at the same time on a specific date.
            </p>
            
            <div className="space-y-2">
              <Label>Release Date</Label>
              <div className="border rounded-md p-3">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="mx-auto"
                  disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>What to Release</Label>
              <RadioGroup 
                defaultValue="all" 
                value={selectedSeason} 
                onValueChange={setSelectedSeason}
                className="grid grid-cols-2 gap-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="all-series" />
                  <Label htmlFor="all-series">Entire Series</Label>
                </div>
                
                <Select 
                  value={selectedSeason}
                  onValueChange={setSelectedSeason}
                  disabled={selectedSeason === 'all'}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a season" />
                  </SelectTrigger>
                  <SelectContent>
                    {seasons.map(season => (
                      <SelectItem key={season.id} value={season.id}>
                        {season.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </RadioGroup>
            </div>
          </TabsContent>
          
          <TabsContent value="staggered" className="space-y-4 pt-4">
            <p className="text-sm text-muted-foreground">
              Release episodes gradually over time for sustained engagement.
            </p>
            
            <div className="space-y-2">
              <Label>Start Date</Label>
              <div className="border rounded-md p-3">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="mx-auto"
                  disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Release Frequency</Label>
              <RadioGroup 
                defaultValue={releaseFrequency} 
                onValueChange={(value) => setReleaseFrequency(value as 'daily' | 'weekly')}
                className="grid grid-cols-2 gap-4"
              >
                <div className="flex items-center space-x-2 border rounded-md p-3">
                  <RadioGroupItem value="daily" id="daily" />
                  <div>
                    <Label htmlFor="daily">Daily</Label>
                    <p className="text-xs text-muted-foreground">Release one episode every day</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 border rounded-md p-3">
                  <RadioGroupItem value="weekly" id="weekly" />
                  <div>
                    <Label htmlFor="weekly">Weekly</Label>
                    <p className="text-xs text-muted-foreground">Release one episode every week</p>
                  </div>
                </div>
              </RadioGroup>
            </div>
            
            <Card className="border-dashed">
              <CardHeader className="py-3">
                <CardTitle className="text-sm">Release Schedule Preview</CardTitle>
                <CardDescription>Starting from {selectedDate ? format(selectedDate, 'PP') : 'selected date'}</CardDescription>
              </CardHeader>
              <CardContent className="pb-3">
                <ul className="space-y-2">
                  {releaseDatesPreview.map((item, index) => (
                    <li key={index} className="text-sm flex items-center justify-between">
                      <span>{item.episode}</span>
                      <span className="text-muted-foreground">{format(item.date, 'PP')}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-0 pb-3">
                <p className="text-xs text-muted-foreground">
                  <CalendarPlus className="inline h-3 w-3 mr-1" />
                  {releaseFrequency === 'daily' ? 'Daily' : 'Weekly'} releases, starting from the selected date
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSchedule}>
            Schedule Release
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleReleaseDialog;
