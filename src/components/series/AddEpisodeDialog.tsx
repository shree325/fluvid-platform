
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

interface AddEpisodeDialogProps {
  open: boolean;
  onClose: () => void;
  onAddEpisode: (data: any) => void;
  seasons: {
    id: string;
    title: string;
    episodeCount: number;
  }[];
}

// Mock video data
const mockVideos = [
  { id: 'video-1', title: 'Product Tutorial - Introduction' },
  { id: 'video-2', title: 'Setting Up Your Account' },
  { id: 'video-3', title: 'Basic Navigation and Features' },
  { id: 'video-4', title: 'Advanced Features Walkthrough' },
  { id: 'video-5', title: 'Integration with Other Systems' },
];

const formSchema = z.object({
  title: z.string().min(3, {
    message: "Episode title must be at least 3 characters.",
  }),
  seasonId: z.string({
    required_error: "Please select a season.",
  }),
  videoId: z.string({
    required_error: "Please select a video.",
  }),
  number: z.coerce.number().int().positive({
    message: "Episode number must be a positive integer.",
  }),
  releaseDate: z.date().optional(),
  isFreePreview: z.boolean().default(false),
  thumbnail: z.string().url({
    message: "Please enter a valid URL.",
  }).optional().or(z.literal('')),
});

const AddEpisodeDialog = ({ open, onClose, onAddEpisode, seasons }: AddEpisodeDialogProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      seasonId: "",
      videoId: "",
      number: 1,
      isFreePreview: false,
      thumbnail: "",
    },
  });

  // When season changes, update the episode number to be the next in sequence
  const watchedSeasonId = form.watch('seasonId');
  React.useEffect(() => {
    if (watchedSeasonId) {
      const selectedSeason = seasons.find(s => s.id === watchedSeasonId);
      if (selectedSeason) {
        form.setValue('number', selectedSeason.episodeCount + 1);
      }
    }
  }, [watchedSeasonId, seasons, form]);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const selectedVideo = mockVideos.find(v => v.id === data.videoId);
    
    onAddEpisode({
      ...data,
      title: data.title || (selectedVideo ? selectedVideo.title : 'Untitled Episode'),
      releaseDate: data.releaseDate ? format(data.releaseDate, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd'),
    });
    
    form.reset({
      title: "",
      seasonId: "",
      videoId: "",
      number: 1,
      isFreePreview: false,
      thumbnail: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Add New Episode</DialogTitle>
          <DialogDescription>
            Add a video to your series as a new episode.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="seasonId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Season</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select season" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {seasons.map((season) => (
                        <SelectItem key={season.id} value={season.id}>
                          {season.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="videoId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select video" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {mockVideos.map((video) => (
                        <SelectItem key={video.id} value={video.id}>
                          {video.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select an existing video or <Button type="button" variant="link" className="p-0 h-auto">upload a new one</Button>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Episode Title (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Custom episode title" {...field} />
                    </FormControl>
                    <FormDescription>
                      Leave empty to use video title
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Episode Number</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="releaseDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Release Date (Optional)</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Schedule the episode for future release or leave empty to publish immediately.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="thumbnail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Custom Thumbnail URL (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter thumbnail URL" {...field} />
                  </FormControl>
                  <FormDescription>
                    Leave empty to use the video's thumbnail
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="isFreePreview"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Free Preview</FormLabel>
                    <FormDescription>
                      Make this episode available as a free preview.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Add Episode</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEpisodeDialog;
