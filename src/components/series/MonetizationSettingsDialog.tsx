
import { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DollarSign, CreditCard, Unlock, TrendingUp } from 'lucide-react';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

interface MonetizationSettingsDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  currentSettings: {
    type: string;
    price?: number;
  };
}

const formSchema = z.object({
  type: z.string(),
  price: z.coerce.number().min(0.99).optional().or(z.literal('')),
});

const MonetizationSettingsDialog = ({ open, onClose, onSave, currentSettings }: MonetizationSettingsDialogProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: currentSettings.type || 'free',
      price: currentSettings.price || 9.99,
    },
  });
  
  useEffect(() => {
    if (open) {
      form.reset({
        type: currentSettings.type || 'free',
        price: currentSettings.price || 9.99,
      });
    }
  }, [open, currentSettings, form]);
  
  const watchType = form.watch('type');
  
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    onSave({
      type: data.type,
      price: data.type !== 'free' ? data.price : undefined,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Monetization Settings</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Access Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-3 gap-4"
                    >
                      <Card className={`cursor-pointer border-2 ${field.value === 'free' ? 'border-primary' : ''}`}>
                        <CardHeader className="pb-2">
                          <Unlock className="h-4 w-4 text-muted-foreground" />
                          <CardTitle className="text-sm">Free</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <CardDescription className="text-xs">Available to everyone</CardDescription>
                            <RadioGroupItem value="free" className="sr-only" id="free" />
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className={`cursor-pointer border-2 ${field.value === 'subscription' ? 'border-primary' : ''}`}>
                        <CardHeader className="pb-2">
                          <TrendingUp className="h-4 w-4 text-muted-foreground" />
                          <CardTitle className="text-sm">Subscription</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <CardDescription className="text-xs">Subscription members only</CardDescription>
                            <RadioGroupItem value="subscription" className="sr-only" id="subscription" />
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className={`cursor-pointer border-2 ${field.value === 'pay-per-view' ? 'border-primary' : ''}`}>
                        <CardHeader className="pb-2">
                          <CreditCard className="h-4 w-4 text-muted-foreground" />
                          <CardTitle className="text-sm">Pay Per View</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <CardDescription className="text-xs">One-time purchase</CardDescription>
                            <RadioGroupItem value="pay-per-view" className="sr-only" id="pay-per-view" />
                          </div>
                        </CardContent>
                      </Card>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {watchType !== 'free' && (
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price {watchType === 'subscription' && '(per month)'}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="number" step="0.01" className="pl-8" {...field} />
                      </div>
                    </FormControl>
                    <FormDescription>
                      {watchType === 'subscription' 
                        ? 'Set the monthly subscription price for access to this series.'
                        : 'Set the one-time purchase price for access to this series.'}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Save Settings</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default MonetizationSettingsDialog;
