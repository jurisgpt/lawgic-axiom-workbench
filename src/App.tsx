
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Dashboard from "./pages/Dashboard";
import CaseEditor from "./pages/CaseEditor";
import ReasoningPanel from "./pages/ReasoningPanel";
import ResultsView from "./pages/ResultsView";
import Cases from "./pages/Cases";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="case-editor/:fileId" element={<CaseEditor />} />
            <Route path="results" element={<ResultsView />} />
            <Route path="cases" element={<Cases />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="reasoning" element={<ReasoningPanel />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
