
import { useState, useRef } from 'react';
import { Upload, Image, Camera, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface ThumbnailCustomizerProps {
  videoId?: string;
  currentThumbnail?: string;
  onThumbnailChange: (thumbnailUrl: string) => void;
}

const ThumbnailCustomizer = ({ 
  videoId, 
  currentThumbnail = 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3', 
  onThumbnailChange 
}: ThumbnailCustomizerProps) => {
  const [activeTab, setActiveTab] = useState('upload');
  const [isUploading, setIsUploading] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState(currentThumbnail);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock function for generating thumbnails (would connect to backend in real app)
  const generateThumbnails = () => {
    setIsUploading(true);
    
    // Simulate API call to generate thumbnails
    setTimeout(() => {
      const mockGeneratedThumbnails = [
        'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      ];
      
      setGeneratedThumbnails(mockGeneratedThumbnails);
      setIsUploading(false);
    }, 1500);
  };

  const [generatedThumbnails, setGeneratedThumbnails] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // File size validation (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size exceeds 5MB. Please upload a smaller image.');
      return;
    }

    // File type validation
    if (!file.type.match('image/jpeg|image/png|image/jpg')) {
      toast.error('Only JPEG, JPG, and PNG files are supported.');
      return;
    }

    setIsUploading(true);

    // In a real app, you'd upload to your server/storage here
    // For now, create a local object URL
    const objectUrl = URL.createObjectURL(file);
    
    setTimeout(() => {
      setThumbnailUrl(objectUrl);
      onThumbnailChange(objectUrl);
      setIsUploading(false);
      toast.success('Thumbnail uploaded successfully');
    }, 1000);
  };

  const handleSelectThumbnail = (url: string) => {
    setThumbnailUrl(url);
    onThumbnailChange(url);
    toast.success('Thumbnail selected');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Image className="h-5 w-5" />
          Thumbnail Customization
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="border rounded-md overflow-hidden">
            <img 
              src={thumbnailUrl} 
              alt="Current thumbnail" 
              className="w-full aspect-video object-cover"
            />
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="upload">Upload</TabsTrigger>
              <TabsTrigger value="generate">Auto-Generate</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload" className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Upload a custom thumbnail for your video. Recommended size: 1280×720 (16:9).
              </p>
              
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="w-full"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {isUploading ? 'Uploading...' : 'Upload Image'}
                </Button>
                
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/jpeg,image/png,image/jpg"
                  className="hidden"
                />
                
                <Button
                  variant="outline"
                  onClick={() => setActiveTab('generate')}
                  className="w-full"
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Generate from Video
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="generate" className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Automatically generate thumbnails from your video or customize with text.
              </p>
              
              <Button
                variant="outline"
                onClick={generateThumbnails}
                disabled={isUploading}
                className="w-full"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isUploading ? 'animate-spin' : ''}`} />
                {isUploading ? 'Generating...' : 'Generate Thumbnails'}
              </Button>
              
              {generatedThumbnails.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {generatedThumbnails.map((url, index) => (
                    <div 
                      key={index} 
                      className={`border rounded-md overflow-hidden cursor-pointer hover:opacity-90 transition-opacity ${thumbnailUrl === url ? 'ring-2 ring-primary' : ''}`}
                      onClick={() => handleSelectThumbnail(url)}
                    >
                      <img 
                        src={url} 
                        alt={`Generated thumbnail ${index + 1}`} 
                        className="w-full aspect-video object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
};

export default ThumbnailCustomizer;
