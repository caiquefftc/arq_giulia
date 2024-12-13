import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Layout } from "./components/Layout";
import Index from "./pages/Index";
import Projetos from "./pages/Projetos";
import Servicos from "./pages/Servicos";
import Orcamento from "./pages/Orcamento";
import Contato from "./pages/Contato";
import SobreNos from "./pages/SobreNos";
import Admin from "./pages/Admin";
import ClientPanel from "./pages/ClientPanel";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Index />} />
                <Route path="/projetos" element={<Projetos />} />
                <Route path="/servicos" element={<Servicos />} />
                <Route path="/orcamento" element={<Orcamento />} />
                <Route path="/contato" element={<Contato />} />
                <Route path="/sobre-nos" element={<SobreNos />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/client" element={<ClientPanel />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;