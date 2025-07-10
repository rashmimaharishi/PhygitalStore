
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Scan, QrCode, X, Plus, Minus, ShoppingCart, Search, MapPin, Factory, Package, Truck, Store, Bike } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  shelf: string;
}

interface JourneyStep {
  id: string;
  title: string;
  description: string;
  icon: any;
  timestamp: string;
  location: string;
  status: 'completed' | 'current' | 'pending';
}

const ProductScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedProduct, setScannedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showTracker, setShowTracker] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Mock product data
  const mockProduct: Product = {
    id: "prod_001",
    name: "Organic Almonds Premium",
    price: 450,
    image: "/placeholder.svg",
    description: "Premium quality organic almonds, rich in protein and healthy fats",
    category: "Dry Fruits",
    shelf: "B2"
  };

  // Mock journey data
  const journeySteps: JourneyStep[] = [
    {
      id: "1",
      title: "Produced at ABC Organic Farm",
      description: "Harvested from certified organic almond trees in California",
      icon: Factory,
      timestamp: "15 days ago",
      location: "California, USA",
      status: 'completed'
    },
    {
      id: "2",
      title: "Quality Checked & Packaged",
      description: "Cleaned, sorted and packaged under strict quality standards",
      icon: Package,
      timestamp: "12 days ago", 
      location: "Processing Unit, California",
      status: 'completed'
    },
    {
      id: "3",
      title: "Dispatched to Warehouse",
      description: "Shipped via temperature-controlled logistics",
      icon: Truck,
      timestamp: "8 days ago",
      location: "Mumbai Distribution Center",
      status: 'completed'
    },
    {
      id: "4",
      title: "Available in Store",
      description: "Stocked on shelf B2, ready for purchase",
      icon: Store,
      timestamp: "2 days ago",
      location: "Phoenix Mall, Bangalore",
      status: 'completed'
    },
    {
      id: "5",
      title: "Ready for Home Delivery",
      description: "Can be delivered to your doorstep within 2 hours",
      icon: Bike,
      timestamp: "Available now",
      location: "Your Location",
      status: 'current'
    }
  ];

  const handleScan = () => {
    setIsScanning(true);
    // Simulate scanning delay
    setTimeout(() => {
      setIsScanning(false);
      setScannedProduct(mockProduct);
    }, 2000);
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    // Simulate adding to cart
    setTimeout(() => {
      setIsAdding(false);
      setScannedProduct(null);
      setQuantity(1);
    }, 1000);
  };

  const adjustQuantity = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <AnimatePresence mode="wait">
        {!isScanning && !scannedProduct && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center"
          >
            <Button
              onClick={handleScan}
              size="lg"
              className="w-full h-16 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl"
            >
              <Scan className="w-6 h-6 mr-3" />
              Scan Product
            </Button>
          </motion.div>
        )}

        {isScanning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-8"
          >
            <div className="relative w-64 h-64 mx-auto mb-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border-2 border-dashed border-blue-300 flex items-center justify-center">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center"
              >
                <QrCode className="w-8 h-8 text-white" />
              </motion.div>
              
              {/* Scanning lines animation */}
              <motion.div
                animate={{ y: [-50, 50, -50] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent"
              />
            </div>
            <p className="text-lg font-medium text-gray-700">Scanning product...</p>
            <p className="text-sm text-gray-500 mt-2">Point camera at barcode or QR code</p>
          </motion.div>
        )}

        {scannedProduct && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm overflow-hidden">
              <CardHeader className="relative pb-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setScannedProduct(null)}
                  className="absolute top-2 right-2 h-8 w-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
                <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center mb-4">
                  <Package className="w-16 h-16 text-gray-400" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-800">{scannedProduct.name}</CardTitle>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-600">₹{scannedProduct.price}</span>
                  <Badge className="bg-blue-100 text-blue-800">{scannedProduct.category}</Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">{scannedProduct.description}</p>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <span className="text-sm font-medium text-gray-700">Shelf Location:</span>
                  <div className="flex items-center text-sm font-semibold text-blue-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    {scannedProduct.shelf}
                  </div>
                </div>

                {/* Track Origin Button */}
                <Button
                  variant="outline"
                  onClick={() => setShowTracker(true)}
                  className="w-full border-2 border-amber-300 text-amber-700 hover:bg-amber-50"
                >
                  <Search className="w-4 h-4 mr-2" />
                  🔍 Track Origin
                </Button>

                {/* Quantity Controls */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <span className="font-medium text-gray-700">Quantity:</span>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => adjustQuantity(-1)}
                      disabled={quantity <= 1}
                      className="h-8 w-8 p-0"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="text-lg font-semibold w-8 text-center">{quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => adjustQuantity(1)}
                      className="h-8 w-8 p-0"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <Button
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className="w-full h-12 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-lg"
                >
                  {isAdding ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Add to Cart (₹{scannedProduct.price * quantity})
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Product Journey Tracker Modal */}
      <AnimatePresence>
        {showTracker && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowTracker(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-800">Product Journey</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowTracker(false)}
                    className="h-8 w-8 p-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-sm text-gray-600 mt-1">Track the complete journey of your product</p>
              </div>

              <div className="p-6 overflow-y-auto max-h-[60vh]">
                <div className="space-y-6">
                  {journeySteps.map((step, index) => (
                    <div key={step.id} className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className={`
                          w-12 h-12 rounded-full flex items-center justify-center border-2
                          ${step.status === 'completed' 
                            ? 'bg-green-100 border-green-300 text-green-600' 
                            : step.status === 'current'
                            ? 'bg-blue-100 border-blue-300 text-blue-600'
                            : 'bg-gray-100 border-gray-300 text-gray-400'
                          }
                        `}>
                          <step.icon className="w-6 h-6" />
                        </div>
                        {index < journeySteps.length - 1 && (
                          <div className="w-0.5 h-8 bg-gray-200 mx-auto mt-2" />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-800 text-sm">{step.title}</h4>
                        <p className="text-xs text-gray-600 mt-1">{step.description}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-500">{step.location}</span>
                          <span className="text-xs text-gray-500">{step.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductScanner;
