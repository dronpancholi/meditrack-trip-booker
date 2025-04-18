
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { supabase } from "./lib/supabase";
import { toast } from "sonner";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => {
  useEffect(() => {
    // Check Supabase connection
    const checkConnection = async () => {
      try {
        const { error } = await supabase.from("trips").select("id").limit(1);
        
        if (error && error.code === "PGRST301") {
          // This is normal when table doesn't exist yet
          console.log("Supabase connected, but trips table might not exist yet.");
        } else if (error) {
          console.error("Supabase connection error:", error);
          toast.error("Database connection error. Please check your Supabase configuration.");
        } else {
          console.log("Supabase connected successfully");
        }
      } catch (error) {
        console.error("Failed to connect to Supabase:", error);
        toast.error("Database connection error. Please configure Supabase credentials.");
      }
    };

    checkConnection();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
