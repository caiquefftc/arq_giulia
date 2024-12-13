import { Instagram, MessageCircle } from "lucide-react";

export function ContactInfo() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">Informações de Contato</h2>
      <div className="space-y-6">
        <div className="flex items-start space-x-4">
          <MessageCircle className="w-6 h-6" style={{ color: '#420030' }} />
          <div>
            <h3 className="font-semibold">WhatsApp</h3>
            <a 
              href="https://wa.me/24999464008" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[#420030]"
            >
              (24) 99946-4008
            </a>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <Instagram className="w-6 h-6" style={{ color: '#420030' }} />
          <div>
            <h3 className="font-semibold">Instagram</h3>
            <a 
              href="https://www.instagram.com/arq.giuliacardozo/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[#420030]"
            >
              @arq.giuliacardozo
            </a>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="font-semibold mb-4">Horário de Atendimento</h3>
          <div className="space-y-2 text-gray-600">
            <p>Segunda: 9h às 18h</p>
            <p>Terça: 9h às 18h</p>
            <p>Quarta: 9h às 18h</p>
            <p>Quinta: 9h às 18h</p>
            <p>Sexta: 9h às 18h</p>
          </div>
        </div>
      </div>
    </div>
  );
}