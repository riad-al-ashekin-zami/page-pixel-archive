import conceptImage from "@/assets/lumafern-concept.jpg";
import medicalImage from "@/assets/velunara-concept.jpg";
import aestheticImage from "@/assets/aevorielle-concept.jpg";
import groupImage from "@/assets/calderwyn-concept.jpg";

/** Display only reviewed examples; no third-party screenshots or implied clients. */
export const HOMEPAGE_EXAMPLES = [
  { name: "LumaFern Skin Studio", kind: "concept" as const, image: conceptImage, descriptionKey: "studio" },
  { name: "Velunara Skin Clinic", kind: "concept" as const, image: medicalImage, descriptionKey: "medical" },
  { name: "Aevorielle Aesthetic Dermatology", kind: "concept" as const, image: aestheticImage, descriptionKey: "aesthetic" },
  { name: "Calderwyn Dermatology Group", kind: "concept" as const, image: groupImage, descriptionKey: "group" },
];