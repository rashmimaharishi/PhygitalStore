
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Bell, Package, Tag, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      type: "delivery",
      title: "Order Delivered Successfully",
      message: "Your order #ORD-001 has been delivered to your address",
      time: "2 minutes ago",
      read: false,
      icon: Package
    },
    {
      id: 2,
      type: "price-drop",
      title: "Price Drop Alert",
      message: "Milk is now ₹25 off - Limited time offer!",
      time: "15 minutes ago",
      read: false,
      icon: Tag
    },
    {
      id: 3,
      type: "delivery-scheduled",
      title: "Monthly Delivery Reminder",
      message: "Your monthly grocery delivery is scheduled for tomorrow at 3 PM",
      time: "1 hour ago",
      read: true,
      icon: Clock
    },
    {
      id: 4,
      type: "near-expiry",
      title: "Near Expiry Deals",
      message: "Yogurt - 30% off - Expires in 2 days. Available at Store A",
      time: "2 hours ago",
      read: true,
      icon: Tag
    },
    {
      id: 5,
      type: "order-ready",
      title: "Order Ready for Pickup",
      message: "Your order #ORD-002 is ready for collection at Store B",
      time: "3 hours ago",
      read: true,
      icon: CheckCircle
    }
  ];

  const getNotificationColor = (type: string, read: boolean) => {
    if (read) return "bg-gray-50 border-gray-200";
    
    switch (type) {
      case "delivery":
        return "bg-green-50 border-green-200";
      case "price-drop":
        return "bg-red-50 border-red-200";
      case "delivery-scheduled":
        return "bg-blue-50 border-blue-200";
      case "near-expiry":
        return "bg-yellow-50 border-yellow-200";
      case "order-ready":
        return "bg-purple-50 border-purple-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case "delivery":
        return "text-green-600";
      case "price-drop":
        return "text-red-600";
      case "delivery-scheduled":
        return "text-blue-600";
      case "near-expiry":
        return "text-yellow-600";
      case "order-ready":
        return "text-purple-600";
      default:
        return "text-gray-600";
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

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
            
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
                  Notifications
                </h1>
                <p className="text-lg text-gray-600">
                  Stay updated with your orders, deals, and delivery alerts
                </p>
              </div>
              {unreadCount > 0 && (
                <Badge className="bg-red-500 text-white">
                  {unreadCount} new
                </Badge>
              )}
            </div>
          </motion.div>

          {/* Notification Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-4 mb-8"
          >
            <Button variant="outline" size="sm">
              Mark all as read
            </Button>
            <Button variant="outline" size="sm">
              Clear all
            </Button>
            <Button variant="outline" size="sm">
              Notification Settings
            </Button>
          </motion.div>

          {/* Notifications List */}
          <div className="space-y-4">
            {notifications.map((notification, index) => {
              const IconComponent = notification.icon;
              return (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                >
                  <Card className={`
                    shadow-lg border-2 hover:shadow-xl transition-all duration-300 cursor-pointer
                    ${getNotificationColor(notification.type, notification.read)}
                  `}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`
                          w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0
                          ${notification.read ? 'bg-gray-200' : 'bg-white shadow-md'}
                        `}>
                          <IconComponent className={`w-6 h-6 ${getIconColor(notification.type)}`} />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className={`font-semibold ${notification.read ? 'text-gray-800' : 'text-gray-900'}`}>
                              {notification.title}
                            </h3>
                            <div className="flex items-center gap-2">
                              {!notification.read && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              )}
                              <span className="text-sm text-gray-500 whitespace-nowrap">
                                {notification.time}
                              </span>
                            </div>
                          </div>
                          
                          <p className={`text-sm leading-relaxed ${notification.read ? 'text-gray-600' : 'text-gray-700'}`}>
                            {notification.message}
                          </p>
                          
                          {(notification.type === 'price-drop' || notification.type === 'near-expiry') && (
                            <div className="mt-4 flex gap-2">
                              <Button size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600">
                                View Deal
                              </Button>
                              <Button size="sm" variant="outline">
                                Add to List
                              </Button>
                            </div>
                          )}
                          
                          {notification.type === 'delivery-scheduled' && (
                            <div className="mt-4 flex gap-2">
                              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-green-600">
                                Confirm Availability
                              </Button>
                              <Button size="sm" variant="outline">
                                Reschedule
                              </Button>
                            </div>
                          )}
                          
                          {notification.type === 'order-ready' && (
                            <div className="mt-4 flex gap-2">
                              <Button size="sm" className="bg-gradient-to-r from-green-600 to-blue-600">
                                Get Directions
                              </Button>
                              <Button size="sm" variant="outline">
                                View Order
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Empty State */}
          {notifications.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center py-16"
            >
              <Bell className="w-16 h-16 mx-auto mb-6 text-gray-400" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No notifications yet</h3>
              <p className="text-gray-600 mb-6">We'll notify you about orders, deals, and updates</p>
              <Link to="/smart-list">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  Start Shopping
                </Button>
              </Link>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Notifications;
