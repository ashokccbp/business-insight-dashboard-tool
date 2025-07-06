import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Building2, MapPin } from 'lucide-react';

interface BusinessFormProps {
  onSubmit: (name: string, location: string) => void;
  isLoading: boolean;
}

const BusinessForm: React.FC<BusinessFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    location: ''
  });

  const validateForm = () => {
    const newErrors = { name: '', location: '' };
    
    if (!formData.name.trim()) {
      newErrors.name = 'Business name is required';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    setErrors(newErrors);
    return !newErrors.name && !newErrors.location;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData.name.trim(), formData.location.trim());
    }
  };

  const handleInputChange = (field: 'name' | 'location', value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="business-card p-8">
        <CardHeader className="text-center pb-8">
          <CardTitle className="text-2xl font-bold mb-3">
            Analyze Your Business
          </CardTitle>
          <CardDescription className="text-lg">
            Enter your business details to get comprehensive insights and AI-generated SEO content
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="business-name" className="text-sm font-medium flex items-center gap-2">
                <Building2 className="w-4 h-4 text-primary" />
                Business Name
              </Label>
              <Input
                id="business-name"
                placeholder="e.g., Cake & Co, Tech Solutions Inc."
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`h-12 text-base ${errors.name ? 'border-destructive focus:ring-destructive' : ''}`}
                disabled={isLoading}
              />
              {errors.name && (
                <p className="text-sm text-destructive animate-slide-up">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-sm font-medium flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                Location
              </Label>
              <Input
                id="location"
                placeholder="e.g., Mumbai, New York, London"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className={`h-12 text-base ${errors.location ? 'border-destructive focus:ring-destructive' : ''}`}
                disabled={isLoading}
              />
              {errors.location && (
                <p className="text-sm text-destructive animate-slide-up">{errors.location}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold"
              variant="hero"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Analyzing Business...
                </>
              ) : (
                <>
                  <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Get Business Insights
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessForm;