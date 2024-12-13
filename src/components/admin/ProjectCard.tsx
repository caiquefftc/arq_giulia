import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string | null;
  project_type: string;
  status: string;
}

interface ProjectCardProps {
  project: Project;
  onEdit: () => void;
  onDelete: () => void;
}

export function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps) {
  const getStatusColor = (status: string) => {
    return status === "Em andamento" ? "bg-green-500" : "bg-red-500";
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">{project.title}</h3>
              <div className={`w-2 h-2 rounded-full ${getStatusColor(project.status)}`} />
            </div>
            <p className="text-sm text-gray-500">{project.project_type}</p>
            {project.description && (
              <p className="text-sm text-gray-600">{project.description}</p>
            )}
            <p className="text-sm font-medium">Status: {project.status}</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={onEdit}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={onDelete}
              className="text-red-500 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}