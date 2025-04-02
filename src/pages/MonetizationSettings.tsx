
import { useState } from 'react';
import { DollarSign, CheckCircle2, Coffee, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const MonetizationSettings = () => {
  const [subscriptionPlan, setSubscriptionPlan] = useState('pro');
  
  const handleSettingsSave = () => {
    toast.success('Monetization settings saved successfully!');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-semibold">Monetization Settings</h1>
        <p className="text-muted-foreground">
          Manage your revenue streams and subscription plans
        </p>
      </div>
      
      <Tabs defaultValue="subscription" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="subscription">Your Subscription</TabsTrigger>
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="subscription">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className={`border-2 ${subscriptionPlan === 'free' ? 'border-primary' : 'border-transparent'}`}>
              <CardHeader>
                <CardTitle>Free</CardTitle>
                <CardDescription>Basic features for personal use</CardDescription>
                <div className="mt-2">
                  <span className="text-3xl font-bold">$0</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="text-sm">3 videos</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="text-sm">Basic analytics</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="text-sm">720p quality</span>
                </div>
              </CardContent>
              <CardFooter>
                {subscriptionPlan === 'free' ? (
                  <Button variant="outline" className="w-full" disabled>
                    Current Plan
                  </Button>
                ) : (
                  <Button variant="outline" className="w-full" onClick={() => setSubscriptionPlan('free')}>
                    Downgrade
                  </Button>
                )}
              </CardFooter>
            </Card>
            
            <Card className={`border-2 ${subscriptionPlan === 'pro' ? 'border-primary' : 'border-transparent'}`}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Pro</CardTitle>
                    <CardDescription>For content creators and teams</CardDescription>
                  </div>
                  <Badge>Popular</Badge>
                </div>
                <div className="mt-2">
                  <span className="text-3xl font-bold">$29</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="text-sm">Unlimited videos</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="text-sm">Advanced analytics</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="text-sm">1080p quality</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="text-sm">Interactive elements</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="text-sm">Ad revenue sharing</span>
                </div>
              </CardContent>
              <CardFooter>
                {subscriptionPlan === 'pro' ? (
                  <Button variant="outline" className="w-full" disabled>
                    Current Plan
                  </Button>
                ) : (
                  <Button className="w-full" onClick={() => setSubscriptionPlan('pro')}>
                    Upgrade
                  </Button>
                )}
              </CardFooter>
            </Card>
            
            <Card className={`border-2 ${subscriptionPlan === 'enterprise' ? 'border-primary' : 'border-transparent'}`}>
              <CardHeader>
                <CardTitle>Enterprise</CardTitle>
                <CardDescription>For large organizations</CardDescription>
                <div className="mt-2">
                  <span className="text-3xl font-bold">$99</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="text-sm">Everything in Pro</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="text-sm">4K quality</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="text-sm">White-label option</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="text-sm">Priority support</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="text-sm">Custom integrations</span>
                </div>
              </CardContent>
              <CardFooter>
                {subscriptionPlan === 'enterprise' ? (
                  <Button variant="outline" className="w-full" disabled>
                    Current Plan
                  </Button>
                ) : (
                  <Button className="w-full" onClick={() => setSubscriptionPlan('enterprise')}>
                    Upgrade
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
          
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Billing Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="card-name">Name on Card</Label>
                    <Input id="card-name" placeholder="John Doe" defaultValue="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input id="card-number" placeholder="•••• •••• •••• ••••" defaultValue="•••• •••• •••• 4242" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" defaultValue="12/25" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="•••" defaultValue="•••" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="billing-address">Billing Address</Label>
                  <Input id="billing-address" placeholder="123 Main St, Anytown, CA 12345" />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="auto-renew" defaultChecked />
                  <Label htmlFor="auto-renew">Auto-renew subscription</Label>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button onClick={() => toast.success('Billing information updated')}>Save Changes</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="earnings">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$1,248.42</div>
                <p className="text-xs text-muted-foreground">+12.5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Ad Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$845.20</div>
                <p className="text-xs text-muted-foreground">+8.2% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Subscription Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$403.22</div>
                <p className="text-xs text-muted-foreground">+24.8% from last month</p>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-4 text-sm font-medium text-muted-foreground">
                  <div>Date</div>
                  <div>Type</div>
                  <div>Amount</div>
                  <div>Status</div>
                </div>
                <div className="divide-y">
                  {[
                    { date: 'Aug 15, 2023', type: 'Ad Revenue', amount: 425.80, status: 'Paid' },
                    { date: 'Jul 15, 2023', type: 'Ad Revenue', amount: 398.40, status: 'Paid' },
                    { date: 'Jun 15, 2023', type: 'Ad Revenue', amount: 352.16, status: 'Paid' },
                    { date: 'May 15, 2023', type: 'Ad Revenue', amount: 312.75, status: 'Paid' },
                    { date: 'Apr 15, 2023', type: 'Ad Revenue', amount: 275.20, status: 'Paid' },
                  ].map((item, i) => (
                    <div key={i} className="grid grid-cols-4 py-3 text-sm">
                      <div>{item.date}</div>
                      <div>{item.type}</div>
                      <div>${item.amount.toFixed(2)}</div>
                      <div>
                        <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                          {item.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Payout Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="payout-method">Payout Method</Label>
                <Select defaultValue="paypal">
                  <SelectTrigger id="payout-method">
                    <SelectValue placeholder="Select payout method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paypal">PayPal</SelectItem>
                    <SelectItem value="bank">Bank Transfer</SelectItem>
                    <SelectItem value="stripe">Stripe</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="paypal-email">PayPal Email</Label>
                <Input id="paypal-email" placeholder="your-email@example.com" defaultValue="john@example.com" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="payout-threshold">Minimum Payout Threshold</Label>
                <Select defaultValue="100">
                  <SelectTrigger id="payout-threshold">
                    <SelectValue placeholder="Select minimum amount" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="50">$50</SelectItem>
                    <SelectItem value="100">$100</SelectItem>
                    <SelectItem value="250">$250</SelectItem>
                    <SelectItem value="500">$500</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="auto-payout" defaultChecked />
                <Label htmlFor="auto-payout">Automatic payouts when threshold is reached</Label>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={() => toast.success('Payout settings updated')}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Monetization Options</CardTitle>
                <CardDescription>Control how your videos generate revenue</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enable-ads">Enable Video Ads</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow pre-roll, mid-roll, and post-roll ads on your videos
                    </p>
                  </div>
                  <Switch id="enable-ads" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enable-subscription">Enable Subscription Content</Label>
                    <p className="text-sm text-muted-foreground">
                      Make some videos available only to paid subscribers
                    </p>
                  </div>
                  <Switch id="enable-subscription" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enable-tips">Enable Tips & Donations</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow viewers to send you tips during video playback
                    </p>
                  </div>
                  <Switch id="enable-tips" defaultChecked />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Ad Preferences</CardTitle>
                <CardDescription>Customize the ad experience on your videos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ad-frequency">Ad Frequency</Label>
                  <Select defaultValue="balanced">
                    <SelectTrigger id="ad-frequency">
                      <SelectValue placeholder="Select ad frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="minimal">Minimal (fewer ads, less revenue)</SelectItem>
                      <SelectItem value="balanced">Balanced</SelectItem>
                      <SelectItem value="frequent">Frequent (more ads, more revenue)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Ad Types</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="preroll-ads" defaultChecked />
                      <Label htmlFor="preroll-ads">Pre-roll ads</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="midroll-ads" defaultChecked />
                      <Label htmlFor="midroll-ads">Mid-roll ads</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="postroll-ads" defaultChecked />
                      <Label htmlFor="postroll-ads">Post-roll ads</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="overlay-ads" />
                      <Label htmlFor="overlay-ads">Overlay ads</Label>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Content Categories (for ad targeting)</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="cat-tech" defaultChecked />
                      <Label htmlFor="cat-tech">Technology</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="cat-education" defaultChecked />
                      <Label htmlFor="cat-education">Education</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="cat-business" defaultChecked />
                      <Label htmlFor="cat-business">Business</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="cat-lifestyle" />
                      <Label htmlFor="cat-lifestyle">Lifestyle</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSettingsSave}>Save Preferences</Button>
              </CardFooter>
            </Card>
          
            <Card>
              <CardHeader>
                <CardTitle>Subscription Tiers</CardTitle>
                <CardDescription>Configure subscription options for your audience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Basic Tier ($5.99/month)</Label>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Coffee className="h-3.5 w-3.5" />
                      <span>Ad-free viewing</span>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Premium Tier ($12.99/month)</Label>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <DollarSign className="h-3.5 w-3.5" />
                      <span>Exclusive content + ad-free</span>
                    </div>
                  </div>
                  <Switch />
                </div>
                
                <div className="space-y-2 mt-4">
                  <Label htmlFor="custom-tier-price">Custom Tier</Label>
                  <div className="flex gap-2">
                    <div className="relative">
                      <DollarSign className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="custom-tier-price" 
                        placeholder="19.99" 
                        className="pl-8 w-24" 
                      />
                    </div>
                    <span className="self-center">/month</span>
                  </div>
                  <div className="space-y-2 mt-2">
                    <Label htmlFor="custom-tier-benefits">Benefits</Label>
                    <Input 
                      id="custom-tier-benefits" 
                      placeholder="Early access, exclusive content, and more"
                    />
                  </div>
                </div>
                
                <div className="rounded-lg border p-3 bg-muted/50">
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Enterprise subscription options available for business accounts. 
                      <Button variant="link" className="h-auto p-0 text-xs" onClick={() => toast.info('Enterprise options')}>
                        Contact sales
                      </Button>
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSettingsSave}>Save Subscription Settings</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Tip & Donation Settings</CardTitle>
                <CardDescription>Configure how viewers can support you</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tip-message">Custom Tip Message</Label>
                  <Input 
                    id="tip-message" 
                    placeholder="Support my content by sending a tip!" 
                    defaultValue="Thanks for supporting my channel with a tip!"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Suggested Amounts</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="relative">
                      <DollarSign className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="5" defaultValue="5" className="pl-8" />
                    </div>
                    <div className="relative">
                      <DollarSign className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="10" defaultValue="10" className="pl-8" />
                    </div>
                    <div className="relative">
                      <DollarSign className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="20" defaultValue="20" className="pl-8" />
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="custom-amount" defaultChecked />
                  <Label htmlFor="custom-amount">Allow custom amounts</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="tip-messages" defaultChecked />
                  <Label htmlFor="tip-messages">Show tip messages in chat</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="tip-alerts" defaultChecked />
                  <Label htmlFor="tip-alerts">Show on-screen alerts for tips</Label>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSettingsSave}>Save Donation Settings</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MonetizationSettings;
