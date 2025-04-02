
import { useState } from 'react';
import { 
  FilterX, 
  ChevronDown, 
  BarChart, 
  CalendarDays, 
  DollarSign, 
  Layers 
} from 'lucide-react';
import { Button } from './ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from './ui/select';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from './ui/popover';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';

interface VideoFilterProps {
  onFilterChange: (filters: any) => void;
}

const VideoFilter = ({ onFilterChange }: VideoFilterProps) => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const handleFilterChange = (filter: string, value: string) => {
    const filterString = `${filter}:${value}`;
    
    setActiveFilters(prev => {
      // Remove any existing filter of the same type
      const filtered = prev.filter(f => !f.startsWith(`${filter}:`));
      
      // Add the new filter if it's not 'all', which means no filter
      if (value !== 'all') {
        return [...filtered, filterString];
      }
      return filtered;
    });
  };
  
  const removeFilter = (filter: string) => {
    setActiveFilters(prev => prev.filter(f => f !== filter));
  };
  
  const clearAllFilters = () => {
    setActiveFilters([]);
    setSelectedCategory('all');
  };
  
  const categories = [
    { value: 'all', label: 'All' },
    { value: 'tutorials', label: 'Tutorials' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'educational', label: 'Educational' },
    { value: 'product', label: 'Product' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <Tabs defaultValue="all" className="h-9">
          <TabsList className="h-9">
            <TabsTrigger value="all">All Videos</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex-1" />

        <Select
          value={selectedCategory}
          onValueChange={(value) => {
            setSelectedCategory(value);
            handleFilterChange('category', value);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="gap-2">
              Sort By
              <ChevronDown className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56" align="end">
            <div className="space-y-1.5">
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 text-left"
                onClick={() => handleFilterChange('sort', 'popular')}
              >
                <BarChart className="h-4 w-4" />
                Most Popular
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 text-left"
                onClick={() => handleFilterChange('sort', 'recent')}
              >
                <CalendarDays className="h-4 w-4" />
                Most Recent
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 text-left"
                onClick={() => handleFilterChange('sort', 'revenue')}
              >
                <DollarSign className="h-4 w-4" />
                Highest Revenue
              </Button>
              <Separator />
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 text-left"
                onClick={() => handleFilterChange('type', 'interactive')}
              >
                <Layers className="h-4 w-4" />
                Interactive Only
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {activeFilters.length > 0 && (
        <div className="flex items-center flex-wrap gap-2">
          {activeFilters.map((filter) => {
            const [type, value] = filter.split(':');
            let displayText = '';
            
            // Format the filter text for display
            switch (type) {
              case 'category':
                displayText = categories.find(c => c.value === value)?.label || value;
                break;
              case 'sort':
                displayText = value === 'popular' 
                  ? 'Most Popular' 
                  : value === 'recent' 
                  ? 'Most Recent' 
                  : 'Highest Revenue';
                break;
              case 'type':
                displayText = 'Interactive Only';
                break;
              default:
                displayText = value;
            }
            
            return (
              <Badge key={filter} variant="outline" className="px-2 py-1 gap-1">
                {displayText}
                <button
                  onClick={() => removeFilter(filter)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <FilterX className="h-3 w-3" />
                </button>
              </Badge>
            );
          })}
          <Button
            variant="link"
            size="sm"
            className="text-xs text-muted-foreground"
            onClick={clearAllFilters}
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
};

export default VideoFilter;
