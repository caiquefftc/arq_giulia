import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { MessageList } from "@/components/admin/MessageList";
import { BudgetList } from "@/components/admin/BudgetList";
import { ClientList } from "@/components/admin/ClientList";
import { ProjectUpdatesList } from "@/components/admin/ProjectUpdatesList";

export default function Admin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState<any[]>([]);
  const [clientProjects, setClientProjects] = useState<any[]>([]);

  useEffect(() => {
    checkUser();
    fetchData();
  }, []);

  async function checkUser() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/");
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", session.user.id)
      .single();

    if (!profile || profile.role !== "ADMIN") {
      toast.error("Você não tem permissão para acessar esta página.");
      navigate("/");
    }
  }

  async function fetchData() {
    try {
      const [clientsResponse, clientProjectsResponse] = await Promise.all([
        supabase
          .from("profiles")
          .select("*")
          .eq("role", "CLIENT")
          .order("created_at", { ascending: false }),
        supabase
          .from("client_projects")
          .select("*")
          .order("created_at", { ascending: false }),
      ]);

      if (clientsResponse.data) setClients(clientsResponse.data);
      if (clientProjectsResponse.data) setClientProjects(clientProjectsResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Não foi possível carregar os dados.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold mb-8">Painel Administrativo</h1>

        <Tabs defaultValue="messages" className="space-y-4">
          <TabsList className="grid grid-cols-4 gap-4">
            <TabsTrigger value="messages">Mensagens</TabsTrigger>
            <TabsTrigger value="budgets">Orçamentos</TabsTrigger>
            <TabsTrigger value="updates">Atualizações</TabsTrigger>
            <TabsTrigger value="clients">Clientes</TabsTrigger>
          </TabsList>

          <TabsContent value="messages">
            <MessageList />
          </TabsContent>

          <TabsContent value="budgets">
            <BudgetList />
          </TabsContent>

          <TabsContent value="updates">
            <ProjectUpdatesList />
          </TabsContent>

          <TabsContent value="clients">
            <ClientList 
              clients={clients}
              projects={clientProjects}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}