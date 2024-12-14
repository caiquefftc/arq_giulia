import { Card, CardContent } from "@/components/ui/card";

export default function SobreNos() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-12 text-center">Sobre Nós</h1>
        
        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <img
                    src="https://github.com/caiquefftc/arq_giulia/blob/main/imgs/sobrenos.jpg?raw=true"
                    alt="Arquiteto"
                    className="w-full h-[400px] object-cover rounded-lg"
                  />
                </div>
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold">Giulia Cardozo</h2>
                  <p className="text-gray-600 leading-relaxed">
                    Com mais de 2 anos de experiência em arquitetura e design de interiores, 
                    nossa missão é transformar espaços em ambientes únicos que reflitam a 
                    personalidade e necessidades de cada cliente.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Especializada em projetos residenciais e comerciais, nossa abordagem 
                    combina criatividade, funcionalidade e sustentabilidade para criar 
                    ambientes harmoniosos e acolhedores.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Cada projeto é desenvolvido com dedicação e atenção aos detalhes, 
                    garantindo que o resultado final supere as expectativas dos nossos clientes.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}