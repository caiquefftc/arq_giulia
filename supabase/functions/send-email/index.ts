import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const ADMIN_EMAIL = "giuliacardozo.arq@gmail.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  type: "contact" | "budget";
  name: string;
  email: string;
  subject?: string;
  message: string;
  phone?: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Function invoked: send-email");
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const emailRequest: EmailRequest = await req.json();
    console.log("Email request received:", emailRequest);

    let subject, html;

    if (emailRequest.type === "contact") {
      subject = `Nova mensagem de contato: ${emailRequest.subject}`;
      html = `
        <h2>Nova mensagem de contato recebida</h2>
        <p><strong>Nome:</strong> ${emailRequest.name}</p>
        <p><strong>Email:</strong> ${emailRequest.email}</p>
        <p><strong>Assunto:</strong> ${emailRequest.subject}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${emailRequest.message}</p>
      `;
    } else {
      subject = `Nova solicitação de orçamento de ${emailRequest.name}`;
      html = `
        <h2>Nova solicitação de orçamento recebida</h2>
        <p><strong>Nome:</strong> ${emailRequest.name}</p>
        <p><strong>Email:</strong> ${emailRequest.email}</p>
        <p><strong>Telefone:</strong> ${emailRequest.phone}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${emailRequest.message}</p>
      `;
    }

    console.log("Sending email to:", ADMIN_EMAIL);
    
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Arquitetura Site <onboarding@resend.dev>",
        to: [ADMIN_EMAIL],
        subject: subject,
        html: html,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      console.log("Email sent successfully:", data);
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } else {
      const error = await res.text();
      console.error("Error sending email:", error);
      return new Response(JSON.stringify({ error }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  } catch (error: any) {
    console.error("Error in send-email function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
};

serve(handler);