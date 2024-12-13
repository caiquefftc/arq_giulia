import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  image: string;
  description: string;
  className?: string;
  onClick?: () => void;
}

export function ProjectCard({ title, image, description, className, onClick }: ProjectCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)} onClick={onClick}>
      <CardContent className="p-0">
        <div className="relative">
          <img
            src={image}
            alt={title}
            className="w-full h-[200px] sm:h-[250px] md:h-[300px] object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white p-4 md:p-6">
            <h3 className="text-lg md:text-xl font-semibold mb-2">{title}</h3>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg md:text-xl font-semibold mb-2">{title}</h3>
          <p className="text-sm md:text-base text-gray-600">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}