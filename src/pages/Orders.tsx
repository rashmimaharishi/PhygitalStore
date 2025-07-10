import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Package, Truck, CheckCircle, Clock, MapPin, Receipt, Download, QrCode, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Navbar from "@/components/Navbar";

const Orders = () => {
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  const orders = [
    {
      id: "ORD-001",
      date: "2024-01-15",
      status: "delivered",
      items: [
        { name: "Milk", quantity: 2, price: 50, total: 100 },
        { name: "Bread", quantity: 1, price: 25, total: 25 },
        { name: "Apples", quantity: 3, price: 108.33, total: 325 }
      ],
      subtotal: 450,
      discount: 0,
      total: 450,
      deliveryTime: "2 hours",
      address: "123 Main St, City",
      receiptHash: "0x1a2b3c4d5e6f7890abcdef",
      qrCode: "QR123456789"
    },
    {
      id: "ORD-002",
      date: "2024-01-14",
      status: "in-transit",
      items: [
        { name: "Yogurt", quantity: 4, price: 40, total: 160 },
        { name: "Bananas", quantity: 2, price: 60, total: 120 },
        { name: "Cereals", quantity: 1, price: 400, total: 400 }
      ],
      subtotal: 680,
      discount: 0,
      total: 680,
      deliveryTime: "1 hour",
      address: "123 Main St, City",
      receiptHash: "0x2b3c4d5e6f7890abcdef1a",
      qrCode: "QR987654321"
    },
    {
      id: "ORD-003",
      date: "2024-01-13",
      status: "processing",
      items: [
        { name: "Rice", quantity: 1, price: 500, total: 500 },
        { name: "Dal", quantity: 2, price: 150, total: 300 },
        { name: "Oil", quantity: 1, price: 50, total: 50 }
      ],
      subtotal: 850,
      discount: 0,
      total: 850,
      deliveryTime: "3 hours",
      address: "123 Main St, City",
      receiptHash: "0x3c4d5e6f7890abcdef1a2b",
      qrCode: "QR456789123"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "in-transit":
        return <Truck className="w-5 h-5 text-blue-600" />;
      case "processing":
        return <Clock className="w-5 h-5 text-yellow-600" />;
      default:
        return <Package className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "in-transit":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const downloadReceipt = (order) => {
    // Generate receipt content
    const receiptContent = `
PHYGITAL SHOPPING RECEIPT
=========================
Order ID: ${order.id}
Date: ${new Date(order.date).toLocaleDateString()}
Status: ${order.status.toUpperCase()}

ITEMS:
${order.items.map(item => 
  `${item.name} x${item.quantity} - ₹${item.total}`
).join('\n')}

Subtotal: ₹${order.subtotal}
Discount: ₹${order.discount}
TOTAL: ₹${order.total}

Delivery Address: ${order.address}
Verification Hash: ${order.receiptHash}
QR Code: ${order.qrCode}

Thank you for shopping with us!
    `;

    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${order.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
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
              Your Orders
            </h1>
            <p className="text-lg text-gray-600">
              Track your phygital shopping orders and view digital receipts
            </p>
          </motion.div>

          {/* Order Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-6 mb-8"
          >
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-800">12</div>
                <div className="text-sm text-gray-600">Total Orders</div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-800">₹2,240</div>
                <div className="text-sm text-gray-600">Total Saved</div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Receipt className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-gray-800">{orders.length}</div>
                <div className="text-sm text-gray-600">Digital Receipts</div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Orders List */}
          <div className="space-y-6">
            {orders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              >
                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center">
                        {getStatusIcon(order.status)}
                        <span className="ml-2 text-lg">{order.id}</span>
                      </span>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <div className="text-sm text-gray-600 mb-1">Order Date</div>
                          <div className="font-medium">{new Date(order.date).toLocaleDateString()}</div>
                        </div>
                        
                        <div>
                          <div className="text-sm text-gray-600 mb-1">Items ({order.items.length})</div>
                          <div className="flex flex-wrap gap-2">
                            {order.items.map((item, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {item.name} x{item.quantity}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <div className="text-sm text-gray-600 mb-1">Delivery Address</div>
                          <div className="flex items-center text-sm">
                            <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                            {order.address}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <div className="text-sm text-gray-600 mb-1">Total Amount</div>
                          <div className="text-2xl font-bold text-green-600">₹{order.total}</div>
                        </div>

                        <div>
                          <div className="text-sm text-gray-600 mb-1">Delivery Time</div>
                          <div className="font-medium">{order.deliveryTime}</div>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" className="flex-1" onClick={() => setSelectedReceipt(order)}>
                                <Receipt className="w-4 h-4 mr-1" />
                                Receipt
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle className="flex items-center gap-2">
                                  <Receipt className="w-5 h-5" />
                                  Digital Receipt - {order.id}
                                </DialogTitle>
                              </DialogHeader>
                              
                              {selectedReceipt && (
                                <div className="space-y-6">
                                  {/* Receipt Header */}
                                  <div className="text-center border-b pb-4">
                                    <h3 className="text-xl font-bold">PHYGITAL SHOPPING</h3>
                                    <p className="text-sm text-gray-600">Digital Receipt</p>
                                    <div className="mt-2">
                                      <QrCode className="w-16 h-16 mx-auto text-gray-400" />
                                      <p className="text-xs text-gray-500 mt-1">Scan for verification</p>
                                    </div>
                                  </div>

                                  {/* Order Details */}
                                  <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                      <span className="text-gray-600">Order ID:</span>
                                      <span className="ml-2 font-medium">{selectedReceipt.id}</span>
                                    </div>
                                    <div>
                                      <span className="text-gray-600">Date:</span>
                                      <span className="ml-2 font-medium">{new Date(selectedReceipt.date).toLocaleDateString()}</span>
                                    </div>
                                    <div>
                                      <span className="text-gray-600">Status:</span>
                                      <span className="ml-2 font-medium">{selectedReceipt.status}</span>
                                    </div>
                                    <div>
                                      <span className="text-gray-600">QR Code:</span>
                                      <span className="ml-2 font-medium">{selectedReceipt.qrCode}</span>
                                    </div>
                                  </div>

                                  {/* Items Table */}
                                  <div>
                                    <h4 className="font-semibold mb-3">Items Purchased</h4>
                                    <Table>
                                      <TableHeader>
                                        <TableRow>
                                          <TableHead>Item</TableHead>
                                          <TableHead>Qty</TableHead>
                                          <TableHead>Price</TableHead>
                                          <TableHead>Total</TableHead>
                                        </TableRow>
                                      </TableHeader>
                                      <TableBody>
                                        {selectedReceipt.items.map((item, idx) => (
                                          <TableRow key={idx}>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>{item.quantity}</TableCell>
                                            <TableCell>₹{item.price.toFixed(2)}</TableCell>
                                            <TableCell>₹{item.total}</TableCell>
                                          </TableRow>
                                        ))}
                                      </TableBody>
                                    </Table>
                                  </div>

                                  {/* Totals */}
                                  <div className="border-t pt-4 space-y-2">
                                    <div className="flex justify-between text-sm">
                                      <span>Subtotal:</span>
                                      <span>₹{selectedReceipt.subtotal}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span>Discount:</span>
                                      <span>₹{selectedReceipt.discount}</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold border-t pt-2">
                                      <span>Total:</span>
                                      <span>₹{selectedReceipt.total}</span>
                                    </div>
                                  </div>

                                  {/* Verification */}
                                  <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="font-semibold mb-2">Blockchain Verification</h4>
                                    <p className="text-xs text-gray-600 mb-1">Hash:</p>
                                    <p className="font-mono text-xs break-all">{selectedReceipt.receiptHash}</p>
                                  </div>

                                  {/* Download Button */}
                                  <Button 
                                    onClick={() => downloadReceipt(selectedReceipt)} 
                                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600"
                                  >
                                    <Download className="w-4 h-4 mr-2" />
                                    Download Receipt
                                  </Button>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>

                          {order.status === "delivered" && (
                            <Button size="sm" className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600">
                              Reorder
                            </Button>
                          )}
                          {order.status === "in-transit" && (
                            <Button size="sm" className="flex-1 bg-gradient-to-r from-blue-600 to-green-600">
                              Track Live
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {orders.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center py-16"
            >
              <Package className="w-16 h-16 mx-auto mb-6 text-gray-400" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No orders yet</h3>
              <p className="text-gray-600 mb-6">Start shopping to see your orders here</p>
              <Link to="/smart-list">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  Create Your First List
                </Button>
              </Link>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Orders;
