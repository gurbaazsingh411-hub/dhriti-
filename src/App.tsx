import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MonkeyGame from "./pages/MonkeyGame";
import ClassSkipperGame from "./pages/ClassSkipperGame";
import NotFound from "./pages/NotFound";
import CustomCursor from "./components/CustomCursor";
import FloatingParticles from "./components/FloatingParticles";
import ScrollProgress from "./components/ScrollProgress";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <CustomCursor />
        <FloatingParticles />
        <ScrollProgress />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/game" element={<MonkeyGame />} />
          <Route path="/skipper" element={<ClassSkipperGame />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
