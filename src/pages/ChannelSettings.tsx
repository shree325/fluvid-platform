
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Check, ChevronDown, ChevronRight, Globe, Users } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useRole } from "@/contexts/RoleContext";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

// Form schema for general settings
const generalFormSchema = z.object({
  currency: z.string().min(1, "Currency is required"),
});

// Form schema for basic info
const basicInfoFormSchema = z.object({
  country: z.string().min(1, "Country is required"),
  keywords: z.string().optional(),
});

// Form schema for advanced settings
const advancedSettingsFormSchema = z.object({
  autoCaptions: z.boolean().default(false),
  interestAds: z.boolean().default(true),
  allowClipping: z.boolean().default(false),
  thirdPartyTraining: z.boolean().default(false),
});

// Form schema for upload defaults
const uploadDefaultsFormSchema = z.object({
  defaultTitle: z.string().optional(),
  defaultDescription: z.string().optional(),
  defaultVisibility: z.string().default("private"),
});

// Form schema for permissions
const permissionsFormSchema = z.object({
  email: z.string().email("Invalid email address").optional(),
  roles: z.record(z.boolean()).default({}),
});

// List of available currencies
const currencies = [
  { value: "usd", label: "USD - US Dollar" },
  { value: "eur", label: "EUR - Euro" },
  { value: "gbp", label: "GBP - British Pound" },
  { value: "jpy", label: "JPY - Japanese Yen" },
  { value: "cad", label: "CAD - Canadian Dollar" },
  { value: "aud", label: "AUD - Australian Dollar" },
];

// List of countries
const countries = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "gb", label: "United Kingdom" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "jp", label: "Japan" },
  { value: "au", label: "Australia" },
  { value: "br", label: "Brazil" },
  { value: "in", label: "India" },
];

// List of visibility options
const visibilityOptions = [
  { value: "public", label: "Public" },
  { value: "private", label: "Private" },
  { value: "unlisted", label: "Unlisted" },
];

// List of roles for permissions
const availableRoles = [
  { id: "manager", label: "Manager" },
  { id: "editor", label: "Editor" },
  { id: "editor_limited", label: "Editor (Limited)" },
  { id: "subtitle_editor", label: "Subtitle Editor" },
  { id: "viewer", label: "Viewer" },
  { id: "viewer_limited", label: "Viewer (Limited)" },
];

// Mock team members with roles
const teamMembers = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "manager" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "editor" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "viewer" },
];

