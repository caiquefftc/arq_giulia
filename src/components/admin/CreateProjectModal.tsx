import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { ClientSelect } from "./project/ClientSelect";
import { ProjectTypeSelect, ProjectType } from "./project/ProjectTypeSelect";

interface CreateProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProjectCreated?: () => void;
}

export function CreateProjectModal({ open, onOpenChange, onProjectCreated }: CreateProjectModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectType, setProjectType] = useState<ProjectType | "">("");
  const [selectedClient, setSelectedClient] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!selectedClient || !title || !projectType) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from("client_projects")
        .insert({
          client_id: selectedClient,
          title,
          description,
          project_type: projectType,
          status: "Em andamento"
        });

      if (error) throw error;

      toast.success("Projeto criado com sucesso!");
      onProjectCreated?.();
      setTitle("");
      setDescription("");
      setProjectType("");
      setSelectedClient("");
      onOpenChange(false);
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error("Erro ao criar projeto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar Novo Projeto</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <ClientSelect
              selectedClient={selectedClient}
              onClientSelect={setSelectedClient}
            />
          </div>

          <div className="grid gap-2">
            <Input
              placeholder="Nome do Projeto"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <ProjectTypeSelect
              value={projectType}
              onChange={(value) => setProjectType(value)}
            />
          </div>

          <div className="grid gap-2">
            <Input
              placeholder="Descrição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <Button onClick={handleCreate} disabled={loading}>
            {loading ? "Criando..." : "Criar Projeto"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}