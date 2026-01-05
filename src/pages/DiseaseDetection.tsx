import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { DiseaseCard } from "@/components/detection/DiseaseCard";
import { DetectionModal } from "@/components/detection/DetectionModal";
import { Sparkles } from "lucide-react";

const diseases = [
  {
    id: "lung-cancer",
    title: "Lung Cancer",
    description: "AI-based analysis of chest X-rays and CT scans for lung disease risk patterns.",
    icon: "🫁",
  },
  {
    id: "brain-tumor",
    title: "Brain Tumor",
    description: "MRI image analysis to identify abnormal brain tissue patterns.",
    icon: "🧠",
  },
  {
    id: "tuberculosis",
    title: "Tuberculosis",
    description: "Chest X-ray analysis to assist in tuberculosis risk screening.",
    icon: "🔬",
  },
  {
    id: "blood-cancer",
    title: "Blood Cancer",
    description: "Lab report and blood image pattern analysis for hematological risk indicators.",
    icon: "🩸",
  },
  {
    id: "breast-cancer",
    title: "Breast Cancer",
    description: "Mammography image analysis for early-stage risk assessment.",
    icon: "💗",
  },
  {
    id: "skin-cancer",
    title: "Skin Cancer",
    description: "Dermatological image analysis for skin lesion risk evaluation.",
    icon: "🔎",
  },
];

export default function DiseaseDetection() {
  const [selectedDisease, setSelectedDisease] = useState<typeof diseases[0] | null>(null);

  return (
    <Layout>
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI Analysis Models</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              AI Disease <span className="text-gradient">Detection Models</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Select a disease category to upload medical images for AI-powered risk analysis. 
              Results are for educational and research purposes only.
            </p>
          </div>

          {/* Disease Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {diseases.map((disease, index) => (
              <DiseaseCard
                key={disease.id}
                disease={disease}
                index={index}
                onClick={() => setSelectedDisease(disease)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Detection Modal */}
      <DetectionModal
        disease={selectedDisease}
        onClose={() => setSelectedDisease(null)}
      />
    </Layout>
  );
}
