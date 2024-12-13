import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type ProjectType = "Projeto Residencial" | "Projeto Comercial" | "Consultoria Residencial" | "Consultoria Comercial";

const projectTypes: ProjectType[] = [
  "Projeto Residencial",
  "Projeto Comercial",
  "Consultoria Residencial",
  "Consultoria Comercial"
];

interface ProjectTypeSelectProps {
  value: string;
  onChange: (value: ProjectType) => void;
}

export function ProjectTypeSelect({ value, onChange }: ProjectTypeSelectProps) {
  return (
    <Select value={value} onValueChange={(value) => onChange(value as ProjectType)}>
      <SelectTrigger>
        <SelectValue placeholder="Tipo do Projeto" />
      </SelectTrigger>
      <SelectContent>
        {projectTypes.map((type) => (
          <SelectItem key={type} value={type}>
            {type}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}