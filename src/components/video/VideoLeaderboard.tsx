
import React, { useState } from "react";
import { ArrowDown, ArrowUp, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

type LeaderboardEntry = {
  id: string;
  name: string;
  avatar: string;
  score: number;
  comments: number;
  likes: number;
  shares: number;
};

const mockLeaderboardData: LeaderboardEntry[] = [
  { id: "1", name: "Sarah Johnson", avatar: "https://i.pravatar.cc/150?img=1", score: 856, comments: 42, likes: 189, shares: 23 },
  { id: "2", name: "Michael Chen", avatar: "https://i.pravatar.cc/150?img=2", score: 723, comments: 31, likes: 156, shares: 19 },
  { id: "3", name: "Emma Wilson", avatar: "https://i.pravatar.cc/150?img=3", score: 691, comments: 28, likes: 143, shares: 17 },
  { id: "4", name: "David Kim", avatar: "https://i.pravatar.cc/150?img=4", score: 612, comments: 24, likes: 127, shares: 15 },
  { id: "5", name: "Olivia Martinez", avatar: "https://i.pravatar.cc/150?img=5", score: 574, comments: 21, likes: 119, shares: 14 },
];

interface VideoLeaderboardProps {
  videoId?: string;
}

export function VideoLeaderboard({ videoId }: VideoLeaderboardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [leaderboardData] = useState<LeaderboardEntry[]>(mockLeaderboardData);

  const toggleLeaderboard = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card className="mt-6">
      <CardHeader className="py-3 px-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center">
            <Trophy className="h-5 w-5 mr-2 text-amber-500" />
            Interaction Leaderboard
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={toggleLeaderboard}
          >
            {isExpanded ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="pb-4">
          <Tabs defaultValue="score">
            <TabsList className="grid w-full grid-cols-4 mb-4">
              <TabsTrigger value="score">Overall</TabsTrigger>
              <TabsTrigger value="comments">Comments</TabsTrigger>
              <TabsTrigger value="likes">Likes</TabsTrigger>
              <TabsTrigger value="shares">Shares</TabsTrigger>
            </TabsList>
            
            <TabsContent value="score" className="space-y-0">
              {renderLeaderboard(leaderboardData, "score")}
            </TabsContent>
            
            <TabsContent value="comments" className="space-y-0">
              {renderLeaderboard(
                [...leaderboardData].sort((a, b) => b.comments - a.comments),
                "comments"
              )}
            </TabsContent>
            
            <TabsContent value="likes" className="space-y-0">
              {renderLeaderboard(
                [...leaderboardData].sort((a, b) => b.likes - a.likes),
                "likes"
              )}
            </TabsContent>
            
            <TabsContent value="shares" className="space-y-0">
              {renderLeaderboard(
                [...leaderboardData].sort((a, b) => b.shares - a.shares),
                "shares"
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      )}
    </Card>
  );
}

function renderLeaderboard(data: LeaderboardEntry[], sortKey: keyof LeaderboardEntry) {
  return (
    <div className="space-y-2">
      {data.map((entry, index) => (
        <div 
          key={entry.id}
          className="flex items-center justify-between p-2 rounded-md bg-secondary/50"
        >
          <div className="flex items-center">
            <div className={`w-6 h-6 flex items-center justify-center rounded-full mr-2 ${
              index === 0 ? "bg-amber-500" :
              index === 1 ? "bg-gray-300" :
              index === 2 ? "bg-amber-700" : "bg-gray-200"
            } text-xs font-bold`}>
              {index + 1}
            </div>
            
            <HoverCard>
              <HoverCardTrigger asChild>
                <div className="flex items-center cursor-pointer">
                  <Avatar className="h-7 w-7 mr-2">
                    <AvatarImage src={entry.avatar} />
                    <AvatarFallback>{entry.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium truncate max-w-[120px]">
                    {entry.name}
                  </span>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-64">
                <div className="flex justify-between space-x-4">
                  <Avatar>
                    <AvatarImage src={entry.avatar} />
                    <AvatarFallback>{entry.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">{entry.name}</h4>
                    <div className="flex space-x-4 text-xs text-muted-foreground">
                      <div className="flex flex-col">
                        <span>Comments</span>
                        <span className="font-medium">{entry.comments}</span>
                      </div>
                      <div className="flex flex-col">
                        <span>Likes</span>
                        <span className="font-medium">{entry.likes}</span>
                      </div>
                      <div className="flex flex-col">
                        <span>Shares</span>
                        <span className="font-medium">{entry.shares}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
          
          <div className="text-sm font-bold">
            {sortKey === "score" && <span>{entry.score} pts</span>}
            {sortKey === "comments" && <span>{entry.comments}</span>}
            {sortKey === "likes" && <span>{entry.likes}</span>}
            {sortKey === "shares" && <span>{entry.shares}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}
