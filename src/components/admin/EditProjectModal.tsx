import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface EditProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: {
    id: string;
    title: string;
    status: string;
  } | null;
  onProjectUpdated: () => void;
}

export function EditProjectModal({ open, onOpenChange, project, onProjectUpdated }: EditProjectModalProps) {
  const [status, setStatus] = useState(project?.status || "");
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateContent, setUpdateContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdateStatus = async () => {
    if (!project) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from("client_projects")
        .update({ status })
        .eq("id", project.id);

      if (error) throw error;

      toast.success("Status atualizado com sucesso!");
      onProjectUpdated();
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Erro ao atualizar status");
    } finally {
      setLoading(false);
    }
  };

  const handleAddUpdate = async () => {
    console.log("Iniciando adição de atualização...");
    if (!project || !updateTitle || !updateContent) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }

    setLoading(true);
    try {
      console.log("Processando conteúdo...");
      // Regex para identificar URLs no texto
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      
      // Encontra todas as URLs no texto
      const urls = updateContent.match(urlRegex) || [];
      
      // Substitui as URLs por marcadores temporários
      let processedContent = updateContent;
      urls.forEach((url, index) => {
        processedContent = processedContent.replace(url, `[[URL${index}]]`);
      });

      // Cria o objeto com o conteúdo e os links
      const contentObject = {
        text: processedContent,
        links: urls
      };

      console.log("Enviando atualização para o Supabase...");
      const { error } = await supabase
        .from("project_updates")
        .insert({
          project_id: project.id,
          title: updateTitle,
          content: JSON.stringify(contentObject)
        });

      if (error) {
        console.error("Erro do Supabase:", error);
        throw error;
      }

      toast.success("Atualização adicionada com sucesso!");
      setUpdateTitle("");
      setUpdateContent("");
      onProjectUpdated();
    } catch (error) {
      console.error("Error adding update:", error);
      toast.error("Erro ao adicionar atualização");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Projeto: {project?.title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Atualizar Status</h3>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Em andamento">Em andamento</SelectItem>
                <SelectItem value="Concluído">Concluído</SelectItem>
                <SelectItem value="Pausado">Pausado</SelectItem>
                <SelectItem value="Cancelado">Cancelado</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleUpdateStatus} disabled={loading || !status}>
              Atualizar Status
            </Button>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Adicionar Atualização</h3>
            <Input
              placeholder="Título da atualização"
              value={updateTitle}
              onChange={(e) => setUpdateTitle(e.target.value)}
            />
            <Textarea
              placeholder="Conteúdo da atualização (URLs serão automaticamente convertidas em links)"
              value={updateContent}
              onChange={(e) => setUpdateContent(e.target.value)}
              className="min-h-[100px]"
            />
            <Button 
              onClick={handleAddUpdate} 
              disabled={loading || !updateTitle || !updateContent}
              type="button"
            >
              Adicionar Atualização
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}