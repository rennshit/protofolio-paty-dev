import { getEnv } from "./env";

export const siteConfig = {
  school: {
    name: getEnv("VITE_SCHOOL_NAME", "SMK Respati 1"),
    logo: getEnv("VITE_SCHOOL_LOGO", "https://files.catbox.moe/enjfws.jpg"),
    social: {
      instagram: getEnv("VITE_SCHOOL_INSTAGRAM"),
      tiktok: getEnv("VITE_SCHOOL_TIKTOK"),
      youtube: getEnv("VITE_SCHOOL_YOUTUBE"),
      website: getEnv("VITE_SCHOOL_WEBSITE"),
    },
  },
  team: {
    name: getEnv("VITE_TEAM_NAME", "Respaty Dev"),
    logo: getEnv("VITE_TEAM_LOGO", "https://files.catbox.moe/iovyap.png"),
    tagline: "Building Ideas Into Digital Reality.",
    description:
      "Respaty Dev adalah tim kreatif dan developer yang dibangun oleh siswa SMK Respati 1. Kami menggabungkan kemampuan programming, backend system, design, dan ide kreatif untuk membuat berbagai project digital.",
    social: {
      instagram: getEnv("VITE_TEAM_INSTAGRAM"),
      tiktok: getEnv("VITE_TEAM_TIKTOK"),
      github: getEnv("VITE_TEAM_GITHUB"),
      discord: getEnv("VITE_TEAM_DISCORD"),
    },
  },
  owner: {
    name: getEnv("VITE_OWNER_NAME", "Respaty Dev"),
    whatsapp: getEnv("VITE_OWNER_WHATSAPP"),
    email: getEnv("VITE_OWNER_EMAIL"),
    instagram: getEnv("VITE_OWNER_INSTAGRAM"),
  },
  nav: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Team", href: "#team" },
    { label: "Projects", href: "#projects" },
    { label: "Proof", href: "#proof" },
    { label: "Contact", href: "#contact" },
  ],
  services: [
    {
      id: "website",
      icon: "Globe",
      title: "Website Development",
      description:
        "Pembuatan website modern, responsive, cepat, dan sesuai kebutuhan client.",
    },
    {
      id: "design",
      icon: "PenTool",
      title: "UI/UX & Graphic Design",
      description:
        "Pembuatan konsep visual, layout, interface, branding, dan desain digital yang menarik.",
    },
    {
      id: "bot",
      icon: "Bot",
      title: "Bot Development",
      description:
        "Pembuatan bot untuk automation, management, dan kebutuhan sistem tertentu.",
    },
    {
      id: "system",
      icon: "Layers",
      title: "Custom System",
      description:
        "Pembuatan sistem custom sesuai kebutuhan project dan client.",
    },
    {
      id: "automation",
      icon: "Workflow",
      title: "Automation",
      description:
        "Mengotomatisasi pekerjaan berulang menggunakan sistem dan teknologi.",
    },
  ],
  stats: [
    { label: "Team Members", value: "3" },
    { label: "Multiple Skills", value: "7+" },
    { label: "Custom Projects", value: "Growing" },
    { label: "Creative Solutions", value: "∞" },
  ],
};

export const whatsappLink = (message = "Halo Respaty Dev, saya ingin mendiskusikan sebuah project.") => {
  const number = siteConfig.owner.whatsapp?.replace(/[^0-9]/g, "");
  if (!number) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
};
