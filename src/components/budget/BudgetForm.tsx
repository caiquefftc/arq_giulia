import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const formSchema = z.object({
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  telefone: z.string().min(10, "Telefone deve ter pelo menos 10 dígitos"),
  tipo: z.string().min(2, "Tipo de projeto é obrigatório"),
  descricao: z.string().min(10, "Descrição deve ter pelo menos 10 caracteres"),
});

export function BudgetForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      email: "",
      telefone: "",
      tipo: "",
      descricao: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log("Enviando orçamento:", values);
      
      const { error } = await supabase
        .from('budget_requests')
        .insert({
          name: values.nome,
          email: values.email,
          phone: values.telefone,
          message: `Tipo: ${values.tipo}\n\nDescrição: ${values.descricao}`,
        });

      if (error) throw error;

      toast.success("Orçamento enviado com sucesso!");
      form.reset();
    } catch (error) {
      console.error("Erro ao enviar orçamento:", error);
      toast.error("Erro ao enviar orçamento. Tente novamente.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome *</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input placeholder="Seu nome completo" {...field} />
                </FormControl>
                {field.value && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => field.onChange("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email *</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input placeholder="seu@email.com" {...field} />
                </FormControl>
                {field.value && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => field.onChange("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="telefone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone *</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input placeholder="(00) 00000-0000" {...field} />
                </FormControl>
                {field.value && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => field.onChange("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tipo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Projeto *</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input placeholder="Ex: Residencial, Comercial, Reforma..." {...field} />
                </FormControl>
                {field.value && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => field.onChange("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="descricao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição do Projeto *</FormLabel>
              <div className="relative">
                <FormControl>
                  <Textarea
                    placeholder="Descreva os detalhes do seu projeto..."
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                {field.value && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-2 hover:bg-transparent"
                    onClick={() => field.onChange("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Enviar Solicitação
        </Button>
      </form>
    </Form>
  );
}