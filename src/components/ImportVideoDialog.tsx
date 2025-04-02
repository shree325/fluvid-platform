
import { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from './ui/dialog';
import { Button } from './ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Upload, Youtube, FileVideo } from 'lucide-react';
import { toast } from 'sonner';

interface ImportVideoDialogProps {
  onImport: (videoData: any) => void;
}

const ImportVideoDialog = ({ onImport }: ImportVideoDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleUpload = async () => {
    setIsLoading(true);
    
    try {
      // Simulate upload process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (selectedFile) {
        toast.success('Video uploaded successfully!');
        
        onImport({
          id: Math.random().toString(36).substr(2, 9),
          title: selectedFile.name.replace(/\.[^/.]+$/, ""),
          source: 'upload',
          file: selectedFile,
        });
      } else {
        toast.error('Please select a file to upload');
      }
    } catch (error) {
      toast.error('Failed to upload video');
      console.error(error);
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  const handleImportFromYoutube = async () => {
    setIsLoading(true);
    
    try {
      // Validate YouTube URL (simple validation)
      if (!youtubeUrl.includes('youtube.com') && !youtubeUrl.includes('youtu.be')) {
        throw new Error('Invalid YouTube URL');
      }
      
      // Simulate import process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Video imported from YouTube!');
      
      onImport({
        id: Math.random().toString(36).substr(2, 9),
        title: 'Imported from YouTube',
        source: 'youtube',
        url: youtubeUrl,
      });
    } catch (error: any) {
      toast.error(error.message || 'Failed to import video');
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Upload className="h-4 w-4" />
          Import Video
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Import Video</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="upload" className="w-full mt-4">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="upload">
              <FileVideo className="h-4 w-4 mr-2" />
              Upload File
            </TabsTrigger>
            <TabsTrigger value="youtube">
              <Youtube className="h-4 w-4 mr-2" />
              YouTube
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="space-y-4">
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <Label 
                htmlFor="video-file" 
                className="flex flex-col items-center gap-2 cursor-pointer"
              >
                <FileVideo className="h-8 w-8 text-muted-foreground" />
                <span className="text-lg font-medium">
                  {selectedFile ? selectedFile.name : 'Click to select a video'}
                </span>
                <span className="text-sm text-muted-foreground">
                  {selectedFile 
                    ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB` 
                    : 'MP4, MOV, or WebM up to 2GB'}
                </span>
              </Label>
              <Input 
                id="video-file" 
                type="file" 
                accept="video/*" 
                className="hidden" 
                onChange={handleFileChange}
              />
            </div>
            
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpload} disabled={!selectedFile || isLoading}>
                {isLoading ? 'Uploading...' : 'Upload'}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="youtube" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="youtube-url">YouTube URL</Label>
              <Input 
                id="youtube-url" 
                placeholder="https://youtube.com/watch?v=..." 
                value={youtubeUrl} 
                onChange={(e) => setYoutubeUrl(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                Paste the URL of the YouTube video you want to import
              </p>
            </div>
            
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleImportFromYoutube} disabled={!youtubeUrl || isLoading}>
                {isLoading ? 'Importing...' : 'Import'}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ImportVideoDialog;
