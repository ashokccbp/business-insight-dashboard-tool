import React, { useState } from 'react';
import BusinessForm from '@/components/BusinessForm';
import BusinessDashboard from '@/components/BusinessDashboard';
import Header from '@/components/Header';
import { BusinessData } from '@/types/business';

const Index = () => {
  const [businessData, setBusinessData] = useState<BusinessData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleBusinessSubmit = async (name: string, location: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call to backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockData: BusinessData = {
        name,
        location,
        rating: +(Math.random() * (5 - 3.5) + 3.5).toFixed(1),
        reviews: Math.floor(Math.random() * (500 - 50) + 50),
        headline: generateSEOHeadline(name, location),
        insights: {
          seoScore: Math.floor(Math.random() * (100 - 65) + 65),
          visibility: Math.floor(Math.random() * (100 - 40) + 40),
          engagement: Math.floor(Math.random() * (100 - 55) + 55),
          conversion: Math.floor(Math.random() * (100 - 30) + 30)
        }
      };
      
      setBusinessData(mockData);
    } catch (error) {
      console.error('Error fetching business data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerateHeadline = async () => {
    if (!businessData) return;
    
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const newHeadline = generateSEOHeadline(businessData.name, businessData.location);
      setBusinessData({
        ...businessData,
        headline: newHeadline
      });
    } catch (error) {
      console.error('Error regenerating headline:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateSEOHeadline = (name: string, location: string): string => {
    const templates = [
      `Why ${name} is ${location}'s Best-Kept Secret in 2025`,
      `${name}: Revolutionizing ${location}'s Business Landscape`,
      `How ${name} Became ${location}'s Most Trusted Choice`,
      `${name} - Leading the Way in ${location}'s Market`,
      `Discover Why ${location} Loves ${name}`,
      `${name}: Your Premier Destination in ${location}`,
      `The ${name} Difference: Transforming ${location}`,
      `${name} - Where ${location} Finds Excellence`,
      `Unlocking Success: ${name}'s Impact on ${location}`,
      `${name}: Building Tomorrow's ${location} Today`
    ];
    
    return templates[Math.floor(Math.random() * templates.length)];
  };

  return (
    <div className="dashboard-container">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {!businessData ? (
          <div className="animate-fade-in">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
                Local Business Dashboard
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Get instant insights into your business performance with AI-powered SEO headlines 
                and comprehensive analytics
              </p>
            </div>
            
            <BusinessForm onSubmit={handleBusinessSubmit} isLoading={isLoading} />
          </div>
        ) : (
          <div className="animate-slide-up">
            <BusinessDashboard 
              data={businessData} 
              onRegenerateHeadline={handleRegenerateHeadline}
              isLoading={isLoading}
            />
          </div>
        )}
        
        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <div className="business-card p-6 text-center animate-fade-in">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl mx-auto mb-4 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">AI-Powered Headlines</h3>
            <p className="text-muted-foreground">Generate compelling SEO headlines that drive traffic and engagement</p>
          </div>
          
          <div className="business-card p-6 text-center animate-fade-in">
            <div className="w-12 h-12 bg-gradient-business rounded-xl mx-auto mb-4 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Real-time Analytics</h3>
            <p className="text-muted-foreground">Track your business performance with comprehensive metrics and insights</p>
          </div>
          
          <div className="business-card p-6 text-center animate-fade-in">
            <div className="w-12 h-12 bg-gradient-hero rounded-xl mx-auto mb-4 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M8 6v10a2 2 0 002 2h4a2 2 0 002-2V6" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Local SEO Focus</h3>
            <p className="text-muted-foreground">Optimize your local presence and connect with customers in your area</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;