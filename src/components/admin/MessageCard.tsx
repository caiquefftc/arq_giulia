import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
  status: string;
}

interface MessageCardProps {
  message: Message;
  onDelete: () => void;
}

export function MessageCard({ message, onDelete }: MessageCardProps) {
  const handleDelete = async () => {
    try {
      console.log("Deletando mensagem:", message.id);
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', message.id);

      if (error) {
        console.error('Erro ao deletar mensagem:', error);
        throw error;
      }

      toast.success('Mensagem removida com sucesso');
      onDelete();
    } catch (error) {
      console.error('Erro ao deletar mensagem:', error);
      toast.error('Erro ao remover mensagem');
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold">{message.subject}</h3>
            <p className="text-sm text-gray-600 mt-1">De: {message.name}</p>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={handleDelete}
            className="text-red-500 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-2">
          <p className="text-sm"><strong>Email:</strong> {message.email}</p>
          <p className="text-sm"><strong>Mensagem:</strong> {message.message}</p>
          <p className="text-sm text-gray-500">
            <strong>Data:</strong> {new Date(message.created_at).toLocaleString()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}