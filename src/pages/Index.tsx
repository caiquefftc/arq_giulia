import { ProjectCard } from "@/components/ProjectCard";
import { Link } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useState } from "react";
import Autoplay from "embla-carousel-autoplay";

const projects = [
  {
    title: "Casa Moderna",
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742",
    description: "Design contemporâneo com elementos sustentáveis. Projeto residencial que integra conforto e modernidade.",
    id: "casa-moderna"
  },
  {
    title: "Edifício Comercial",
    image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716",
    description: "Espaço corporativo com integração à natureza. Ambiente de trabalho que promove bem-estar e produtividade.",
    id: "edificio-comercial"
  },
  {
    title: "Residência Minimalista",
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86",
    description: "Simplicidade e elegância em harmonia. Design clean que maximiza espaços e luz natural.",
    id: "residencia-minimalista"
  }
];

const carouselImages = [
  {
    url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    alt: "Arquitetura Moderna"
  },
  {
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    alt: "Design Interior"
  },
  {
    url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    alt: "Espaço Contemporâneo"
  }
];

export default function Index() {
  const plugin = useState(() => Autoplay({ delay: 5000 }))[0];

  return (
    <>
      <section className="relative h-[50vh] md:h-[60vh] lg:h-[70vh]">
        <Carousel plugins={[plugin]} className="w-full h-full">
          <CarouselContent className="h-full">
            {carouselImages.map((image, index) => (
              <CarouselItem key={index} className="h-full">
                <div className="relative w-full h-full">
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white p-4">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 text-center">
            Arquitetura que Inspira
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-center max-w-2xl px-4">
            Transformando sonhos em espaços únicos e funcionais
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 px-4 bg-gray-50" id="projetos">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center">Nossos Projetos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project) => (
              <div key={project.id} className="w-full">
                <Link to={`/projetos#${project.id}`}>
                  <ProjectCard {...project} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}