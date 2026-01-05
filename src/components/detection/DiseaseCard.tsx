import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface Disease {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface DiseaseCardProps {
  disease: Disease;
  index: number;
  onClick: () => void;
}

export function DiseaseCard({ disease, index, onClick }: DiseaseCardProps) {
  return (
    <Card
      className="card-hover glow-border glass cursor-pointer group overflow-hidden animate-fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300 shrink-0">
            {disease.icon}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors flex items-center gap-2">
              {disease.title}
              <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary" />
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {disease.description}
            </p>
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="mt-4 h-1 rounded-full bg-gradient-to-r from-primary/0 via-primary/50 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </CardContent>
    </Card>
  );
}
