import { Code, Brain, Shield, Cloud, Users, Award } from 'lucide-react';

// Skills data structure with consistent formatting
export const skillTree = {
  en: {
    name: "Skills",
    children: [
      {
        name: "Technical",
        icon: Code,
        children: [
          {
            name: "Programming",
            icon: Code,
            children: [
              { name: "Python", level: 5 },
              { name: "C/C++", level: 4 },
              { name: "Rust", level: 2 }
            ]
          },
          {
            name: "AI & Data",
            icon: Brain,
            children: [
              { name: "RAG Architecture", level: 5 },
              { name: "LLM", level: 5 },
              { name: "Data Engineering", level: 5 }
            ]
          },
          {
            name: "Web & Mobile",
            icon: Shield,
            children: [
              { name: "React", level: 3 },
              { name: "React Native", level: 3 }
            ]
          },
          {
            name: "Cloud",
            icon: Cloud,
            children: [
              { name: "AWS", level: 4 },
              { name: "Serverless", level: 3 }
            ]
          }
        ]
      },
      {
        name: "Soft Skills",
        icon: Users,
        children: [
          {
            name: "Professional",
            icon: Award,
            children: [
              { name: "Problem Solving", level: 4 },
              { name: "Communication", level: 4 },
              { name: "Teamwork", level: 4 },
              { name: "Adaptability", level: 5 }
            ]
          }
        ]
      }
    ]
  },
  fr: {
    name: "Compétences",
    children: [
      {
        name: "Technique",
        icon: Code,
        children: [
          {
            name: "Programmation",
            icon: Code,
            children: [
              { name: "Python", level: 5 },
              { name: "C/C++", level: 4 },
              { name: "Rust", level: 2 }
            ]
          },
          {
            name: "IA & Données",
            icon: Brain,
            children: [
              { name: "Architecture RAG", level: 5 },
              { name: "LLM", level: 5 },
              { name: "Ingénierie des Données", level: 5 }
            ]
          },
          {
            name: "Web & Mobile",
            icon: Shield,
            children: [
              { name: "React", level: 3 },
              { name: "React Native", level: 3 }
            ]
          },
          {
            name: "Cloud",
            icon: Cloud,
            children: [
              { name: "AWS", level: 4 },
              { name: "Serverless", level: 3 }
            ]
          }
        ]
      },
      {
        name: "Compétences Humaines",
        icon: Users,
        children: [
          {
            name: "Professionnel",
            icon: Award,
            children: [
              { name: "Résolution de Problèmes", level: 4 },
              { name: "Communication", level: 4 },
              { name: "Travail d'Équipe", level: 4 },
              { name: "Adaptabilité", level: 5 }
            ]
          }
        ]
      }
    ]
  }
};

// Category color themes
export const getCategoryColor = (category = "Skills Universe", lang = "en") => {
  const colors = {
    "Skills Universe": {
      primary: "#9333ea",
      secondary: "#7e22ce",
      glow: "rgba(147, 51, 234, 0.5)"
    },
    "Technical": {
      primary: "#6366f1",
      secondary: "#4f46e5",
      glow: "rgba(99, 102, 241, 0.5)"
    },
    "Technique": {
      primary: "#6366f1",
      secondary: "#4f46e5",
      glow: "rgba(99, 102, 241, 0.5)"
    },
    "Soft Skills": {
      primary: "#ec4899",
      secondary: "#db2777",
      glow: "rgba(236, 72, 153, 0.5)"
    },
    "Compétences Humaines": {
      primary: "#ec4899",
      secondary: "#db2777",
      glow: "rgba(236, 72, 153, 0.5)"
    },
    "Programming": {
      primary: "#3b82f6",
      secondary: "#2563eb",
      glow: "rgba(59, 130, 246, 0.5)"
    },
    "Programmation": {
      primary: "#3b82f6",
      secondary: "#2563eb",
      glow: "rgba(59, 130, 246, 0.5)"
    },
    "AI & Data": {
      primary: "#14b8a6",
      secondary: "#0d9488",
      glow: "rgba(20, 184, 166, 0.5)"
    },
    "IA & Données": {
      primary: "#14b8a6",
      secondary: "#0d9488",
      glow: "rgba(20, 184, 166, 0.5)"
    },
    "Web & Mobile": {
      primary: "#8b5cf6",
      secondary: "#7c3aed",
      glow: "rgba(139, 92, 246, 0.5)"
    },
    "Cloud": {
      primary: "#06b6d4",
      secondary: "#0891b2",
      glow: "rgba(6, 182, 212, 0.5)"
    },
    "Professional": {
      primary: "#f97316",
      secondary: "#ea580c",
      glow: "rgba(249, 115, 22, 0.5)"
    },
    "Professionnel": {
      primary: "#f97316",
      secondary: "#ea580c",
      glow: "rgba(249, 115, 22, 0.5)"
    }
  };
  
  const defaultColor = colors["Skills Universe"];

  try {
    if (category == null) {
      console.warn(`Catégorie null ou undefined, utilisation de la couleur par défaut (${lang})`);
      return defaultColor;
    }

    if (colors[category]) {
      return colors[category];
    }

    console.warn(`Couleur non trouvée pour la catégorie: "${category}" (${lang})`);
    return defaultColor;
  } catch (error) {
    console.error(`Erreur lors de la récupération de la couleur (${lang}):`, error);
    return defaultColor;
  }
};

export default skillTree;