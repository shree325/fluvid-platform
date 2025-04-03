
import * as React from "react";
import { Check, Layout } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRole } from "@/contexts/RoleContext";

export type Template = {
  id: string;
  name: string;
  description: string;
  screenshot: string;
  category: "modern" | "classic" | "minimal" | "corporate" | "creative";
  ageRestriction?: "all" | "18+";
};

const templates: Template[] = [
  {
    id: "default",
    name: "Default",
    description: "The default application layout",
    screenshot: "https://via.placeholder.com/150?text=Default",
    category: "modern",
    ageRestriction: "all",
  },
  {
    id: "dark-corporate",
    name: "Dark Corporate",
    description: "Professional dark theme for business",
    screenshot: "https://via.placeholder.com/150?text=Dark+Corporate",
    category: "corporate",
    ageRestriction: "all",
  },
  {
    id: "light-minimal",
    name: "Light Minimal",
    description: "Clean, minimalistic light theme",
    screenshot: "https://via.placeholder.com/150?text=Light+Minimal",
    category: "minimal",
    ageRestriction: "all",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Bold and colorful for creative projects",
    screenshot: "https://via.placeholder.com/150?text=Creative",
    category: "creative",
    ageRestriction: "all",
  },
  {
    id: "classic-dark",
    name: "Classic Dark",
    description: "Traditional dark interface",
    screenshot: "https://via.placeholder.com/150?text=Classic+Dark",
    category: "classic",
    ageRestriction: "all",
  },
  {
    id: "modern-gradient",
    name: "Modern Gradient",
    description: "Contemporary design with gradient accents",
    screenshot: "https://via.placeholder.com/150?text=Modern+Gradient",
    category: "modern",
    ageRestriction: "all",
  },
  {
    id: "bold-creative",
    name: "Bold Creative",
    description: "Striking design for creative content",
    screenshot: "https://via.placeholder.com/150?text=Bold+Creative",
    category: "creative",
    ageRestriction: "18+",
  },
  {
    id: "muted-professional",
    name: "Muted Professional",
    description: "Subdued and professional corporate look",
    screenshot: "https://via.placeholder.com/150?text=Muted+Professional",
    category: "corporate",
    ageRestriction: "all",
  },
];

interface TemplateSelectProps {
  onSelectTemplate: (template: Template) => void;
  currentTemplateId?: string;
  showAgeRestricted?: boolean;
}

export function TemplateSelect({
  onSelectTemplate,
  currentTemplateId = "default",
  showAgeRestricted = false,
}: TemplateSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedTemplate, setSelectedTemplate] = React.useState<Template | null>(
    templates.find(t => t.id === currentTemplateId) || null
  );
  const [activeCategory, setActiveCategory] = React.useState<string>("all");
  const { toast } = useToast();
  const { hasPermission } = useRole();
  
  const canChangeGlobalTheme = hasPermission("change:global-theme");
  const canViewAgeRestricted = hasPermission("set:age-restriction");
  
  const filteredTemplates = templates.filter(template => {
    // Filter by category
    if (activeCategory !== "all" && template.category !== activeCategory) {
      return false;
    }
    
    // Filter by age restriction
    if (!showAgeRestricted && !canViewAgeRestricted && template.ageRestriction === "18+") {
      return false;
    }
    
    return true;
  });
  
  const categories = [
    { id: "all", label: "All" },
    { id: "modern", label: "Modern" },
    { id: "classic", label: "Classic" },
    { id: "minimal", label: "Minimal" },
    { id: "corporate", label: "Corporate" },
    { id: "creative", label: "Creative" },
  ];

  const handleSelect = (template: Template) => {
    setSelectedTemplate(template);
    setOpen(false);
    onSelectTemplate(template);
    toast({
      title: "Template changed",
      description: `You switched to the ${template.name} template`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Layout className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Select a Template</DialogTitle>
          <DialogDescription>
            Choose a template that fits your brand and content style.
            {!canChangeGlobalTheme && " Your selection will apply to your account only."}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex items-center gap-2 py-2 overflow-x-auto">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category.id)}
              className="whitespace-nowrap"
            >
              {category.label}
            </Button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
          {filteredTemplates.map((template) => (
            <div 
              key={template.id}
              className={cn(
                "flex cursor-pointer flex-col overflow-hidden rounded-lg border transition-all hover:shadow-md",
                selectedTemplate?.id === template.id ? "ring-2 ring-primary" : ""
              )}
              onClick={() => handleSelect(template)}
            >
              <div className="relative h-40 w-full">
                <img
                  src={template.screenshot}
                  alt={template.name}
                  className="h-full w-full object-cover"
                />
                {selectedTemplate?.id === template.id && (
                  <div className="absolute right-2 top-2 rounded-full bg-primary p-1">
                    <Check className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
                {template.ageRestriction === "18+" && (
                  <div className="absolute left-2 top-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    18+
                  </div>
                )}
              </div>
              <div className="p-3">
                <h3 className="font-medium">{template.name}</h3>
                <p className="text-sm text-muted-foreground">{template.description}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">
                    {template.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {canChangeGlobalTheme && (
          <div className="mt-2 border-t pt-4">
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 rounded-full bg-amber-500"></div>
              <p className="text-sm font-medium">You can set this template as the global default for all users.</p>
            </div>
          </div>
        )}
        
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          {canChangeGlobalTheme && (
            <Button
              variant="outline"
              onClick={() => {
                if (selectedTemplate) {
                  toast({
                    title: "Global template updated",
                    description: `The ${selectedTemplate.name} template is now the global default for all users.`,
                  });
                  setOpen(false);
                }
              }}
            >
              Set as Global Default
            </Button>
          )}
          <Button onClick={() => selectedTemplate && handleSelect(selectedTemplate)}>
            Apply Template
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
