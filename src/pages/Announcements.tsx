
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Megaphone, Calendar, MapPin, Gift, Zap, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";

const Announcements = () => {
  const announcements = [
    {
      id: 1,
      type: "new-store",
      title: "New PhygiShop Store Opening!",
      description: "We're excited to announce the opening of our newest location in Central Mall. Experience next-generation phygital shopping with advanced AI assistance and seamless checkout.",
      date: "2024-01-20",
      priority: "high",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400",
      action: "Visit Store",
      location: "Central Mall, Downtown"
    },
    {
      id: 2,
      type: "feature-update",
      title: "AI Shopping Assistant 2.0 Released",
      description: "Our new AI assistant now supports voice commands in 5 languages, provides real-time product comparisons, and offers personalized nutrition advice. Update your app to experience the future of shopping.",
      date: "2024-01-18",
      priority: "medium",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400",
      action: "Learn More"
    },
    {
      id: 3,
      type: "promotion",
      title: "Grand Opening Week - Special Offers",
      description: "Celebrate with us! Get up to 50% off on selected items, free home delivery for orders above ₹500, and exclusive PhygiShop merchandise for the first 100 customers.",
      date: "2024-01-15",
      priority: "high",
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400",
      action: "Shop Now",
      validTill: "2024-01-25"
    },
    {
      id: 4,
      type: "maintenance",
      title: "Scheduled Maintenance Notice",
      description: "We'll be performing system upgrades on January 22nd from 2:00 AM to 4:00 AM. During this time, some features may be temporarily unavailable. Thank you for your patience.",
      date: "2024-01-14",
      priority: "low",
      scheduledDate: "2024-01-22"
    },
    {
      id: 5,
      type: "achievement",
      title: "1 Million Happy Customers Milestone!",
      description: "We've reached an incredible milestone of serving 1 million customers! As a thank you, enjoy special rewards, exclusive deals, and enhanced loyalty benefits throughout the month.",
      date: "2024-01-12",
      priority: "medium",
      image: "https://images.unsplash.com/photo-1556155092-8707de31f9c4?w=400",
      action: "Claim Rewards"
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "new-store":
        return <MapPin className="w-5 h-5" />;
      case "feature-update":
        return <Zap className="w-5 h-5" />;
      case "promotion":
        return <Gift className="w-5 h-5" />;
      case "maintenance":
        return <Calendar className="w-5 h-5" />;
      case "achievement":
        return <Star className="w-5 h-5" />;
      default:
        return <Megaphone className="w-5 h-5" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "new-store":
        return "text-purple-600";
      case "feature-update":
        return "text-blue-600";
      case "promotion":
        return "text-green-600";
      case "maintenance":
        return "text-orange-600";
      case "achievement":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link
              to="/"
              className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-6 group"
            >
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
              Back to Home
            </Link>
            
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Announcements
            </h1>
            <p className="text-lg text-gray-600">
              Stay updated with the latest news, features, and important updates from PhygiShop
            </p>
          </motion.div>

          {/* Announcements List */}
          <div className="space-y-8">
            {announcements.map((announcement, index) => (
              <motion.div
                key={announcement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              >
                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="flex flex-col lg:flex-row">
                    {/* Image Section */}
                    {announcement.image && (
                      <div className="lg:w-1/3">
                        <div
                          className="h-48 lg:h-full bg-cover bg-center"
                          style={{ backgroundImage: `url(${announcement.image})` }}
                        />
                      </div>
                    )}
                    
                    {/* Content Section */}
                    <div className={`flex-1 ${announcement.image ? '' : 'w-full'}`}>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between flex-wrap gap-2">
                          <span className="flex items-center">
                            <span className={getTypeColor(announcement.type)}>
                              {getTypeIcon(announcement.type)}
                            </span>
                            <span className="ml-2 text-lg">{announcement.title}</span>
                          </span>
                          <div className="flex items-center gap-2">
                            <Badge className={getPriorityColor(announcement.priority)}>
                              {announcement.priority} priority
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {new Date(announcement.date).toLocaleDateString()}
                            </Badge>
                          </div>
                        </CardTitle>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        <p className="text-gray-700 leading-relaxed">
                          {announcement.description}
                        </p>
                        
                        {/* Additional Info */}
                        <div className="space-y-2">
                          {announcement.location && (
                            <div className="flex items-center text-sm text-gray-600">
                              <MapPin className="w-4 h-4 mr-2" />
                              Location: {announcement.location}
                            </div>
                          )}
                          
                          {announcement.validTill && (
                            <div className="flex items-center text-sm text-orange-600">
                              <Calendar className="w-4 h-4 mr-2" />
                              Valid till: {new Date(announcement.validTill).toLocaleDateString()}
                            </div>
                          )}
                          
                          {announcement.scheduledDate && (
                            <div className="flex items-center text-sm text-blue-600">
                              <Calendar className="w-4 h-4 mr-2" />
                              Scheduled: {new Date(announcement.scheduledDate).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                        
                        {/* Action Button */}
                        {announcement.action && (
                          <div className="pt-4">
                            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                              {announcement.action}
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Subscribe Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12"
          >
            <Card className="shadow-lg border-0 bg-gradient-to-r from-purple-100 to-blue-100">
              <CardContent className="p-8 text-center">
                <Megaphone className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Never Miss an Update
                </h3>
                <p className="text-gray-600 mb-6">
                  Subscribe to our notifications to stay informed about new features, deals, and important announcements
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    Enable Notifications
                  </Button>
                  <Button variant="outline">
                    Manage Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Announcements;
