import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { useState } from "react";

const formSchema = z.object({
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  assunto: z.string().min(2, "Assunto é obrigatório"),
  mensagem: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
});

export default function Contato() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      email: "",
      assunto: "",
      mensagem: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      console.log("Enviando mensagem:", values);
      
      const { error } = await supabase
        .from('contact_messages')
        .insert({
          name: values.nome,
          email: values.email,
          subject: values.assunto,
          message: values.mensagem,
          status: 'Não lido'
        });

      if (error) {
        console.error("Erro ao enviar mensagem:", error);
        throw error;
      }

      toast.success("Mensagem enviada com sucesso!");
      form.reset();
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      toast.error("Erro ao enviar mensagem. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 md:py-16 px-4">
        <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-8 text-center">Entre em Contato</h1>
        <p className="text-base md:text-lg text-gray-600 mb-8 md:mb-12 text-center max-w-3xl mx-auto">
          Estamos à disposição para atender suas necessidades e esclarecer suas dúvidas.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <ContactForm 
            form={form} 
            onSubmit={onSubmit} 
            isSubmitting={isSubmitting}
          />
          <ContactInfo />
        </div>
      </div>
    </div>
  );
}