
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, QrCode, Scan, Zap, Trophy, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";

const StartShopping = () => {
  const [progress, setProgress] = useState(60);
  const [scannedItems, setScannedItems] = useState([
    { id: 1, name: "Milk", scanned: true, shelf: "A1" },
    { id: 2, name: "Bread", scanned: true, shelf: "B3" },
    { id: 3, name: "Apples", scanned: false, shelf: "C2" },
    { id: 4, name: "Yogurt", scanned: false, shelf: "A2" },
  ]);

  const scanItem = (id: number) => {
    setScannedItems(items =>
      items.map(item =>
        item.id === id ? { ...item, scanned: true } : item
      )
    );
    const newProgress = ((scannedItems.filter(item => item.scanned).length + 1) / scannedItems.length) * 100;
    setProgress(newProgress);
  };

  const completedItems = scannedItems.filter(item => item.scanned).length;

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
              In-Store Navigation Starts Here
            </h1>
            <p className="text-lg text-gray-600">
              Navigate your store like a game and collect your items with gamified experience
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Progress & Map Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Progress Card */}
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      <Trophy className="w-5 h-5 mr-2 text-yellow-600" />
                      Shopping Progress
                    </span>
                    <Badge className="bg-gradient-to-r from-purple-600 to-blue-600">
                      {completedItems}/{scannedItems.length} items
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Progress value={progress} className="h-3" />
                    <div className="text-center">
                      <span className="text-lg font-semibold text-gray-800">
                        {Math.round(progress)}% Complete
                      </span>
                      {progress === 100 && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="mt-2 text-green-600 font-medium"
                        >
                          🎉 Congratulations! All items collected!
                        </motion.div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Interactive Store Map */}
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-red-600" />
                    Interactive Store Map
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl p-6 min-h-64 relative">
                    {/* Mock store layout */}
                    <div className="grid grid-cols-4 gap-4 h-full">
                      {['A1', 'A2', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3'].map((shelf, index) => {
                        const hasItem = scannedItems.find(item => item.shelf === shelf);
                        const isCompleted = hasItem?.scanned;
                        
                        return (
                          <motion.div
                            key={shelf}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className={`
                              relative rounded-lg p-3 border-2 transition-all duration-300
                              ${hasItem && !isCompleted 
                                ? 'bg-yellow-200 border-yellow-400 animate-pulse shadow-lg' 
                                : isCompleted 
                                ? 'bg-green-200 border-green-400' 
                                : 'bg-gray-100 border-gray-300'
                              }
                            `}
                          >
                            <div className="text-center">
                              <div className="font-semibold text-sm">{shelf}</div>
                              {hasItem && (
                                <div className="text-xs mt-1 text-gray-700">
                                  {hasItem.name}
                                  {isCompleted && <CheckCircle className="w-3 h-3 inline ml-1 text-green-600" />}
                                </div>
                              )}
                            </div>
                            
                            {hasItem && !isCompleted && (
                              <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                                className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                              />
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                    
                    {/* User position indicator */}
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute bottom-4 left-4 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg"
                    >
                      You
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Scanner & Items Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              {/* QR Scanner */}
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <QrCode className="w-5 h-5 mr-2 text-purple-600" />
                    QR Scanner
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl p-6 text-center">
                    <Scan className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                    <p className="text-sm text-gray-600 mb-4">
                      Scan product QR codes or shelf QR codes
                    </p>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600">
                      <Scan className="w-4 h-4 mr-2" />
                      Open Camera
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Shopping List Items */}
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-yellow-600" />
                    Your Items
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {scannedItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={`
                          flex items-center justify-between p-3 rounded-lg border transition-all duration-300
                          ${item.scanned 
                            ? 'bg-green-50 border-green-200' 
                            : 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100'
                          }
                        `}
                      >
                        <div className="flex-1">
                          <div className={`font-medium ${item.scanned ? 'text-green-800 line-through' : 'text-gray-800'}`}>
                            {item.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            Shelf: {item.shelf}
                          </div>
                        </div>
                        
                        {item.scanned ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => scanItem(item.id)}
                            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                          >
                            Scan
                          </Button>
                        )}
                      </motion.div>
                    ))}
                  </div>
                  
                  {completedItems === scannedItems.length && (
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white">
                        Proceed to Checkout
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StartShopping;
