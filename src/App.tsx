
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import PhotoUploadPage from "./pages/PhotoUploadPage";
import AnalysisPage from "./pages/AnalysisPage";
import TrainingPage from "./pages/TrainingPage";
import NutritionPage from "./pages/NutritionPage";
import ProgressPage from "./pages/ProgressPage";
import ProfilePage from "./pages/ProfilePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/home" element={<Home />} />
          <Route path="/upload" element={<PhotoUploadPage />} />
          <Route path="/analysis" element={<AnalysisPage />} />
          <Route path="/training" element={<TrainingPage />} />
          <Route path="/nutrition" element={<NutritionPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
