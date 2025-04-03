import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type EpisodeStatus = "published" | "draft" | "scheduled";

type Episode = {
  id: string;
  seasonId: string;
  title: string;
  number: number;
  duration: string;
  thumbnail: string;
  status: EpisodeStatus;
  videoId: string;
  views: number;
  releaseDate: string;
  isFreePreview: boolean;
};

const episodes = [
  {
    id: "1",
    seasonId: "1",
    title: "Introduction to Series Creation",
    number: 1,
    duration: "10:30",
    thumbnail: "https://via.placeholder.com/150",
    status: "published" as "published" | "draft" | "scheduled", // Use type assertion here
    videoId: "video1",
    views: 1250,
    releaseDate: "2023-01-15",
    isFreePreview: true,
  },
  {
    id: "2",
    seasonId: "1",
    title: "Setting Up Your Studio",
    number: 2,
    duration: "08:45",
    thumbnail: "https://via.placeholder.com/150",
    status: "draft" as "published" | "draft" | "scheduled", // Use type assertion here
    videoId: "video2",
    views: 890,
    releaseDate: "2023-01-22",
    isFreePreview: false,
  },
  {
    id: "3",
    seasonId: "1",
    title: "Filming Techniques",
    number: 3,
    duration: "12:15",
    thumbnail: "https://via.placeholder.com/150",
    status: "scheduled" as "published" | "draft" | "scheduled", // Use type assertion here
    videoId: "video3",
    views: 1567,
    releaseDate: "2023-01-29",
    isFreePreview: true,
  },
  {
    id: "4",
    seasonId: "1",
    title: "Editing Basics",
    number: 4,
    duration: "09:20",
    thumbnail: "https://via.placeholder.com/150",
    status: "published" as "published" | "draft" | "scheduled", // Use type assertion here
    videoId: "video4",
    views: 2100,
    releaseDate: "2023-02-05",
    isFreePreview: false,
  },
  {
    id: "5",
    seasonId: "1",
    title: "Sound and Music",
    number: 5,
    duration: "11:50",
    thumbnail: "https://via.placeholder.com/150",
    status: "published" as "published" | "draft" | "scheduled", // Use type assertion here
    videoId: "video5",
    views: 1850,
    releaseDate: "2023-02-12",
    isFreePreview: true,
  },
  {
    id: "6",
    seasonId: "1",
    title: "Lighting Techniques",
    number: 6,
    duration: "10:00",
    thumbnail: "https://via.placeholder.com/150",
    status: "draft" as "published" | "draft" | "scheduled", // Use type assertion here
    videoId: "video6",
    views: 1200,
    releaseDate: "2023-02-19",
    isFreePreview: false,
  },
  {
    id: "7",
    seasonId: "1",
    title: "Advanced Editing",
    number: 7,
    duration: "13:30",
    thumbnail: "https://via.placeholder.com/150",
    status: "scheduled" as "published" | "draft" | "scheduled", // Use type assertion here
    videoId: "video7",
    views: 2500,
    releaseDate: "2023-02-26",
    isFreePreview: true,
  },
  {
    id: "8",
    seasonId: "1",
    title: "Color Correction",
    number: 8,
    duration: "09:45",
    thumbnail: "https://via.placeholder.com/150",
    status: "published" as "published" | "draft" | "scheduled", // Use type assertion here
    videoId: "video8",
    views: 1600,
    releaseDate: "2023-03-05",
    isFreePreview: false,
  },
  {
    id: "9",
    seasonId: "1",
    title: "Exporting Your Video",
    number: 9,
    duration: "07:50",
    thumbnail: "https://via.placeholder.com/150",
    status: "published" as "published" | "draft" | "scheduled", // Use type assertion here
    videoId: "video9",
    views: 1100,
    releaseDate: "2023-03-12",
    isFreePreview: true,
  },
  {
    id: "10",
    seasonId: "1",
    title: "Promoting Your Series",
    number: 10,
    duration: "11:20",
    thumbnail: "https://via.placeholder.com/150",
    status: "draft" as "published" | "draft" | "scheduled", // Use type assertion here
    videoId: "video10",
    views: 1900,
    releaseDate: "2023-03-19",
    isFreePreview: false,
  },
];

const seriesDetails = {
  id: "1",
  title: "Video Creation Masterclass",
  description: "Learn how to create engaging video content",
  thumbnail: "https://via.placeholder.com/640x360",
  category: "creativity",
  seasons: 1,
  episodes: 10,
  views: 200000,
  createdAt: "2022-09-05",
  monetization: "pay-per-view",
  status: "published",
};

const SeriesDetail: React.FC = () => {
  const { seriesId } = useParams<{ seriesId: string }>();

  if (!seriesId) {
    return <div>Series ID is missing.</div>;
  }

  const filteredEpisodes = episodes.filter(episode => episode.seasonId === seriesId);

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{seriesDetails.title}</h1>
        <p className="text-muted-foreground mt-2">{seriesDetails.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <img src={seriesDetails.thumbnail} alt={seriesDetails.title} className="rounded-lg shadow-md" />
        </div>
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Episodes</h2>
            <Button asChild>
              <Link to={`/editor`}>Add Episode</Link>
            </Button>
          </div>
          <ScrollArea className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Number</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Release Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEpisodes.map((episode) => (
                  <TableRow key={episode.id}>
                    <TableCell className="font-medium">{episode.number}</TableCell>
                    <TableCell>{episode.title}</TableCell>
                    <TableCell>
                      {episode.status === "published" && <Badge variant="outline">Published</Badge>}
                      {episode.status === "draft" && <Badge variant="secondary">Draft</Badge>}
                      {episode.status === "scheduled" && <Badge className="bg-blue-500 text-white">Scheduled</Badge>}
                    </TableCell>
                    <TableCell className="flex items-center gap-2">
                      <Calendar className="mr-2 h-4 w-4 opacity-70" />
                      <span>{episode.releaseDate}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem asChild>
                            <Link to={`/editor/${episode.videoId}`}>Edit</Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default SeriesDetail;
