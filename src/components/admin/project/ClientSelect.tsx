import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Database } from "@/integrations/supabase/types";

interface ClientSelectProps {
  selectedClient: string;
  onClientSelect: (clientId: string) => void;
}

type Profile = Database['public']['Tables']['profiles']['Row'];

interface Client {
  id: string;
  email: string;
}

export function ClientSelect({ selectedClient, onClientSelect }: ClientSelectProps) {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      console.log("Fetching clients...");
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('id, email')
        .eq('role', 'CLIENT');

      if (error) {
        console.error("Error fetching profiles:", error);
        throw error;
      }

      if (!profiles || profiles.length === 0) {
        console.log("No clients found");
        setClients([]);
        return;
      }

      const clientsData = profiles.map((profile: Profile) => ({
        id: profile.id,
        email: profile.email || "Email não encontrado"
      }));

      console.log("Clients fetched:", clientsData);
      setClients(clientsData);
    } catch (error) {
      console.error("Error in fetchClients:", error);
      toast.error("Erro ao carregar lista de clientes");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Select disabled>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Carregando clientes..." />
        </SelectTrigger>
      </Select>
    );
  }

  if (clients.length === 0) {
    return (
      <Select disabled>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Nenhum cliente encontrado" />
        </SelectTrigger>
      </Select>
    );
  }

  return (
    <Select value={selectedClient} onValueChange={onClientSelect}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Selecione um cliente" />
      </SelectTrigger>
      <SelectContent>
        {clients.map((client) => (
          <SelectItem 
            key={client.id} 
            value={client.id}
            className="flex items-center justify-between"
          >
            <span>{client.email}</span>
            {selectedClient === client.id && (
              <Check className="h-4 w-4 ml-2" />
            )}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}