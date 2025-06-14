import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import PhotoUploadPage from "./pages/PhotoUploadPage";
import AnalysisPage from "./pages/AnalysisPage";
import TrainingPage from "./pages/TrainingPage";
import NutritionPage from "./pages/NutritionPage";
import ProgressPage from "./pages/ProgressPage";
import FeaturesPage from "./pages/FeaturesPage";
import ImportExportPage from "./pages/ImportExportPage";
import NotFound from "./pages/NotFound";
import ProfessorDashboard from "./pages/ProfessorDashboard";
import ProfessorInvitePage from "./pages/ProfessorInvitePage";
import ProfessorStudentPage from "./pages/ProfessorStudentPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/upload" element={<PhotoUploadPage />} />
            <Route path="/analysis" element={<AnalysisPage />} />
            <Route path="/training" element={<TrainingPage />} />
            <Route path="/nutrition" element={<NutritionPage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/import-export" element={<ImportExportPage />} />
            <Route path="/professor/dashboard" element={<ProfessorDashboard />} />
            <Route path="/professor/invite" element={<ProfessorInvitePage />} />
            <Route path="/professor/student/:studentId" element={<ProfessorStudentPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
