import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Budget {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: string;
  created_at: string;
}

export interface BudgetCardProps {
  budget: Budget;
  onDelete: () => void;
  onStatusChange: () => void;
}

export function BudgetCard({ budget, onDelete, onStatusChange }: BudgetCardProps) {
  const handleStatusChange = async () => {
    try {
      console.log("Atualizando status do orçamento:", budget.id);
      const { error } = await supabase
        .from('budget_requests')
        .update({ status: 'Concluído' })
        .eq('id', budget.id);

      if (error) {
        console.error('Erro ao atualizar status:', error);
        throw error;
      }

      toast.success('Status atualizado com sucesso');
      onStatusChange();
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      toast.error('Erro ao atualizar status');
    }
  };

  const handleDelete = async () => {
    try {
      console.log("Deletando orçamento:", budget.id);
      const { error } = await supabase
        .from('budget_requests')
        .delete()
        .eq('id', budget.id);

      if (error) {
        console.error('Erro ao deletar orçamento:', error);
        throw error;
      }

      toast.success('Orçamento removido com sucesso');
      onDelete();
    } catch (error) {
      console.error('Erro ao deletar orçamento:', error);
      toast.error('Erro ao remover orçamento');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{budget.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p><strong>Email:</strong> {budget.email}</p>
        {budget.phone && <p><strong>Telefone:</strong> {budget.phone}</p>}
        <p><strong>Mensagem:</strong></p>
        <p className="whitespace-pre-wrap">{budget.message}</p>
        <p><strong>Status:</strong> {budget.status}</p>
        <p><strong>Data:</strong> {new Date(budget.created_at).toLocaleDateString()}</p>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        {budget.status !== 'Concluído' && (
          <Button onClick={handleStatusChange} variant="outline">
            Marcar como Concluído
          </Button>
        )}
        <Button onClick={handleDelete} variant="destructive">
          Excluir
        </Button>
      </CardFooter>
    </Card>
  );
}