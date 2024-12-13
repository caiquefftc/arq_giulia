import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MessageCard } from "./MessageCard";

export function MessageList() {
  const { data: messages, isLoading, refetch } = useQuery({
    queryKey: ['contact_messages'],
    queryFn: async () => {
      console.log("Buscando mensagens de contato...");
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      console.log("Mensagens encontradas:", data);
      return data;
    },
  });

  if (isLoading) {
    return <div className="text-center py-4">Carregando mensagens...</div>;
  }

  if (!messages?.length) {
    return <div className="text-center text-gray-500">Nenhuma mensagem encontrada.</div>;
  }

  return (
    <div className="grid gap-4">
      {messages.map((message) => (
        <MessageCard 
          key={message.id} 
          message={message} 
          onDelete={refetch}
        />
      ))}
    </div>
  );
}