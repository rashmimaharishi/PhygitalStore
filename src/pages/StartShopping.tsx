
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Trophy, CheckCircle, Navigation, Store, Zap, Scan } from "lucide-react";
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

  // Simplified store layout
  const storeLayout = [
    { id: 'entrance', name: 'Entrance', type: 'entrance', x: 0, y: 2, width: 1, height: 1 },
    { id: 'A1', name: 'A1', type: 'shelf', x: 2, y: 1, width: 2, height: 1, section: 'Dairy' },
    { id: 'A2', name: 'A2', type: 'shelf', x: 2, y: 3, width: 2, height: 1, section: 'Dairy' },
    { id: 'B1', name: 'B1', type: 'shelf', x: 5, y: 1, width: 2, height: 1, section: 'Beverages' },
    { id: 'B2', name: 'B2', type: 'shelf', x: 5, y: 3, width: 2, height: 1, section: 'Snacks' },
    { id: 'B3', name: 'B3', type: 'shelf', x: 5, y: 5, width: 2, height: 1, section: 'Bakery' },
    { id: 'C1', name: 'C1', type: 'shelf', x: 8, y: 1, width: 2, height: 1, section: 'Frozen' },
    { id: 'C2', name: 'C2', type: 'shelf', x: 8, y: 3, width: 2, height: 1, section: 'Produce' },
    { id: 'C3', name: 'C3', type: 'shelf', x: 8, y: 5, width: 2, height: 1, section: 'Meat' },
    { id: 'checkout', name: 'Checkout', type: 'checkout', x: 11, y: 2, width: 1, height: 2 },
    { id: 'path1', name: '', type: 'path', x: 1, y: 2, width: 1, height: 1 },
    { id: 'path2', name: '', type: 'path', x: 4, y: 2, width: 1, height: 1 },
    { id: 'path3', name: '', type: 'path', x: 7, y: 2, width: 1, height: 1 },
    { id: 'path4', name: '', type: 'path', x: 10, y: 2, width: 1, height: 1 },
    { id: 'path-h1', name: '', type: 'path', x: 2, y: 2, width: 8, height: 1 },
    { id: 'path-h2', name: '', type: 'path', x: 2, y: 4, width: 8, height: 1 },
  ];

  const getItemsByShelf = (shelfId: string) => {
    return scannedItems.filter(item => item.shelf === shelfId);
  };

  const getShelfStyle = (area: any) => {
    const hasItems = getItemsByShelf(area.id);
    const hasUnscannedItems = hasItems.some(item => !item.scanned);
    const allItemsScanned = hasItems.length > 0 && hasItems.every(item => item.scanned);
    
    if (area.type === 'entrance') {
      return 'bg-blue-100 border-2 border-blue-300 text-blue-800';
    }
    if (area.type === 'checkout') {
      return 'bg-purple-100 border-2 border-purple-300 text-purple-800';
    }
    if (area.type === 'path') {
      return 'bg-gray-50 border border-gray-200';
    }
    if (hasUnscannedItems) {
      return 'bg-orange-100 border-2 border-orange-400 text-orange-800 shadow-md';
    }
    if (allItemsScanned) {
      return 'bg-green-100 border-2 border-green-400 text-green-800';
    }
    return 'bg-gray-100 border border-gray-300 text-gray-700';
  };

  return (
    <div className="min-h-screen bg-background">
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
              className="inline-flex items-center text-primary hover:text-primary/80 mb-6 group"
            >
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
              Back to Home
            </Link>
            
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Store Navigator
            </h1>
            <p className="text-lg text-muted-foreground">
              Navigate through the store efficiently and track your shopping progress
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
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                      Shopping Progress
                    </span>
                    <Badge variant="secondary">
                      {completedItems}/{scannedItems.length} items
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Progress value={progress} className="h-2" />
                    <div className="text-center">
                      <span className="text-lg font-semibold text-primary">
                        {Math.round(progress)}% Complete
                      </span>
                      {progress === 100 && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="mt-2 text-green-600 font-medium"
                        >
                          🎉 All items collected!
                        </motion.div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Store Map */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Store className="w-6 h-6 mr-3" />
                    Store Layout
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="bg-white rounded-lg p-6 border border-border shadow-sm">
                    {/* Store Layout Grid */}
                    <div 
                      className="grid gap-2 mx-auto max-w-4xl"
                      style={{ 
                        gridTemplateColumns: 'repeat(13, minmax(0, 1fr))',
                        gridTemplateRows: 'repeat(6, minmax(0, 1fr))',
                        aspectRatio: '2.2/1'
                      }}
                    >
                      {storeLayout.map((area) => {
                        const hasItems = getItemsByShelf(area.id);
                        const hasUnscannedItems = hasItems.some(item => !item.scanned);
                        
                        return (
                          <motion.div
                            key={area.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            className={`
                              relative rounded-md border transition-all duration-200 hover:shadow-sm
                              ${getShelfStyle(area)}
                            `}
                            style={{
                              gridColumn: `${area.x + 1} / span ${area.width}`,
                              gridRow: `${area.y + 1} / span ${area.height}`,
                              minHeight: '50px'
                            }}
                          >
                            {area.type !== 'path' && (
                              <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center">
                                <div className="font-semibold text-sm">{area.name}</div>
                                {area.section && (
                                  <div className="text-xs opacity-80 mt-1">{area.section}</div>
                                )}
                                {hasItems.length > 0 && (
                                  <div className="text-xs mt-2 space-y-1">
                                    {hasItems.slice(0, 2).map(item => (
                                      <div key={item.id} className="flex items-center justify-center">
                                        <span className={item.scanned ? 'line-through opacity-60' : 'font-medium'}>
                                          {item.name}
                                        </span>
                                        {item.scanned && <CheckCircle className="w-3 h-3 ml-1" />}
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            )}
                            
                            {/* Indicator for items to collect */}
                            {hasUnscannedItems && (
                              <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full" />
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                    
                    {/* User position indicator */}
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute bottom-4 left-12 flex items-center space-x-2"
                    >
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <Navigation className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <div className="bg-primary/10 px-3 py-1 rounded-full border">
                        <span className="text-sm font-medium text-primary">You are here</span>
                      </div>
                    </motion.div>

                    {/* Legend */}
                    <div className="mt-6 flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-orange-100 border-2 border-orange-400 rounded" />
                        <span className="text-muted-foreground">Items to collect</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-green-100 border-2 border-green-400 rounded" />
                        <span className="text-muted-foreground">Completed</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-gray-100 border border-gray-300 rounded" />
                        <span className="text-muted-foreground">Empty shelves</span>
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
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Scan className="w-5 h-5 mr-2" />
                    Product Scanner
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ProductScanner />
                </CardContent>
              </Card>

              {/* Shopping List Items */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="w-5 h-5 mr-2" />
                    Shopping List
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {scannedItems.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`
                          flex items-center justify-between p-4 rounded-lg border transition-all duration-200
                          ${item.scanned 
                            ? 'bg-green-50 border-green-200' 
                            : 'bg-orange-50 border-orange-200 hover:border-orange-300'
                          }
                        `}
                      >
                        <div className="flex-1">
                          <div className={`font-semibold ${item.scanned ? 'text-green-700 line-through' : 'text-foreground'}`}>
                            {item.name}
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {item.aisle} • Shelf: {item.shelf}
                          </div>
                        </div>
                        
                        {item.scanned ? (
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => scanItem(item.id)}
                            className="bg-primary hover:bg-primary/90"
                          >
                            Collect
                          </Button>
                        )}
                      </motion.div>
                    ))}
                  </div>
                  
                  {completedItems === scannedItems.length && (
                    <div className="mt-6 pt-4 border-t">
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
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
