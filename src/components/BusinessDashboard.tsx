import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { BusinessData } from '@/types/business';
import { 
  Star, 
  MessageSquare, 
  RefreshCw, 
  TrendingUp, 
  Eye, 
  MousePointerClick, 
  Target,
  Sparkles,
  ArrowLeft,
  BarChart3
} from 'lucide-react';

interface BusinessDashboardProps {
  data: BusinessData;
  onRegenerateHeadline: () => void;
  isLoading: boolean;
}

const BusinessDashboard: React.FC<BusinessDashboardProps> = ({ 
  data, 
  onRegenerateHeadline, 
  isLoading 
}) => {
  const [animatedValues, setAnimatedValues] = useState({
    rating: 0,
    reviews: 0,
    seoScore: 0,
    visibility: 0,
    engagement: 0,
    conversion: 0
  });

  useEffect(() => {
    // Animate counters on mount
    const timer = setTimeout(() => {
      setAnimatedValues({
        rating: data.rating,
        reviews: data.reviews,
        seoScore: data.insights.seoScore,
        visibility: data.insights.visibility,
        engagement: data.insights.engagement,
        conversion: data.insights.conversion
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [data]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-accent';
    if (score >= 60) return 'text-primary';
    return 'text-destructive';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Improvement';
  };

  return (
    <div className="space-y-8">
      {/* Business Header */}
      <div className="business-card p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold gradient-text">{data.name}</h1>
              <Badge variant="secondary" className="text-sm">
                {data.location}
              </Badge>
            </div>
            <p className="text-muted-foreground">Business Analytics Dashboard</p>
          </div>
          
          <Button 
            variant="outline" 
            onClick={() => window.location.reload()}
            className="w-fit"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            New Analysis
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Google Business Metrics */}
        <Card className="business-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-primary" />
              Google Business Profile
            </CardTitle>
            <CardDescription>Your business reputation at a glance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Average Rating</p>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold animate-counter">
                    {animatedValues.rating.toFixed(1)}
                  </span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(data.rating) 
                            ? 'text-yellow-400 fill-yellow-400' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="text-right space-y-1">
                <p className="text-sm text-muted-foreground">Total Reviews</p>
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-primary" />
                  <span className="text-2xl font-bold animate-counter">
                    {animatedValues.reviews}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SEO Headline */}
        <Card className="business-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              AI-Generated SEO Headline
            </CardTitle>
            <CardDescription>Optimized for maximum engagement</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20">
              <p className="text-lg font-medium leading-relaxed">
                "{data.headline}"
              </p>
            </div>
            
            <Button 
              onClick={onRegenerateHeadline}
              disabled={isLoading}
              className="w-full"
              variant="success"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Regenerate Headline
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Business Insights */}
      <Card className="business-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Business Performance Insights
          </CardTitle>
          <CardDescription>Comprehensive analysis of your digital presence</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* SEO Score */}
            <div className="metric-card">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">SEO Score</span>
                </div>
                <Badge variant="outline" className={getScoreColor(data.insights.seoScore)}>
                  {getScoreLabel(data.insights.seoScore)}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-2xl font-bold ${getScoreColor(data.insights.seoScore)}`}>
                    {animatedValues.seoScore}%
                  </span>
                </div>
                <Progress value={animatedValues.seoScore} className="h-2" />
              </div>
            </div>

            {/* Visibility */}
            <div className="metric-card">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Visibility</span>
                </div>
                <Badge variant="outline" className={getScoreColor(data.insights.visibility)}>
                  {getScoreLabel(data.insights.visibility)}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-2xl font-bold ${getScoreColor(data.insights.visibility)}`}>
                    {animatedValues.visibility}%
                  </span>
                </div>
                <Progress value={animatedValues.visibility} className="h-2" />
              </div>
            </div>

            {/* Engagement */}
            <div className="metric-card">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <MousePointerClick className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Engagement</span>
                </div>
                <Badge variant="outline" className={getScoreColor(data.insights.engagement)}>
                  {getScoreLabel(data.insights.engagement)}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-2xl font-bold ${getScoreColor(data.insights.engagement)}`}>
                    {animatedValues.engagement}%
                  </span>
                </div>
                <Progress value={animatedValues.engagement} className="h-2" />
              </div>
            </div>

            {/* Conversion */}
            <div className="metric-card">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Conversion</span>
                </div>
                <Badge variant="outline" className={getScoreColor(data.insights.conversion)}>
                  {getScoreLabel(data.insights.conversion)}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-2xl font-bold ${getScoreColor(data.insights.conversion)}`}>
                    {animatedValues.conversion}%
                  </span>
                </div>
                <Progress value={animatedValues.conversion} className="h-2" />
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Recommendations */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Recommendations</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                <h4 className="font-medium text-primary mb-2">Improve SEO Score</h4>
                <p className="text-sm text-muted-foreground">
                  Focus on local keywords and optimize your Google Business profile with regular updates and photos.
                </p>
              </div>
              <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
                <h4 className="font-medium text-accent mb-2">Boost Engagement</h4>
                <p className="text-sm text-muted-foreground">
                  Encourage customer reviews and respond promptly to increase interaction rates.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessDashboard;