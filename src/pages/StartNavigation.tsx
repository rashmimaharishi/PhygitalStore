
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Navigation, MapPin, Route, Zap, Target, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";

const StartNavigation = () => {
  const nearbyStores = [
    {
      id: 1,
      name: "PhygiMart Downtown",
      distance: "0.2 km",
      walkTime: "3 min",
      busyLevel: "Low",
      specialOffers: ["20% off on dairy", "Buy 2 Get 1 bread"],
      amenities: ["AI Assistant", "Express Checkout", "Home Delivery"]
    },
    {
      id: 2,
      name: "PhygiMart Mall Central",
      distance: "0.8 km",
      walkTime: "10 min",
      busyLevel: "Medium",
      specialOffers: ["Fresh produce 15% off", "Weekend deals"],
      amenities: ["Indoor Navigation", "QR Checkout", "Parking Available"]
    },
    {
      id: 3,
      name: "PhygiMart Express",
      distance: "1.2 km",
      walkTime: "15 min",
      busyLevel: "High",
      specialOffers: ["Express delivery free", "24/7 service"],
      amenities: ["Quick Pickup", "Drive-through", "24/7 Open"]
    }
  ];

  const getBusyColor = (level: string) => {
    switch (level) {
      case "Low":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "High":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
              Start Navigation
            </h1>
            <p className="text-lg text-gray-600">
              Find nearby PhygiShop stores and get optimized routes for your shopping list
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Navigation Controls */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-1 space-y-6"
            >
              {/* Current Location */}
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-red-600" />
                    Your Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Current Address</div>
                      <div className="font-medium">123 Main Street, City Center</div>
                      <div className="text-sm text-gray-500 mt-2">GPS Accuracy: High</div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600">
                      <Target className="w-4 h-4 mr-2" />
                      Update Location
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-yellow-600" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Route className="w-4 h-4 mr-2" />
                    Optimize Route for My List
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Clock className="w-4 h-4 mr-2" />
                    Find Shortest Queue
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Target className="w-4 h-4 mr-2" />
                    Locate Specific Item
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Store List */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-2 space-y-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">Nearby Stores</h2>
                <Badge className="bg-blue-100 text-blue-800">
                  3 stores found
                </Badge>
              </div>

              {nearbyStores.map((store, index) => (
                <motion.div
                  key={store.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                >
                  <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span className="flex items-center">
                          <Navigation className="w-5 h-5 mr-2 text-purple-600" />
                          {store.name}
                        </span>
                        <Badge className={getBusyColor(store.busyLevel)}>
                          {store.busyLevel} Traffic
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-sm text-gray-600">Distance</div>
                              <div className="font-semibold text-lg">{store.distance}</div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-600">Walk Time</div>
                              <div className="font-semibold text-lg">{store.walkTime}</div>
                            </div>
                          </div>

                          <div>
                            <div className="text-sm text-gray-600 mb-2">Special Offers</div>
                            <div className="flex flex-wrap gap-2">
                              {store.specialOffers.map((offer, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {offer}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <div className="text-sm text-gray-600 mb-2">Amenities</div>
                            <div className="flex flex-wrap gap-2">
                              {store.amenities.map((amenity, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {amenity}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                            <Navigation className="w-4 h-4 mr-2" />
                            Get Directions
                          </Button>
                          <Button variant="outline" className="w-full">
                            <MapPin className="w-4 h-4 mr-2" />
                            View Store Layout
                          </Button>
                          <Button variant="outline" className="w-full">
                            <Clock className="w-4 h-4 mr-2" />
                            Check Wait Times
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              {/* Map View Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-center"
              >
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-3">
                  <MapPin className="w-5 h-5 mr-2" />
                  View All Stores on Map
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StartNavigation;
