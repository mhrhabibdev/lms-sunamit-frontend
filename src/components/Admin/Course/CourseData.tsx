"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "sonner";

type Props = {
  berifits: { title: string }[];
  setBerifits: React.Dispatch<React.SetStateAction<{ title: string }[]>>;
  prerequisites: { title: string }[];
  setPrerequisites: React.Dispatch<React.SetStateAction<{ title: string }[]>>;
  active: number;
  setActive: (active: number) => void;
};

export default function CourseData({
  berifits,
  setBerifits,
  prerequisites,
  setPrerequisites,
  active,
  setActive,
}: Props) {
  const handleNext = () => {
    // Validate benefits
    const hasEmptyBenefits = berifits.some((item) => !item.title.trim());
    if (hasEmptyBenefits) {
      toast.error("Please fill in all benefit fields");
      return;
    }

    // Validate prerequisites
    const hasEmptyPrerequisites = prerequisites.some(
      (item) => !item.title.trim()
    );
    if (hasEmptyPrerequisites) {
      toast.error("Please fill in all prerequisite fields");
      return;
    }

    // Check if we have at least one benefit and one prerequisite
    if (berifits.length === 0) {
      toast.error("Please add at least one benefit");
      return;
    }

    if (prerequisites.length === 0) {
      toast.error("Please add at least one prerequisite");
      return;
    }

    // Proceed to next step
    setActive(active + 1);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white shadow-md rounded-xl p-6">
      <h1 className="text-2xl font-semibold mb-8 text-center">Course Data</h1>

      {/* Benefits Section */}
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-4">
          What will students learn in your course?
        </h2>
        <div className="space-y-3">
          {berifits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                value={benefit.title}
                onChange={(e) => {
                  const newBenifits = [...berifits];
                  newBenifits[index].title = e.target.value;
                  setBerifits(newBenifits);
                }}
                placeholder={`Benefit ${index + 1}`}
              />
              {berifits.length > 1 && (
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => {
                    const newBenifits = berifits.filter((_, i) => i !== index);
                    setBerifits(newBenifits);
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
        <Button
          type="button"
          className="mt-3"
          onClick={() => setBerifits([...berifits, { title: "" }])}
        >
          <Plus className="w-4 h-4 mr-2" /> Add Benefit
        </Button>
      </div>

      {/* Prerequisites Section */}
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-4">
          What are the prerequisites for your course?
        </h2>
        <div className="space-y-3">
          {prerequisites.map((prerequisite, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                value={prerequisite.title}
                onChange={(e) => {
                  const newPrerequisites = [...prerequisites];
                  newPrerequisites[index].title = e.target.value;
                  setPrerequisites(newPrerequisites);
                }}
                placeholder={`Prerequisite ${index + 1}`}
              />
              {prerequisites.length > 1 && (
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => {
                    const newPrerequisites = prerequisites.filter(
                      (_, i) => i !== index
                    );
                    setPrerequisites(newPrerequisites);
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
        <Button
          type="button"
          className="mt-3"
          onClick={() => setPrerequisites([...prerequisites, { title: "" }])}
        >
          <Plus className="w-4 h-4 mr-2" /> Add Prerequisite
        </Button>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={() => setActive(active - 1)}
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Previous
        </Button>
        <Button
          type="button"
          onClick={handleNext}
          disabled={
            berifits.length === 0 ||
            prerequisites.length === 0 ||
            berifits.some((item) => !item.title.trim()) ||
            prerequisites.some((item) => !item.title.trim())
          }
        >
          Next <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
