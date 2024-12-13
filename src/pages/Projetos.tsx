import { ProjectCard } from "@/components/ProjectCard";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

const projects = [
  {
    title: "Casa Moderna",
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742",
    description: "Design contemporâneo com elementos sustentáveis. Projeto residencial que integra conforto e modernidade.",
    id: "casa-moderna",
    details: "Uma residência moderna que combina sustentabilidade e conforto. O projeto inclui painéis solares, sistema de reuso de água e materiais ecológicos.",
    images: [
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
    ]
  },
  {
    title: "Edifício Comercial",
    image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716",
    description: "Espaço corporativo com integração à natureza. Ambiente de trabalho que promove bem-estar e produtividade.",
    id: "edificio-comercial",
    details: "Um complexo comercial que prioriza o bem-estar dos colaboradores. Áreas verdes integradas, iluminação natural e espaços de convivência fazem parte do projeto.",
    images: [
      "https://images.unsplash.com/photo-1433086966358-54859d0ed716",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
      "https://images.unsplash.com/photo-1497366216548-37526070297c"
    ]
  },
  {
    title: "Residência Minimalista",
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86",
    description: "Simplicidade e elegância em harmonia. Design clean que maximiza espaços e luz natural.",
    id: "residencia-minimalista",
    details: "Uma casa que celebra a simplicidade e funcionalidade. Ambientes integrados, mobiliário sob medida e aproveitamento máximo da luz natural caracterizam este projeto.",
    images: [
      "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86",
      "https://images.unsplash.com/photo-1449844908441-8829872d2607",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0"
    ]
  }
];

export default function Projetos() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Nossos Projetos</h1>
        <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
          Explore nossa coleção de projetos arquitetônicos, cada um refletindo nossa dedicação à excelência
          e inovação no design de espaços únicos.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} id={project.id} onClick={() => setSelectedProject(project)}>
              <ProjectCard {...project} className="cursor-pointer" />
            </div>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-4xl">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedProject.title}</DialogTitle>
              </DialogHeader>
              <div className="mt-4">
                <Carousel className="w-full">
                  <CarouselContent>
                    {selectedProject.images.map((image, index) => (
                      <CarouselItem key={index}>
                        <img
                          src={image}
                          alt={`${selectedProject.title} - Imagem ${index + 1}`}
                          className="w-full h-64 object-cover rounded-lg"
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
                <div className="mt-4 space-y-4">
                  <p className="text-gray-600">{selectedProject.description}</p>
                  <p className="text-gray-800">{selectedProject.details}</p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}