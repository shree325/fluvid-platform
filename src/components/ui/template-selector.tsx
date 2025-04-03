
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
        <Button variant="outline" className="flex items-center gap-2">
          <Layout className="h-4 w-4" />
          <span>Change Template</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Select a Template</DialogTitle>
          <DialogDescription>
            Choose a template that fits your brand and content style.
          </DialogDescription>
        </DialogHeader>
        <Command>
          <CommandInput placeholder="Search templates..." />
          <CommandList>
            <CommandEmpty>No templates found.</CommandEmpty>
            <CommandGroup>
              {templates.map((template) => (
                <CommandItem
                  key={template.id}
                  onSelect={() => handleSelect(template)}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 overflow-hidden rounded border">
                      <img
                        src={template.screenshot}
                        alt={template.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium">{template.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {template.description}
                      </span>
                    </div>
                  </div>
                  {selectedTemplate?.id === template.id && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
