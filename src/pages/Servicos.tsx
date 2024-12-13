import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const servicos = [
  {
    titulo: "Projeto Arquitetônico",
    descricao: "Desenvolvimento completo de projetos residenciais, comerciais e industriais.",
    imagem: "https://images.unsplash.com/photo-1503387762-592deb58ef4e",
    exemplos: ["Residências", "Edifícios Comerciais", "Centros Empresariais"],
    detalhes: "Nossos projetos arquitetônicos são desenvolvidos com foco na funcionalidade, estética e sustentabilidade, sempre respeitando as necessidades e desejos dos nossos clientes."
  },
  {
    titulo: "Design de Interiores",
    descricao: "Criação de ambientes funcionais e esteticamente harmoniosos.",
    imagem: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6",
    exemplos: ["Decoração", "Mobiliário", "Iluminação"],
    detalhes: "Transformamos espaços em ambientes únicos, combinando funcionalidade e beleza para criar interiores que refletem a personalidade de cada cliente."
  },
  {
    titulo: "Consultoria Técnica",
    descricao: "Assessoria especializada em todas as fases do projeto.",
    imagem: "https://images.unsplash.com/photo-1664575602554-2087b04935a5",
    exemplos: ["Análise de Viabilidade", "Legislação", "Sustentabilidade"],
    detalhes: "Oferecemos suporte técnico especializado para garantir que seu projeto seja executado com excelência, seguindo todas as normas e regulamentações."
  },
  {
    titulo: "Reforma e Retrofit",
    descricao: "Modernização e adaptação de espaços existentes.",
    imagem: "https://images.unsplash.com/photo-1503594384566-461fe158e797",
    exemplos: ["Renovação", "Ampliação", "Restauração"],
    detalhes: "Especializados em dar nova vida a espaços existentes, combinando elementos modernos com a estrutura original para criar ambientes renovados e funcionais."
  }
];

export default function Servicos() {
  const [selectedService, setSelectedService] = useState<typeof servicos[0] | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Nossos Serviços</h1>
        <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
          Oferecemos soluções completas em arquitetura e design, com foco na qualidade e satisfação dos nossos clientes.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {servicos.map((servico, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg overflow-hidden shadow-lg cursor-pointer"
              onClick={() => setSelectedService(servico)}
            >
              <div className="relative">
                <img
                  src={servico.imagem}
                  alt={servico.titulo}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white p-6">
                  <h3 className="text-xl font-semibold mb-2">{servico.titulo}</h3>
                  <p className="text-sm text-center">{servico.descricao}</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-4">{servico.titulo}</h3>
                <p className="text-gray-600 mb-4">{servico.descricao}</p>
                <div className="space-y-2">
                  <h4 className="font-semibold">Exemplos:</h4>
                  <ul className="list-disc list-inside text-gray-600">
                    {servico.exemplos.map((exemplo, idx) => (
                      <li key={idx}>{exemplo}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="max-w-3xl">
          {selectedService && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedService.titulo}</DialogTitle>
              </DialogHeader>
              <div className="mt-4">
                <img
                  src={selectedService.imagem}
                  alt={selectedService.titulo}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <p className="text-gray-700 mb-4">{selectedService.detalhes}</p>
                <div className="space-y-2">
                  <h4 className="font-semibold">Serviços inclusos:</h4>
                  <ul className="list-disc list-inside text-gray-600">
                    {selectedService.exemplos.map((exemplo, idx) => (
                      <li key={idx}>{exemplo}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}