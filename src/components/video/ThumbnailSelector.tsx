
import React, { useState } from "react";
import { Sparkles, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

// Mock AI-generated thumbnails
const mockAiThumbnails = [
  "https://images.unsplash.com/photo-1661956602868-6ae368943878?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1618172193763-c511deb635ca?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1608501078713-8e445a709b39?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
];

interface ThumbnailSelectorProps {
  onSelectThumbnail: (url: string) => void;
  videoId?: string;
}

export function ThumbnailSelector({ onSelectThumbnail, videoId }: ThumbnailSelectorProps) {
  const [selectedThumbnail, setSelectedThumbnail] = useState<string | null>(null);
  const [uploadedThumbnail, setUploadedThumbnail] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiThumbnails, setAiThumbnails] = useState<string[]>([]);

  const handleThumbnailSelect = (url: string) => {
    setSelectedThumbnail(url);
    onSelectThumbnail(url);
    toast.success("Thumbnail selected");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size exceeds 5MB limit");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event.target?.result as string;
        setUploadedThumbnail(url);
        setSelectedThumbnail(url);
        onSelectThumbnail(url);
        toast.success("Custom thumbnail uploaded");
      };
      reader.readAsDataURL(file);
    }
  };

  const generateAiThumbnails = () => {
    setIsGenerating(true);
    
    // Simulate API call to generate thumbnails
    setTimeout(() => {
      setAiThumbnails(mockAiThumbnails);
      setIsGenerating(false);
      toast.success("AI thumbnails generated successfully");
    }, 2000);
  };

  return (
    <Card className="border rounded-lg overflow-hidden">
      <CardContent className="p-4">
        <Tabs defaultValue="ai">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="ai">AI-Generated</TabsTrigger>
            <TabsTrigger value="manual">Manual Upload</TabsTrigger>
          </TabsList>
          
          <TabsContent value="ai" className="mt-4">
            {aiThumbnails.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8">
                <Sparkles className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Generate AI Thumbnails</h3>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Our AI will analyze your video and generate thumbnail options for you to choose from.
                </p>
                <Button 
                  onClick={generateAiThumbnails}
                  disabled={isGenerating}
                >
                  {isGenerating ? "Generating..." : "Generate Thumbnails"}
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                {aiThumbnails.map((url, index) => (
                  <div 
                    key={index}
                    className={`relative cursor-pointer rounded-md overflow-hidden border-2 ${
                      selectedThumbnail === url ? "border-primary" : "border-transparent"
                    }`}
                    onClick={() => handleThumbnailSelect(url)}
                  >
                    <img 
                      src={url} 
                      alt={`AI Thumbnail ${index + 1}`}
                      className="w-full aspect-video object-cover"
                    />
                    {selectedThumbnail === url && (
                      <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                        <div className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                          Selected
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="manual" className="mt-4">
            <div className="space-y-4">
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                {uploadedThumbnail ? (
                  <div className="space-y-4">
                    <img 
                      src={uploadedThumbnail} 
                      alt="Uploaded Thumbnail"
                      className="w-full max-h-[200px] object-contain mx-auto"
                    />
                    <div className="flex justify-center">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setUploadedThumbnail(null);
                          if (selectedThumbnail === uploadedThumbnail) {
                            setSelectedThumbnail(null);
                          }
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Upload className="h-10 w-10 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Upload Custom Thumbnail</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Recommended: 1280×720 (16:9). Max size: 5MB.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => document.getElementById("thumbnail-upload")?.click()}
                    >
                      Choose File
                    </Button>
                    <input
                      id="thumbnail-upload"
                      type="file"
                      accept="image/png, image/jpeg, image/jpg, image/webp"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
