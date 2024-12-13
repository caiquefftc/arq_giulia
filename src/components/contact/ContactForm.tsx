import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";

interface ContactFormProps {
  form: UseFormReturn<any>;
  onSubmit: (values: any) => void;
  isSubmitting?: boolean;
}

export function ContactForm({ form, onSubmit, isSubmitting }: ContactFormProps) {
  return (
    <div className="bg-white p-4 md:p-8 rounded-lg shadow-lg">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">Envie uma Mensagem</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome *</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input placeholder="Seu nome completo" {...field} className="pr-10" />
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
                    <Input placeholder="exemplo@email.com" {...field} className="pr-10" />
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
            name="assunto"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Assunto *</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input placeholder="Assunto da mensagem" {...field} className="pr-10" />
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
            name="mensagem"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mensagem *</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Textarea
                      placeholder="Digite sua mensagem..."
                      className="min-h-[120px] pr-10"
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

          <Button 
            type="submit" 
            className="w-full" 
            style={{ backgroundColor: '#420030' }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
          </Button>
        </form>
      </Form>
    </div>
  );
}