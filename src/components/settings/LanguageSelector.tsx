
import React from "react";
import { Globe } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Language options
const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Español (Spanish)" },
  { code: "fr", name: "Français (French)" },
  { code: "de", name: "Deutsch (German)" },
  { code: "it", name: "Italiano (Italian)" },
  { code: "pt", name: "Português (Portuguese)" },
  { code: "ru", name: "Русский (Russian)" },
  { code: "ja", name: "日本語 (Japanese)" },
  { code: "zh", name: "中文 (Chinese)" },
  { code: "hi", name: "हिन्दी (Hindi)" },
  { code: "ar", name: "العربية (Arabic)" },
  { code: "ko", name: "한국어 (Korean)" },
];

interface LanguageSelectorProps {
  onChange?: (language: string) => void;
}

export function LanguageSelector({ onChange }: LanguageSelectorProps) {
  const [uiLanguage, setUiLanguage] = React.useState("en");
  const [subtitleLanguage, setSubtitleLanguage] = React.useState("en");

  const handleUiLanguageChange = (value: string) => {
    setUiLanguage(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Language Preferences
        </CardTitle>
        <CardDescription>
          Set your preferred language for the interface and content
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="ui-language">Interface Language</Label>
          <Select value={uiLanguage} onValueChange={handleUiLanguageChange}>
            <SelectTrigger id="ui-language" className="w-full">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Languages</SelectLabel>
                {languages.map((language) => (
                  <SelectItem key={language.code} value={language.code}>
                    {language.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            This will change the language of buttons, menus and other interface elements
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="subtitle-language">Subtitle Language</Label>
          <Select value={subtitleLanguage} onValueChange={setSubtitleLanguage}>
            <SelectTrigger id="subtitle-language" className="w-full">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Languages</SelectLabel>
                {languages.map((language) => (
                  <SelectItem key={`sub-${language.code}`} value={language.code}>
                    {language.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Preferred language for video subtitles when available
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
