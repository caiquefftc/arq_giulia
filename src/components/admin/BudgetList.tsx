import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BudgetCard } from "./BudgetCard";

export function BudgetList() {
  const { data: budgets, isLoading, refetch } = useQuery({
    queryKey: ['budget_requests'],
    queryFn: async () => {
      console.log("Buscando orçamentos...");
      const { data, error } = await supabase
        .from('budget_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      console.log("Orçamentos encontrados:", data);
      return data;
    },
  });

  if (isLoading) {
    return <div className="text-center py-4">Carregando orçamentos...</div>;
  }

  if (!budgets?.length) {
    return <div className="text-center text-gray-500">Nenhum orçamento encontrado.</div>;
  }

  return (
    <div className="grid gap-4">
      {budgets.map((budget) => (
        <BudgetCard 
          key={budget.id} 
          budget={budget} 
          onDelete={refetch}
          onStatusChange={refetch}
        />
      ))}
    </div>
  );
}