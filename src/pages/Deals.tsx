
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Tag, Clock, TrendingDown, Percent, Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";

const Deals = () => {
  const deals = [
    {
      id: 1,
      title: "Near Expiry Specials",
      items: [
        { name: "Fresh Milk", originalPrice: "₹60", discountPrice: "₹35", discount: "42%", expiryDays: 2 },
        { name: "Yogurt Pack", originalPrice: "₹80", discountPrice: "₹56", discount: "30%", expiryDays: 1 },
        { name: "Bread Loaf", originalPrice: "₹40", discountPrice: "₹28", discount: "30%", expiryDays: 2 }
      ],
      type: "near-expiry",
      urgency: "high"
    },
    {
      id: 2,
      title: "Flash Sale - 2 Hours Left",
      items: [
        { name: "Premium Rice 5kg", originalPrice: "₹450", discountPrice: "₹315", discount: "30%" },
        { name: "Cooking Oil 1L", originalPrice: "₹180", discountPrice: "₹144", discount: "20%" },
        { name: "Pulses Combo", originalPrice: "₹300", discountPrice: "₹210", discount: "30%" }
      ],
      type: "flash-sale",
      urgency: "high",
      timeLeft: "2:15:30"
    },
    {
      id: 3,
      title: "Weekend Offers",
      items: [
        { name: "Fresh Fruits Bundle", originalPrice: "₹200", discountPrice: "₹150", discount: "25%" },
        { name: "Vegetables Pack", originalPrice: "₹120", discountPrice: "₹96", discount: "20%" },
        { name: "Organic Honey", originalPrice: "₹250", discountPrice: "₹200", discount: "20%" }
      ],
      type: "weekend",
      urgency: "medium"
    },
    {
      id: 4,
      title: "Buy 2 Get 1 Free",
      items: [
        { name: "Shampoo Bottles", originalPrice: "₹150", discountPrice: "₹100", discount: "33%" },
        { name: "Soap Bars", originalPrice: "₹90", discountPrice: "₹60", discount: "33%" },
        { name: "Toothpaste", originalPrice: "₹120", discountPrice: "₹80", discount: "33%" }
      ],
      type: "bogo",
      urgency: "low"
    }
  ];

  const paymentOffers = [
    {
      title: "50%-50% Payment Split",
      description: "Pay 50% now, 50% on delivery",
      cashback: "Extra 5% cashback",
      validOn: "Orders above ₹500"
    },
    {
      title: "UPI Instant Discount",
      description: "Get instant 10% off with UPI payments",
      cashback: "Up to ₹100 cashback",
      validOn: "All orders"
    },
    {
      title: "Credit Card EMI",
      description: "Convert to 0% EMI for 3-6 months",
      cashback: "No processing fee",
      validOn: "Orders above ₹1000"
    }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "near-expiry":
        return <Clock className="w-5 h-5" />;
      case "flash-sale":
        return <TrendingDown className="w-5 h-5" />;
      case "weekend":
        return <Star className="w-5 h-5" />;
      case "bogo":
        return <Percent className="w-5 h-5" />;
      default:
        return <Tag className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              Deals & Discounts
            </h1>
            <p className="text-lg text-gray-600">
              Discover amazing deals, flash sales, and exclusive payment offers
            </p>
          </motion.div>

          {/* Payment Offers Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Offers</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {paymentOffers.map((offer, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                >
                  <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50 to-blue-50 hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center text-lg">
                        <Percent className="w-5 h-5 mr-2 text-purple-600" />
                        {offer.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-3">{offer.description}</p>
                      <div className="space-y-2">
                        <Badge className="bg-green-100 text-green-800">
                          {offer.cashback}
                        </Badge>
                        <p className="text-sm text-gray-600">Valid on: {offer.validOn}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Deals Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {deals.map((deal, index) => (
              <motion.div
                key={deal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              >
                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center">
                        {getTypeIcon(deal.type)}
                        <span className="ml-2">{deal.title}</span>
                      </span>
                      <div className="flex items-center gap-2">
                        <Badge className={getUrgencyColor(deal.urgency)}>
                          {deal.urgency} priority
                        </Badge>
                        {deal.timeLeft && (
                          <Badge className="bg-red-500 text-white animate-pulse">
                            {deal.timeLeft}
                          </Badge>
                        )}
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {deal.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors duration-200"
                        >
                          <div className="flex-1">
                            <div className="font-medium text-gray-800">{item.name}</div>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-sm text-gray-500 line-through">
                                {item.originalPrice}
                              </span>
                              <span className="text-lg font-bold text-green-600">
                                {item.discountPrice}
                              </span>
                              <Badge className="bg-red-100 text-red-800 text-xs">
                                {item.discount} OFF
                              </Badge>
                            </div>
                            {item.expiryDays && (
                              <div className="text-xs text-orange-600 mt-1">
                                Expires in {item.expiryDays} day{item.expiryDays > 1 ? 's' : ''}
                              </div>
                            )}
                          </div>
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 ml-4"
                          >
                            <ShoppingCart className="w-4 h-4 mr-1" />
                            Add
                          </Button>
                        </div>
                      ))}
                      
                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex gap-2">
                          <Button className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                            Add All to Cart
                          </Button>
                          <Button variant="outline" className="flex-1">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-12"
          >
            <Card className="shadow-lg border-0 bg-gradient-to-r from-purple-100 to-blue-100">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Don't Miss Out on These Amazing Deals!
                </h3>
                <p className="text-gray-600 mb-6">
                  Create your smart shopping list and start saving on your favorite products
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/smart-list">
                    <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-3">
                      Create Smart List
                    </Button>
                  </Link>
                  <Link to="/start-shopping">
                    <Button variant="outline" className="px-8 py-3">
                      Start Shopping Now
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Deals;
