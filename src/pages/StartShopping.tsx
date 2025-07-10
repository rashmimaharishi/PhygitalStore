
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Trophy, CheckCircle, Navigation, Store, Zap, Cpu, Wifi, Scan } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import ProductScanner from "@/components/ProductScanner";

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

  // Enhanced futuristic store layout
  const storeLayout = [
    { id: 'entrance', name: 'Smart Entry', type: 'entrance', x: 0, y: 3, width: 1, height: 2 },
    { id: 'A1', name: 'A1', type: 'shelf', x: 2, y: 0, width: 2, height: 1, section: 'Dairy', temp: '4°C' },
    { id: 'A2', name: 'A2', type: 'shelf', x: 2, y: 2, width: 2, height: 1, section: 'Dairy', temp: '4°C' },
    { id: 'B1', name: 'B1', type: 'shelf', x: 5, y: 0, width: 2, height: 1, section: 'Beverages', temp: '15°C' },
    { id: 'B2', name: 'B2', type: 'shelf', x: 5, y: 2, width: 2, height: 1, section: 'Snacks', temp: '22°C' },
    { id: 'B3', name: 'B3', type: 'shelf', x: 5, y: 4, width: 2, height: 1, section: 'Bakery', temp: '18°C' },
    { id: 'C1', name: 'C1', type: 'shelf', x: 8, y: 0, width: 2, height: 1, section: 'Frozen', temp: '-18°C' },
    { id: 'C2', name: 'C2', type: 'shelf', x: 8, y: 2, width: 2, height: 1, section: 'Produce', temp: '8°C' },
    { id: 'C3', name: 'C3', type: 'shelf', x: 8, y: 4, width: 2, height: 1, section: 'Meat', temp: '2°C' },
    { id: 'checkout', name: 'Smart Checkout', type: 'checkout', x: 11, y: 2, width: 1, height: 2 },
    { id: 'path1', name: '', type: 'path', x: 1, y: 1, width: 1, height: 3 },
    { id: 'path2', name: '', type: 'path', x: 4, y: 1, width: 1, height: 3 },
    { id: 'path3', name: '', type: 'path', x: 7, y: 1, width: 1, height: 3 },
    { id: 'path4', name: '', type: 'path', x: 2, y: 1, width: 8, height: 1 },
    { id: 'path5', name: '', type: 'path', x: 2, y: 3, width: 8, height: 1 },
    { id: 'kiosk', name: 'Info Kiosk', type: 'kiosk', x: 0, y: 0, width: 1, height: 1 },
  ];

  const getItemsByShelf = (shelfId: string) => {
    return scannedItems.filter(item => item.shelf === shelfId);
  };

  const getShelfStyle = (area: any) => {
    const hasItems = getItemsByShelf(area.id);
    const hasUnscannedItems = hasItems.some(item => !item.scanned);
    const allItemsScanned = hasItems.length > 0 && hasItems.every(item => item.scanned);
    
    if (area.type === 'entrance') {
      return 'bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 border-2 border-emerald-300 text-white shadow-2xl';
    }
    if (area.type === 'checkout') {
      return 'bg-gradient-to-br from-purple-500 via-indigo-600 to-blue-700 border-2 border-purple-400 text-white shadow-2xl';
    }
    if (area.type === 'kiosk') {
      return 'bg-gradient-to-br from-orange-400 via-red-500 to-pink-600 border-2 border-orange-300 text-white shadow-xl';
    }
    if (area.type === 'path') {
      return 'bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-300 relative overflow-hidden';
    }
    if (hasUnscannedItems) {
      return 'bg-gradient-to-br from-amber-200 via-yellow-300 to-orange-400 border-2 border-amber-400 shadow-2xl animate-pulse border-dashed';
    }
    if (allItemsScanned) {
      return 'bg-gradient-to-br from-green-200 via-emerald-300 to-teal-400 border-2 border-green-400 shadow-xl';
    }
    return 'bg-gradient-to-br from-slate-200 via-gray-300 to-slate-400 border border-gray-400 shadow-lg';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white">
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
              className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-6 group"
            >
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
              Back to Home
            </Link>
            
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-4">
              AI-Powered Store Navigation
            </h1>
            <p className="text-lg text-gray-300">
              Experience the future of shopping with gamified navigation and smart assistance
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
              <Card className="shadow-2xl border border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-white">
                    <span className="flex items-center">
                      <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                      Mission Progress
                    </span>
                    <Badge className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
                      {completedItems}/{scannedItems.length} items
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Progress value={progress} className="h-3 bg-slate-700" />
                    <div className="text-center">
                      <span className="text-lg font-semibold text-cyan-400">
                        {Math.round(progress)}% Complete
                      </span>
                      {progress === 100 && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="mt-2 text-green-400 font-medium"
                        >
                          🎉 Mission Accomplished! All items collected!
                        </motion.div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Futuristic Store Map */}
              <Card className="shadow-2xl border border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900 backdrop-blur-sm overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 text-white border-b border-slate-600">
                  <CardTitle className="flex items-center text-white">
                    <Store className="w-6 h-6 mr-3 text-cyan-400" />
                    Quantum Store Navigator
                    <div className="ml-auto flex items-center space-x-2">
                      <Badge className="bg-green-500/20 text-green-400 border-green-400 animate-pulse">
                        <Wifi className="w-3 h-3 mr-1" />
                        Live
                      </Badge>
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-400">
                        <Cpu className="w-3 h-3 mr-1" />
                        AI Active
                      </Badge>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 bg-gradient-to-br from-slate-900 to-black">
                  <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-black rounded-3xl p-8 border border-slate-600 shadow-inner relative overflow-hidden">
                    {/* Animated background grid */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 animate-pulse" />
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <defs>
                          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(34, 197, 94, 0.2)" strokeWidth="0.5"/>
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                      </svg>
                    </div>

                    {/* Store Layout Grid */}
                    <div 
                      className="grid gap-3 mx-auto max-w-5xl relative z-10"
                      style={{ 
                        gridTemplateColumns: 'repeat(13, minmax(0, 1fr))',
                        gridTemplateRows: 'repeat(6, minmax(0, 1fr))',
                        aspectRatio: '2.2/1'
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
                            transition={{ duration: 0.4, delay: index * 0.03 }}
                            className={`
                              relative rounded-xl border-2 transition-all duration-500 hover:scale-105 hover:z-20
                              ${getShelfStyle(area)}
                            `}
                            style={{
                              gridColumn: `${area.x + 1} / span ${area.width}`,
                              gridRow: `${area.y + 1} / span ${area.height}`,
                              minHeight: '70px'
                            }}
                          >
                            {/* Futuristic corner accents */}
                            {area.type !== 'path' && (
                              <>
                                <div className="absolute top-1 left-1 w-2 h-2 border-l-2 border-t-2 border-white/50 rounded-tl" />
                                <div className="absolute top-1 right-1 w-2 h-2 border-r-2 border-t-2 border-white/50 rounded-tr" />
                                <div className="absolute bottom-1 left-1 w-2 h-2 border-l-2 border-b-2 border-white/50 rounded-bl" />
                                <div className="absolute bottom-1 right-1 w-2 h-2 border-r-2 border-b-2 border-white/50 rounded-br" />
                              </>
                            )}

                            {/* Path animation */}
                            {area.type === 'path' && (
                              <div className="absolute inset-0">
                                <motion.div
                                  animate={{ 
                                    x: ['0%', '100%', '0%'],
                                    opacity: [0, 1, 0]
                                  }}
                                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                                  className="w-2 h-2 bg-cyan-400 rounded-full absolute top-1/2 transform -translate-y-1/2"
                                />
                              </div>
                            )}

                            {area.type !== 'path' && (
                              <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center">
                                <div className="font-bold text-sm mb-1 text-shadow">{area.name}</div>
                                {area.section && (
                                  <div className="text-xs opacity-90 font-medium mb-1">{area.section}</div>
                                )}
                                {area.temp && (
                                  <div className="text-xs opacity-75 bg-black/30 px-1 rounded">{area.temp}</div>
                                )}
                                {hasItems.length > 0 && (
                                  <div className="text-xs mt-1 space-y-1 max-h-12 overflow-hidden">
                                    {hasItems.slice(0, 2).map(item => (
                                      <div key={item.id} className="flex items-center justify-center">
                                        <span className={item.scanned ? 'line-through opacity-60' : 'font-medium'}>
                                          {item.name}
                                        </span>
                                        {item.scanned && <CheckCircle className="w-3 h-3 ml-1 text-green-300" />}
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            )}
                            
                            {/* Holographic indicator for items to collect */}
                            {hasUnscannedItems && (
                              <motion.div
                                animate={{ 
                                  scale: [1, 1.5, 1],
                                  opacity: [0.5, 1, 0.5],
                                  rotate: [0, 180, 360]
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full shadow-2xl"
                              >
                                <div className="absolute inset-0.5 bg-white rounded-full animate-ping" />
                              </motion.div>
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                    
                    {/* Enhanced user position indicator */}
                    <motion.div
                      animate={{ 
                        y: [0, -12, 0],
                        scale: [1, 1.15, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="absolute bottom-8 left-16 flex items-center space-x-3"
                    >
                      <div className="relative">
                        <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-2xl border-2 border-white">
                          <Navigation className="w-5 h-5" />
                        </div>
                        <motion.div
                          animate={{ scale: [1, 2, 1], opacity: [0.7, 0, 0.7] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute inset-0 bg-cyan-400 rounded-full"
                        />
                      </div>
                      <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-4 py-2 rounded-full shadow-xl border border-slate-600">
                        <span className="text-sm font-medium text-cyan-400">You are here</span>
                      </div>
                    </motion.div>

                    {/* Enhanced Legend */}
                    <div className="mt-8 flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-gradient-to-br from-amber-200 to-orange-400 border-2 border-amber-400 rounded shadow-lg" />
                        <span className="text-gray-300">Mission targets</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-gradient-to-br from-green-200 to-teal-400 border-2 border-green-400 rounded shadow-lg" />
                        <span className="text-gray-300">Completed</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-gradient-to-br from-slate-200 to-slate-400 border border-gray-400 rounded shadow-lg" />
                        <span className="text-gray-300">Navigation zone</span>
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
              {/* Product Scanner */}
              <Card className="shadow-2xl border border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <Scan className="w-5 h-5 mr-2 text-cyan-400" />
                    Quantum Scanner
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ProductScanner />
                </CardContent>
              </Card>

              {/* Shopping List Items */}
              <Card className="shadow-2xl border border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <Zap className="w-5 h-5 mr-2 text-yellow-500" />
                    Mission Items
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
                            ? 'bg-gradient-to-r from-green-900/50 to-emerald-900/50 border-green-500 shadow-lg shadow-green-500/20' 
                            : 'bg-gradient-to-r from-amber-900/50 to-orange-900/50 border-amber-500 hover:border-amber-400 shadow-lg shadow-amber-500/20'
                          }
                        `}
                      >
                        <div className="flex-1">
                          <div className={`font-semibold ${item.scanned ? 'text-green-300 line-through' : 'text-white'}`}>
                            {item.name}
                          </div>
                          <div className="text-sm text-gray-400 mt-1">
                            {item.aisle} • Shelf: {item.shelf}
                          </div>
                        </div>
                        
                        {item.scanned ? (
                          <CheckCircle className="w-6 h-6 text-green-400" />
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => scanItem(item.id)}
                            className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 shadow-lg"
                          >
                            Collect
                          </Button>
                        )}
                      </motion.div>
                    ))}
                  </div>
                  
                  {completedItems === scannedItems.length && (
                    <div className="mt-6 pt-4 border-t border-slate-600">
                      <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-2xl">
                        Proceed to Quantum Checkout
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
