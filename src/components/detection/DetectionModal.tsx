import { useState, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload, X, Loader2, AlertTriangle, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Disease {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface DetectionModalProps {
  disease: Disease | null;
  onClose: () => void;
}

type RiskLevel = "low" | "medium" | "high" | null;

interface AnalysisResult {
  riskLevel: RiskLevel;
  label: string;
  confidence: string;
}

export function DetectionModal({ disease, onClose }: DetectionModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = useCallback((selectedFile: File | null) => {
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setResult(null);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    handleFileChange(droppedFile);
  }, [handleFileChange]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const simulateAnalysis = useCallback(() => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis with random result
    setTimeout(() => {
      const riskLevels: RiskLevel[] = ["low", "medium", "high"];
      const randomRisk = riskLevels[Math.floor(Math.random() * riskLevels.length)];
      
      const results: Record<NonNullable<RiskLevel>, AnalysisResult> = {
        low: {
          riskLevel: "low",
          label: "Lower Risk Pattern Detected",
          confidence: "High",
        },
        medium: {
          riskLevel: "medium",
          label: "Moderate Risk Pattern Detected",
          confidence: "Medium",
        },
        high: {
          riskLevel: "high",
          label: "Higher Risk Pattern Detected",
          confidence: "High",
        },
      };

      setResult(results[randomRisk!]);
      setIsAnalyzing(false);
    }, 2500);
  }, []);

  const resetModal = useCallback(() => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setIsAnalyzing(false);
  }, []);

  const handleClose = () => {
    resetModal();
    onClose();
  };

  const getRiskColor = (level: RiskLevel) => {
    switch (level) {
      case "low":
        return "text-success";
      case "medium":
        return "text-warning";
      case "high":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  const getRiskBg = (level: RiskLevel) => {
    switch (level) {
      case "low":
        return "bg-success/20 border-success/30";
      case "medium":
        return "bg-warning/20 border-warning/30";
      case "high":
        return "bg-destructive/20 border-destructive/30";
      default:
        return "bg-muted";
    }
  };

  const getRiskIcon = (level: RiskLevel) => {
    switch (level) {
      case "low":
        return CheckCircle;
      case "medium":
        return AlertCircle;
      case "high":
        return AlertTriangle;
      default:
        return AlertCircle;
    }
  };

  return (
    <Dialog open={!!disease} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg glass">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl">
            <span className="text-2xl">{disease?.icon}</span>
            {disease?.title} Detection
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Upload Area */}
          {!preview && (
            <div
              className={cn(
                "border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer",
                isDragging
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50 hover:bg-primary/5"
              )}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => document.getElementById("file-input")?.click()}
            >
              <input
                id="file-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
              />
              
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/20 flex items-center justify-center">
                <Upload className="w-8 h-8 text-primary" />
              </div>
              
              <p className="font-medium mb-1">Drop your image here</p>
              <p className="text-sm text-muted-foreground">or click to browse</p>
              <p className="text-xs text-muted-foreground mt-2">
                Supports: PNG, JPG, JPEG
              </p>
            </div>
          )}

          {/* Preview */}
          {preview && (
            <div className="relative">
              <img
                src={preview}
                alt="Upload preview"
                className="w-full h-48 object-cover rounded-xl"
              />
              <Button
                size="icon"
                variant="destructive"
                className="absolute top-2 right-2 w-8 h-8"
                onClick={resetModal}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* Analyze Button */}
          {preview && !result && (
            <Button
              className="w-full btn-glow bg-gradient-to-r from-primary to-accent text-primary-foreground"
              onClick={simulateAnalysis}
              disabled={isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing Image...
                </>
              ) : (
                "Analyze Image"
              )}
            </Button>
          )}

          {/* Analysis Progress */}
          {isAnalyzing && (
            <div className="space-y-3">
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-accent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
              </div>
              <p className="text-sm text-center text-muted-foreground">
                AI model processing medical image patterns...
              </p>
            </div>
          )}

          {/* Results */}
          {result && (
            <div className="space-y-4 animate-fade-in">
              <div className={cn("p-4 rounded-xl border", getRiskBg(result.riskLevel))}>
                <div className="flex items-center gap-3 mb-3">
                  {(() => {
                    const Icon = getRiskIcon(result.riskLevel);
                    return <Icon className={cn("w-6 h-6", getRiskColor(result.riskLevel))} />;
                  })()}
                  <span className={cn("font-semibold", getRiskColor(result.riskLevel))}>
                    {result.label}
                  </span>
                </div>
                
                {/* Confidence Level */}
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">Confidence Level:</span>
                  <div className="flex gap-1">
                    {["Low", "Medium", "High"].map((level, i) => (
                      <div
                        key={level}
                        className={cn(
                          "w-8 h-2 rounded-full transition-colors",
                          i <= ["Low", "Medium", "High"].indexOf(result.confidence)
                            ? "bg-primary"
                            : "bg-muted"
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">{result.confidence}</span>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="p-3 rounded-lg bg-warning/10 border border-warning/20">
                <p className="text-xs text-muted-foreground text-center">
                  <AlertTriangle className="w-3 h-3 inline mr-1 text-warning" />
                  AI-generated output for informational purposes only. 
                  Please consult a medical professional.
                </p>
              </div>

              {/* Try Again Button */}
              <Button
                variant="outline"
                className="w-full"
                onClick={resetModal}
              >
                Analyze Another Image
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
