
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, QrCode, Scan, Zap, Trophy, CheckCircle, Navigation, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";

const StartShopping = () => {
  const [progress, setProgress] = useState(60);
  const [scannedItems, setScannedItems] = useState([
    { id: 1, name: "Milk", scanned: true, shelf: "A1", aisle: "Dairy" },
    { id: 2, name: "Bread", scanned: true, shelf: "B3", aisle: "Bakery" },
    { id: 3, name: "Apples", scanned: false, shelf: "C2", aisle: "Produce" },
    { id: 4, name: "Yogurt", scanned: false, shelf: "A2", aisle: "Dairy" },
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

  // Professional store layout with realistic sections
  const storeLayout = [
    { id: 'entrance', name: 'Entrance', type: 'entrance', x: 0, y: 3, width: 1, height: 2 },
    { id: 'A1', name: 'A1', type: 'shelf', x: 1, y: 0, width: 2, height: 1, section: 'Dairy' },
    { id: 'A2', name: 'A2', type: 'shelf', x: 1, y: 2, width: 2, height: 1, section: 'Dairy' },
    { id: 'B1', name: 'B1', type: 'shelf', x: 4, y: 0, width: 2, height: 1, section: 'Beverages' },
    { id: 'B2', name: 'B2', type: 'shelf', x: 4, y: 2, width: 2, height: 1, section: 'Snacks' },
    { id: 'B3', name: 'B3', type: 'shelf', x: 4, y: 4, width: 2, height: 1, section: 'Bakery' },
    { id: 'C1', name: 'C1', type: 'shelf', x: 7, y: 0, width: 2, height: 1, section: 'Frozen' },
    { id: 'C2', name: 'C2', type: 'shelf', x: 7, y: 2, width: 2, height: 1, section: 'Produce' },
    { id: 'C3', name: 'C3', type: 'shelf', x: 7, y: 4, width: 2, height: 1, section: 'Meat' },
    { id: 'checkout', name: 'Checkout', type: 'checkout', x: 10, y: 2, width: 1, height: 2 },
    { id: 'path1', name: '', type: 'path', x: 3, y: 1, width: 1, height: 3 },
    { id: 'path2', name: '', type: 'path', x: 6, y: 1, width: 1, height: 3 },
    { id: 'path3', name: '', type: 'path', x: 1, y: 1, width: 8, height: 1 },
    { id: 'path4', name: '', type: 'path', x: 1, y: 3, width: 8, height: 1 },
  ];

  const getItemsByShelf = (shelfId: string) => {
    return scannedItems.filter(item => item.shelf === shelfId);
  };

  const getShelfStyle = (shelf: any) => {
    const hasItems = getItemsByShelf(shelf.id);
    const hasUnscannedItems = hasItems.some(item => !item.scanned);
    const allItemsScanned = hasItems.length > 0 && hasItems.every(item => item.scanned);
    
    if (shelf.type === 'entrance') {
      return 'bg-gradient-to-r from-green-400 to-green-500 border-green-600 text-white shadow-lg';
    }
    if (shelf.type === 'checkout') {
      return 'bg-gradient-to-r from-purple-500 to-purple-600 border-purple-700 text-white shadow-lg';
    }
    if (shelf.type === 'path') {
      return 'bg-gray-100 border-gray-200';
    }
    if (hasUnscannedItems) {
      return 'bg-gradient-to-br from-yellow-100 to-amber-100 border-amber-400 shadow-lg animate-pulse border-2';
    }
    if (allItemsScanned) {
      return 'bg-gradient-to-br from-green-100 to-emerald-100 border-green-400 shadow-md border-2';
    }
    return 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-300 shadow-sm';
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
              Smart Store Navigation
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
              <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
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

              {/* Professional Store Map */}
              <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
                  <CardTitle className="flex items-center text-white">
                    <Store className="w-6 h-6 mr-3 text-blue-400" />
                    Interactive Store Map
                    <Badge className="ml-auto bg-blue-500/20 text-blue-100 border-blue-400">
                      Live Navigation
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl p-8 border-2 border-gray-200 shadow-inner">
                    {/* Store Layout Grid */}
                    <div 
                      className="grid gap-2 mx-auto max-w-4xl"
                      style={{ 
                        gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
                        gridTemplateRows: 'repeat(6, minmax(0, 1fr))',
                        aspectRatio: '2/1'
                      }}
                    >
                      {storeLayout.map((area, index) => {
                        const hasItems = getItemsByShelf(area.id);
                        const hasUnscannedItems = hasItems.some(item => !item.scanned);
                        
                        return (
                          <motion.div
                            key={area.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            className={`
                              relative rounded-xl border-2 transition-all duration-300 hover:scale-105
                              ${getShelfStyle(area)}
                            `}
                            style={{
                              gridColumn: `${area.x + 1} / span ${area.width}`,
                              gridRow: `${area.y + 1} / span ${area.height}`,
                              minHeight: '60px'
                            }}
                          >
                            {area.type !== 'path' && (
                              <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center">
                                <div className="font-bold text-sm mb-1">{area.name}</div>
                                {area.section && (
                                  <div className="text-xs opacity-80 font-medium">{area.section}</div>
                                )}
                                {hasItems.length > 0 && (
                                  <div className="text-xs mt-1 space-y-1">
                                    {hasItems.map(item => (
                                      <div key={item.id} className="flex items-center justify-center">
                                        <span className={item.scanned ? 'line-through opacity-60' : 'font-medium'}>
                                          {item.name}
                                        </span>
                                        {item.scanned && <CheckCircle className="w-3 h-3 ml-1 text-green-600" />}
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            )}
                            
                            {/* Glowing indicator for items to collect */}
                            {hasUnscannedItems && (
                              <motion.div
                                animate={{ 
                                  scale: [1, 1.3, 1],
                                  opacity: [0.7, 1, 0.7]
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-full shadow-lg"
                              />
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                    
                    {/* User position indicator */}
                    <motion.div
                      animate={{ 
                        y: [0, -8, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute bottom-8 left-12 flex items-center space-x-2"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-xl border-2 border-white">
                        <Navigation className="w-4 h-4" />
                      </div>
                      <div className="bg-white px-3 py-1 rounded-full shadow-lg border border-gray-200">
                        <span className="text-sm font-medium text-gray-700">You are here</span>
                      </div>
                    </motion.div>

                    {/* Legend */}
                    <div className="mt-6 flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-gradient-to-br from-yellow-100 to-amber-100 border-2 border-amber-400 rounded"></div>
                        <span className="text-gray-600">Items to collect</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-gradient-to-br from-green-100 to-emerald-100 border-2 border-green-400 rounded"></div>
                        <span className="text-gray-600">Completed</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-gray-100 border-2 border-gray-200 rounded"></div>
                        <span className="text-gray-600">Walkway</span>
                      </div>
                    </div>
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
              <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <QrCode className="w-5 h-5 mr-2 text-purple-600" />
                    QR Scanner
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 text-center border border-purple-100">
                    <Scan className="w-16 h-16 mx-auto mb-4 text-purple-600" />
                    <p className="text-sm text-gray-600 mb-4">
                      Scan product QR codes or shelf QR codes
                    </p>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg">
                      <Scan className="w-4 h-4 mr-2" />
                      Open Camera
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Shopping List Items */}
              <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
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
                          flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-300
                          ${item.scanned 
                            ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-sm' 
                            : 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200 hover:border-yellow-300 shadow-md'
                          }
                        `}
                      >
                        <div className="flex-1">
                          <div className={`font-semibold ${item.scanned ? 'text-green-800 line-through' : 'text-gray-800'}`}>
                            {item.name}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            {item.aisle} • Shelf: {item.shelf}
                          </div>
                        </div>
                        
                        {item.scanned ? (
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => scanItem(item.id)}
                            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-md"
                          >
                            Scan
                          </Button>
                        )}
                      </motion.div>
                    ))}
                  </div>
                  
                  {completedItems === scannedItems.length && (
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-lg">
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
