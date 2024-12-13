import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { LogIn, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

export function LoginModal() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      if (session) {
        setOpen(false);
        
        // Fetch user profile to determine role
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();

        if (profile) {
          // Redirect based on role
          if (profile.role === 'ADMIN') {
            navigate('/admin');
          } else {
            navigate('/client');
          }
        }

        toast({
          title: "Login realizado com sucesso!",
          description: "Bem-vindo(a) de volta!",
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [toast, navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logout realizado com sucesso!",
      description: "Até logo!",
    });
    navigate("/");
  };

  if (session) {
    return (
      <Button 
        variant="ghost"
        className="bg-[#f9e616] text-white hover:bg-[#f9e616]/90 flex items-center gap-2"
        onClick={handleLogout}
      >
        <LogOut className="h-4 w-4" />
        Sair
      </Button>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost"
          className="bg-[#f9e616] text-white hover:bg-[#f9e616]/90 flex items-center gap-2"
        >
          <LogIn className="h-4 w-4" />
          Login
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
        </DialogHeader>
        <Auth
          supabaseClient={supabase}
          appearance={{ 
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#420030',
                  brandAccent: '#420030',
                }
              }
            }
          }}
          localization={{
            variables: {
              sign_in: {
                email_label: "Email",
                password_label: "Senha",
                button_label: "Entrar",
                loading_button_label: "Entrando...",
                email_input_placeholder: "seu@email.com",
                password_input_placeholder: "Sua senha",
                link_text: "Já tem uma conta? Entre"
              },
              sign_up: {
                email_label: "Email",
                password_label: "Senha",
                button_label: "Criar conta",
                loading_button_label: "Criando conta...",
                email_input_placeholder: "seu@email.com",
                password_input_placeholder: "Sua senha",
                link_text: "Não tem uma conta? Cadastre-se"
              }
            }
          }}
          theme="light"
          providers={[]}
        />
      </DialogContent>
    </Dialog>
  );
}