const ChannelSettings = () => {
  const { user } = useAuth();
  const { hasPermission } = useRole();
  const [activeTab, setActiveTab] = useState("general");
  const [otherSettingsOpen, setOtherSettingsOpen] = useState(false);

  // Feature eligibility level
  const eligibilityLevel = "Advanced";

  // General form
  const generalForm = useForm<z.infer<typeof generalFormSchema>>({
    resolver: zodResolver(generalFormSchema),
    defaultValues: {
      currency: "usd",
    },
  });

  // Basic info form
  const basicInfoForm = useForm<z.infer<typeof basicInfoFormSchema>>({
    resolver: zodResolver(basicInfoFormSchema),
    defaultValues: {
      country: "us",
      keywords: "video, content, educational",
    },
  });

  // Advanced settings form
  const advancedForm = useForm<z.infer<typeof advancedSettingsFormSchema>>({
    resolver: zodResolver(advancedSettingsFormSchema),
    defaultValues: {
      autoCaptions: true,
      interestAds: true,
      allowClipping: false,
      thirdPartyTraining: false,
    },
  });

  // Upload defaults form
  const uploadDefaultsForm = useForm<z.infer<typeof uploadDefaultsFormSchema>>({
    resolver: zodResolver(uploadDefaultsFormSchema),
    defaultValues: {
      defaultTitle: "New Video",
      defaultDescription: "Description of my video",
      defaultVisibility: "private",
    },
  });

  // Permissions form
  const permissionsForm = useForm<z.infer<typeof permissionsFormSchema>>({
    resolver: zodResolver(permissionsFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onGeneralSubmit = (data: z.infer<typeof generalFormSchema>) => {
    toast.success("General settings saved successfully");
    console.log("General settings:", data);
  };

  const onBasicInfoSubmit = (data: z.infer<typeof basicInfoFormSchema>) => {
    toast.success("Basic info saved successfully");
    console.log("Basic info:", data);
  };

  const onAdvancedSubmit = (data: z.infer<typeof advancedSettingsFormSchema>) => {
    toast.success("Advanced settings saved successfully");
    console.log("Advanced settings:", data);
  };

  const onUploadDefaultsSubmit = (data: z.infer<typeof uploadDefaultsFormSchema>) => {
    toast.success("Upload defaults saved successfully");
    console.log("Upload defaults:", data);
  };

  const handleInviteUser = (data: z.infer<typeof permissionsFormSchema>) => {
    if (data.email) {
      toast.success(`Invitation sent to ${data.email}`);
      permissionsForm.reset({ email: "" });
    }
  };

  const handleLinkAccount = () => {
    toast.success("Account linking initiated");
  };

  const handleManageAccount = () => {
    toast.success("Redirecting to account management");
  };

  const handleRemoveContent = () => {
    toast.info("Content removal options will be displayed");
  };

  // Check permissions
  if (!hasPermission("edit:channel")) {
    return (
      <div className="flex items-center justify-center h-full">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle>Access Restricted</CardTitle>
            <CardDescription>
              You don't have permission to access channel settings.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Please contact an administrator to request access.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Channel Settings</h1>
        <p className="text-muted-foreground">
          Manage your channel's settings, permissions, and defaults
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="channel">Channel</TabsTrigger>
          <TabsTrigger value="advanced">Advanced Settings</TabsTrigger>
          <TabsTrigger value="upload">Upload Defaults</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
        </TabsList>

        {/* General Settings Tab */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure general settings for your channel
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...generalForm}>
                <form onSubmit={generalForm.handleSubmit(onGeneralSubmit)} className="space-y-6">
                  <FormField
                    control={generalForm.control}
                    name="currency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Currency</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select currency" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {currencies.map((currency) => (
                              <SelectItem key={currency.value} value={currency.value}>
                                {currency.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          This is the currency that will be used for monetization and payments
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit">Save Changes</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Channel Tab */}
        <TabsContent value="channel">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Configure basic information about your channel
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...basicInfoForm}>
                <form onSubmit={basicInfoForm.handleSubmit(onBasicInfoSubmit)} className="space-y-6">
                  <FormField
                    control={basicInfoForm.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country of Residence</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {countries.map((country) => (
                              <SelectItem key={country.value} value={country.value}>
                                {country.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Your country of residence for tax and legal purposes
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={basicInfoForm.control}
                    name="keywords"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Keywords</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter keywords separated by commas" {...field} />
                        </FormControl>
                        <FormDescription>
                          Keywords help viewers find your content
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit">Save Changes</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Advanced Settings Tab */}
        <TabsContent value="advanced">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>
                Configure advanced settings for your channel
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Button onClick={handleLinkAccount} className="w-full">
                Link Account
              </Button>

              <Form {...advancedForm}>
                <form onSubmit={advancedForm.handleSubmit(onAdvancedSubmit)} className="space-y-6">
                  <FormField
                    control={advancedForm.control}
                    name="autoCaptions"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Automatic Captions</FormLabel>
                          <FormDescription>
                            Enable automatic caption generation for your videos
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={advancedForm.control}
                    name="interestAds"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Interest-based Ads</FormLabel>
                          <FormDescription>
                            Allow personalized ads based on viewer interests
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={advancedForm.control}
                    name="allowClipping"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Allow Viewers to Clip Content</FormLabel>
                          <FormDescription>
                            Let viewers create short clips from your videos
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={advancedForm.control}
                    name="thirdPartyTraining"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Enable Third-party Training</FormLabel>
                          <FormDescription>
                            Allow your content to be used for AI training purposes
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Collapsible
                    open={otherSettingsOpen}
                    onOpenChange={setOtherSettingsOpen}
                    className="border rounded-lg p-4"
                  >
                    <CollapsibleTrigger asChild>
                      <div className="flex items-center justify-between cursor-pointer">
                        <div className="text-base font-medium">Other Settings</div>
                        <Button variant="ghost" size="sm">
                          {otherSettingsOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                        </Button>
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-4 mt-4">
                      <div className="rounded-lg border p-4">
                        <h4 className="text-sm font-medium">Video Quality</h4>
                        <p className="text-sm text-muted-foreground">
                          Configure default video quality settings
                        </p>
                      </div>
                      <div className="rounded-lg border p-4">
                        <h4 className="text-sm font-medium">Audio Settings</h4>
                        <p className="text-sm text-muted-foreground">
                          Configure default audio processing settings
                        </p>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>

                  <div className="flex space-x-4">
                    <Button onClick={handleManageAccount} variant="outline" className="flex-1">
                      Manage Account
                    </Button>
                    <Button onClick={handleRemoveContent} variant="outline" className="flex-1">
                      Remove Content
                    </Button>
                  </div>

                  <Button type="submit">Save Changes</Button>
                </form>
              </Form>

              <div className="border p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Globe className="h-5 w-5 text-primary" />
                  <h3 className="text-base font-medium">Feature Eligibility</h3>
                </div>
                <div className="mt-2">
                  <div className="text-sm font-medium">Current Level: {eligibilityLevel}</div>
                  <div className="flex items-center space-x-2 mt-2">
                    <div className="h-2 bg-primary rounded-full flex-1" />
                    <div className="h-2 bg-primary rounded-full flex-1" />
                    <div className="h-2 bg-primary rounded-full flex-1" />
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span>Standard</span>
                    <span>Intermediate</span>
                    <span>Advanced</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Upload Defaults Tab */}
        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle>Upload Defaults</CardTitle>
              <CardDescription>
                Configure default settings for new video uploads
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...uploadDefaultsForm}>
                <form onSubmit={uploadDefaultsForm.handleSubmit(onUploadDefaultsSubmit)} className="space-y-6">
                  <FormField
                    control={uploadDefaultsForm.control}
                    name="defaultTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Default Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter default title" {...field} />
                        </FormControl>
                        <FormDescription>
                          This will be the default title for new uploads
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={uploadDefaultsForm.control}
                    name="defaultDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Default Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter default description"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          This will be the default description for new uploads
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={uploadDefaultsForm.control}
                    name="defaultVisibility"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Default Visibility</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select visibility" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {visibilityOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          This will be the default visibility for new uploads
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit">Save Changes</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Permissions Tab */}
        <TabsContent value="permissions">
          <Card>
            <CardHeader>
              <CardTitle>Team Permissions</CardTitle>
              <CardDescription>
                Manage access and roles for your team members
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <h3 className="text-lg font-medium">Team Members</h3>
              </div>
              
              <div className="border rounded-md overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted">
                      <th className="text-left p-3 font-medium">Name</th>
                      <th className="text-left p-3 font-medium">Email</th>
                      <th className="text-left p-3 font-medium">Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamMembers.map((member) => (
                      <tr key={member.id} className="border-t">
                        <td className="p-3">{member.name}</td>
                        <td className="p-3">{member.email}</td>
                        <td className="p-3">
                          <div className="flex items-center space-x-2">
                            <span className="capitalize">{member.role}</span>
                            {member.role === "manager" && (
                              <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                                Primary
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="border rounded-md p-4 space-y-4">
                <h3 className="font-medium">Invite Team Member</h3>
                <Form {...permissionsForm}>
                  <div className="flex gap-4">
                    <FormField
                      control={permissionsForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder="Email address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button onClick={permissionsForm.handleSubmit(handleInviteUser)}>
                      Invite
                    </Button>
                  </div>
                </Form>
              </div>

              <div className="border rounded-md p-4 space-y-4">
                <h3 className="font-medium">Available Roles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availableRoles.map((role) => (
                    <div key={role.id} className="flex items-start space-x-2">
                      <Checkbox id={role.id} />
                      <div className="grid gap-1.5">
                        <label
                          htmlFor={role.id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {role.label}
                        </label>
                        <p className="text-sm text-muted-foreground">
                          {role.id === "manager" 
                            ? "Full access to all settings and permissions" 
                            : role.id === "editor" 
                              ? "Can edit videos and content, but cannot change settings"
                              : role.id === "viewer"
                                ? "Can only view content, no editing permissions"
                                : "Limited permissions based on role"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChannelSettings;
