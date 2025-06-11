
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Construction, Bell, Mail, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const ComingSoon = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNotifyMe = () => {
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    // Simulate subscription
    setIsSubscribed(true);
    toast.success('Thanks! We\'ll notify you when this tool is ready.');
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Construction Icon */}
          <div className="mb-8 animate-fade-in">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center mb-6">
              <Construction className="w-12 h-12 text-white" />
            </div>
            
            <div className="text-6xl mb-4">🚧</div>
          </div>

          {/* Main Content */}
          <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              This Tool is
              <span className="block bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                Coming Soon!
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              We're working hard to bring you this amazing tool. It will be launching soon with 
              powerful features designed to make your life easier.
            </p>
          </div>

          {/* Notify Me Section */}
          {!isSubscribed ? (
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 mb-8 animate-fade-in" style={{ animationDelay: '400ms' }}>
              <div className="flex items-center justify-center mb-4">
                <Bell className="w-6 h-6 text-orange-500 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Get Notified</h3>
              </div>
              
              <p className="text-gray-600 mb-6">
                Be the first to know when this tool becomes available!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <div className="flex-1 relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 transition-colors"
                    onKeyPress={(e) => e.key === 'Enter' && handleNotifyMe()}
                  />
                </div>
                <Button 
                  onClick={handleNotifyMe}
                  className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                >
                  Notify Me
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 mb-8 animate-fade-in">
              <div className="flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-500 mr-3" />
                <h3 className="text-lg font-semibold text-green-800">You're All Set!</h3>
              </div>
              <p className="text-green-700">
                We'll send you an email as soon as this tool is ready to use.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '600ms' }}>
            <Link to="/">
              <Button variant="outline" className="flex items-center space-x-2 px-6 py-3 rounded-lg border-2 hover:bg-gray-50 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Home</span>
              </Button>
            </Link>
            
            <Link to="/">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300">
                Explore Other Tools
              </Button>
            </Link>
          </div>

          {/* Timeline Hint */}
          <div className="mt-12 animate-fade-in" style={{ animationDelay: '800ms' }}>
            <p className="text-sm text-gray-500">
              💡 <strong>Pro Tip:</strong> In the meantime, check out our Health Tools and Business Tools - they're fully functional!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
