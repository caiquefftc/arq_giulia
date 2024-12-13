import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/admin");
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        navigate("/admin");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Login Administrativo</h1>
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
      </Card>
    </div>
  );
}