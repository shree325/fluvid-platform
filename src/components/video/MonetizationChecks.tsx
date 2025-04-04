
import { useState } from 'react';
import { DollarSign, ShieldCheck, ShieldAlert, AlertTriangle, CheckCircle, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface MonetizationChecksProps {
  videoId?: string;
  onStatusChange?: (status: 'eligible' | 'limited' | 'ineligible') => void;
}

interface ContentCheck {
  id: string;
  name: string;
  status: 'pass' | 'warning' | 'fail' | 'pending';
  details: string;
  helpLink?: string;
}

const MonetizationChecks = ({ videoId, onStatusChange }: MonetizationChecksProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [monetizationStatus, setMonetizationStatus] = useState<'eligible' | 'limited' | 'ineligible' | 'unknown'>('unknown');
  
  const [contentChecks, setContentChecks] = useState<ContentCheck[]>([
    {
      id: 'copyright',
      name: 'Copyright Check',
      status: 'pending',
      details: 'Scan your video for potential copyright issues.',
    },
    {
      id: 'advertiser',
      name: 'Advertiser-Friendly',
      status: 'pending',
      details: 'Check if your content is advertiser-friendly.',
    },
    {
      id: 'claims',
      name: 'Content ID Claims',
      status: 'pending',
      details: 'Check for any content ID claims on your video.',
    },
    {
      id: 'restrictions',
      name: 'Age Restrictions',
      status: 'pending',
      details: 'Check if your content might be age-restricted.',
    },
  ]);

  // Mock function to simulate checking the video for monetization eligibility
  const scanVideo = () => {
    setIsScanning(true);
    setProgress(0);
    
    // Reset checks
    setContentChecks(prev => prev.map(check => ({
      ...check,
      status: 'pending'
    })));
    
    // Simulate API progress updates
    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + 5;
        
        // Update individual checks based on progress
        if (next === 25) {
          updateCheckStatus('copyright', 'pass');
        } else if (next === 50) {
          updateCheckStatus('advertiser', 'warning');
        } else if (next === 75) {
          updateCheckStatus('claims', 'pass');
        } else if (next === 95) {
          updateCheckStatus('restrictions', 'pass');
        }
        
        if (next >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          determineOverallStatus();
          return 100;
        }
        return next;
      });
    }, 200);
  };

  const updateCheckStatus = (id: string, status: 'pass' | 'warning' | 'fail') => {
    setContentChecks(prev => 
      prev.map(check => 
        check.id === id 
          ? { 
              ...check, 
              status,
              details: status === 'pass' 
                ? 'No issues detected.' 
                : status === 'warning' 
                  ? 'Potential issues detected that may limit monetization.' 
                  : 'Issues detected that may prevent monetization.'
            } 
          : check
      )
    );
  };

  const determineOverallStatus = () => {
    // Count failures and warnings
    const failures = contentChecks.filter(check => check.status === 'fail').length;
    const warnings = contentChecks.filter(check => check.status === 'warning').length;
    
    let status: 'eligible' | 'limited' | 'ineligible';
    
    if (failures > 0) {
      status = 'ineligible';
    } else if (warnings > 0) {
      status = 'limited';
    } else {
      status = 'eligible';
    }
    
    setMonetizationStatus(status);
    
    if (onStatusChange) {
      onStatusChange(status);
    }
  };

  const getStatusIcon = (status: 'pass' | 'warning' | 'fail' | 'pending') => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'fail':
        return <ShieldAlert className="h-5 w-5 text-red-500" />;
      case 'pending':
        return <HelpCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Monetization & Copyright Check
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {monetizationStatus !== 'unknown' && (
            <div className="mb-4">
              <Badge 
                className={`px-3 py-1 text-sm ${
                  monetizationStatus === 'eligible' 
                    ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                    : monetizationStatus === 'limited' 
                      ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100' 
                      : 'bg-red-100 text-red-800 hover:bg-red-100'
                }`}
              >
                {monetizationStatus === 'eligible' 
                  ? 'Eligible for full monetization' 
                  : monetizationStatus === 'limited' 
                    ? 'Limited monetization' 
                    : 'Not eligible for monetization'}
              </Badge>
            </div>
          )}
          
          {isScanning && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Scanning video...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} />
            </div>
          )}
          
          <div className="space-y-3 mt-4">
            {contentChecks.map((check) => (
              <div key={check.id} className="flex items-start gap-3 p-3 border rounded-md">
                <div className="mt-0.5">
                  {getStatusIcon(check.status)}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{check.name}</h4>
                  <p className="text-sm text-muted-foreground">{check.details}</p>
                </div>
                {check.helpLink && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <HelpCircle className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Learn more about {check.name.toLowerCase()}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            ))}
          </div>
          
          <Button 
            variant="outline" 
            className="w-full mt-4" 
            onClick={scanVideo}
            disabled={isScanning}
          >
            <ShieldCheck className="h-4 w-4 mr-2" />
            {isScanning ? 'Scanning...' : 'Check Monetization Eligibility'}
          </Button>
          
          <p className="text-xs text-muted-foreground mt-2">
            Note: This check helps identify potential issues but does not guarantee monetization. Review our policies for more details.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MonetizationChecks;
