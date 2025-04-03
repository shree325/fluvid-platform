
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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useToast } from "@/hooks/use-toast";

export type Template = {
  id: string;
  name: string;
  description: string;
  screenshot: string;
  category: "modern" | "classic" | "minimal" | "corporate" | "creative";
};

const templates: Template[] = [
  {
    id: "default",
    name: "Default",
    description: "The default application layout",
    screenshot: "https://via.placeholder.com/150?text=Default",
    category: "modern",
  },
  {
    id: "dark-corporate",
    name: "Dark Corporate",
    description: "Professional dark theme for business",
    screenshot: "https://via.placeholder.com/150?text=Dark+Corporate",
    category: "corporate",
  },
  {
    id: "light-minimal",
    name: "Light Minimal",
    description: "Clean, minimalistic light theme",
    screenshot: "https://via.placeholder.com/150?text=Light+Minimal",
    category: "minimal",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Bold and colorful for creative projects",
    screenshot: "https://via.placeholder.com/150?text=Creative",
    category: "creative",
  },
  {
    id: "classic-dark",
    name: "Classic Dark",
    description: "Traditional dark interface",
    screenshot: "https://via.placeholder.com/150?text=Classic+Dark",
    category: "classic",
  },
  {
    id: "modern-gradient",
    name: "Modern Gradient",
    description: "Contemporary design with gradient accents",
    screenshot: "https://via.placeholder.com/150?text=Modern+Gradient",
    category: "modern",
  },
];

interface TemplateSelectProps {
  onSelectTemplate: (template: Template) => void;
  currentTemplateId?: string;
}

export function TemplateSelect({
  onSelectTemplate,
  currentTemplateId = "default",
}: TemplateSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedTemplate, setSelectedTemplate] = React.useState<Template | null>(
    templates.find(t => t.id === currentTemplateId) || null
  );
  const { toast } = useToast();

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
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Select a Template</DialogTitle>
          <DialogDescription>
            Choose a template that fits your brand and content style.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-4 py-4">
          {templates.map((template) => (
            <div 
              key={template.id}
              className={cn(
                "flex cursor-pointer flex-col overflow-hidden rounded-lg border transition-all hover:shadow-md",
                selectedTemplate?.id === template.id ? "ring-2 ring-primary" : ""
              )}
              onClick={() => handleSelect(template)}
            >
              <div className="relative h-32 w-full">
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
              </div>
              <div className="p-3">
                <h3 className="font-medium">{template.name}</h3>
                <p className="text-sm text-muted-foreground">{template.description}</p>
                <div className="mt-2">
                  <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">
                    {template.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => selectedTemplate && handleSelect(selectedTemplate)}>
            Apply Template
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
