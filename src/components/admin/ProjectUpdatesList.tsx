import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";

interface ProjectUpdate {
  id: string;
  project_id: string;
  title: string;
  content: string;
  created_at: string;
}

export function ProjectUpdatesList() {
  const { data: updates, isLoading, refetch } = useQuery({
    queryKey: ['project_updates'],
    queryFn: async () => {
      console.log("Buscando atualizações de projetos...");
      const { data, error } = await supabase
        .from('project_updates')
        .select(`
          *,
          client_projects(title)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      console.log("Atualizações encontradas:", data);
      return data;
    },
  });

  const handleDelete = async (updateId: string) => {
    try {
      console.log("Deletando atualização:", updateId);
      
      const { error } = await supabase
        .from('project_updates')
        .delete()
        .eq('id', updateId);

      if (error) throw error;

      toast.success('Atualização removida com sucesso');
      refetch();
    } catch (error) {
      console.error('Erro ao deletar atualização:', error);
      toast.error('Erro ao remover atualização');
    }
  };

  const renderContent = (content: string) => {
    try {
      const contentObject = JSON.parse(content);
      let displayText = contentObject.text;
      
      // Substitui os marcadores temporários pelos links
      contentObject.links.forEach((url: string, index: number) => {
        displayText = displayText.replace(
          `[[URL${index}]]`,
          `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:text-blue-700 flex items-center gap-1">
            <span class="inline-block"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg></span>
            ${url}
          </a>`
        );
      });
      
      return displayText;
    } catch (e) {
      // Se não for um JSON válido, retorna o conteúdo original
      return content;
    }
  };

  if (isLoading) {
    return <div className="text-center py-4">Carregando atualizações...</div>;
  }

  if (!updates?.length) {
    return <div className="text-center text-gray-500">Nenhuma atualização encontrada.</div>;
  }

  return (
    <div className="grid gap-4">
      {updates.map((update) => (
        <Card key={update.id} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold">{update.title}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Projeto: {update.client_projects?.title}
                </p>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleDelete(update.id)}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              <div 
                className="text-sm prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: renderContent(update.content) }}
              />
              <p className="text-sm text-gray-500">
                <strong>Data:</strong> {new Date(update.created_at).toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}