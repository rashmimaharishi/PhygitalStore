
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SmartList from "./pages/SmartList";
import StartShopping from "./pages/StartShopping";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Notifications from "./pages/Notifications";
import StartNavigation from "./pages/StartNavigation";
import Deals from "./pages/Deals";
import Announcements from "./pages/Announcements";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/smart-list" element={<SmartList />} />
          <Route path="/start-shopping" element={<StartShopping />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/login" element={<Login />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/start-navigation" element={<StartNavigation />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
