import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";

interface ProjectUpdate {
  id: string;
  project_id: string;
  title: string;
  content: string;
  created_at: string;
}

interface Project {
  title: string;
  description: string | null;
  image_url: string | null;
  images: string[] | null;
}

interface ClientProject {
  id: string;
  title: string;
  description: string | null;
  status: string;
  created_at: string;
  project_id: string | null;
  project_type: "Projeto Residencial" | "Projeto Comercial" | "Consultoria Residencial" | "Consultoria Comercial" | null;
  project: Project | null;
}

export default function ClientPanel() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<ClientProject[]>([]);
  const [updates, setUpdates] = useState<ProjectUpdate[]>([]);

  useEffect(() => {
    checkUser();
    fetchData();
  }, []);

  async function checkUser() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/login");
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", session.user.id)
      .single();

    if (!profile || profile.role !== "CLIENT") {
      toast.error("Você não tem permissão para acessar esta página.");
      navigate("/");
    }
  }

  async function fetchData() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      // Buscar projetos do cliente
      const { data: projectsData, error: projectsError } = await supabase
        .from("client_projects")
        .select(`
          *,
          project:projects (
            title,
            description,
            image_url,
            images
          )
        `)
        .eq("client_id", session.user.id)
        .order("created_at", { ascending: false });

      if (projectsError) throw projectsError;
      
      console.log("Projects data:", projectsData);
      
      if (projectsData) {
        setProjects(projectsData as ClientProject[]);

        // Buscar atualizações dos projetos
        const { data: updatesData, error: updatesError } = await supabase
          .from("project_updates")
          .select("*")
          .in("project_id", projectsData.map(p => p.id))
          .order("created_at", { ascending: false });

        if (updatesError) throw updatesError;
        if (updatesData) setUpdates(updatesData);
      }

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
        <h1 className="text-3xl font-bold mb-8">Meus Projetos</h1>

        <div className="grid gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden">
              <CardHeader>
                <CardTitle className="text-xl">{project.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {project.project?.image_url && (
                    <img
                      src={project.project.image_url}
                      alt={project.project.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  )}
                  <p className="text-gray-600">{project.project?.description}</p>
                  <p><strong>Status:</strong> {project.status}</p>
                  
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="updates">
                      <AccordionTrigger>Atualizações do Projeto</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          {updates
                            .filter(update => update.project_id === project.id)
                            .map((update) => (
                              <div key={update.id} className="border-l-2 border-primary pl-4">
                                <h4 className="font-semibold">{update.title}</h4>
                                <p className="text-gray-600">{update.content}</p>
                                <p className="text-sm text-gray-500">
                                  {new Date(update.created_at).toLocaleString()}
                                </p>
                              </div>
                            ))}
                          {updates.filter(update => update.project_id === project.id).length === 0 && (
                            <p className="text-gray-500">Nenhuma atualização disponível.</p>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </CardContent>
            </Card>
          ))}
          {projects.length === 0 && (
            <p className="text-center text-gray-500">Nenhum projeto encontrado.</p>
          )}
        </div>
      </div>
    </div>
  );
}