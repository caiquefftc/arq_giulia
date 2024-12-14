import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ProjectCard } from "./ProjectCard";
import { CreateProjectModal } from "./CreateProjectModal";
import { EditProjectModal } from "./EditProjectModal";
import { Button } from "@/components/ui/button";
import { ClientSelect } from "./project/ClientSelect";

interface Client {
  id: string;
  full_name: string;
  email: string;
}

interface Project {
  id: string;
  client_id: string;
  title: string;
  description: string;
  project_type: string;
  status: string;
  created_at: string;
}

interface ClientListProps {
  clients: Client[];
  projects: Project[];
}

export function ClientList({ clients, projects }: ClientListProps) {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleDeleteProject = async (projectId: string) => {
    try {
      const { error } = await supabase
        .from('client_projects')
        .delete()
        .eq('id', projectId);

      if (error) throw error;

      toast.success('Projeto removido com sucesso');
      //window.location.reload();
    } catch (error) {
      console.error('Erro ao deletar projeto:', error);
      toast.error('Erro ao remover projeto');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Lista de Clientes</h2>
        <Button onClick={() => setCreateModalOpen(true)}>
          Novo Projeto
        </Button>
      </div>

      {clients.map((client) => {
        const clientProjects = projects.filter(
          (project) => project.client_id === client.id
        );

        return (
          <div key={client.id} className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold">{client.full_name}</h3>
              <p className="text-gray-600">{client.email}</p>
            </div>

            {clientProjects.length > 0 ? (
              <div className="grid gap-4">
                {clientProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onEdit={() => {
                      setSelectedProject(project);
                      setEditModalOpen(true);
                    }}
                    onDelete={() => handleDeleteProject(project.id)}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Nenhum projeto encontrado.</p>
            )}
          </div>
        );
      })}

      <CreateProjectModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        //onProjectCreated={() => window.location.reload()}
      />

      {editModalOpen && selectedProject && (
        <EditProjectModal
          project={selectedProject}
          open={editModalOpen}
          onOpenChange={setEditModalOpen}
          onProjectUpdated={() => {
            //window.location.reload();
          }}
        />
      )}
    </div>
  );
}