// Seed data used only when no Supabase project is connected and
// localStorage is still empty (first run / demo mode). Everything here
// is explicitly labeled as a sample so it's never mistaken for a real
// client or a real shipped project.

export const sampleTeam = [
  {
    id: "raditia",
    name: "Raditia",
    role: "Team Leader & Programmer",
    bio: "Raditia berperan sebagai leader sekaligus programmer utama yang bertanggung jawab dalam mengatur jalannya project, mengembangkan sistem, serta memastikan setiap bagian project dapat berjalan dengan baik.",
    skills: ["Java", "C++", "Python", "Programming", "System Development", "Problem Solving", "Team Leadership"],
    avatar: "",
  },
  {
    id: "syahdan",
    name: "Syahdan",
    role: "Backend & System Specialist",
    bio: "Syahdan berfokus pada bagian backend dan sistem di belakang layar. Ia bertugas memastikan bagaimana sebuah sistem bekerja, memproses data, dan menghubungkan berbagai fitur agar dapat berjalan dengan baik.",
    skills: ["Backend Development", "System Architecture", "API", "Database", "Logic System", "Server-side Development"],
    avatar: "",
  },
  {
    id: "fatiha",
    name: "Fatiha",
    role: "Creative Designer & Visual Concept",
    bio: "Fatiha bertanggung jawab dalam sisi kreatif dan visual. Ia membantu menerjemahkan ide menjadi konsep desain yang menarik, menentukan tema, warna, layout, dan pengalaman visual agar project terlihat profesional serta nyaman digunakan.",
    skills: ["UI/UX Design", "Graphic Design", "Visual Concept", "Branding", "Color Theory", "Layout Design", "Creative Direction"],
    avatar: "",
  },
];

export const sampleProjects = [
  {
    id: "sample-1",
    name: "School Event Landing Page (Sample)",
    description:
      "Contoh struktur landing page satu halaman untuk event sekolah — dibuat untuk menunjukkan tata letak, bukan project client sungguhan.",
    category: "Website",
    technology: ["React", "Tailwind CSS"],
    demoUrl: "",
    sourceUrl: "",
    status: "Sample",
    thumbnail: "",
    isSample: true,
  },
  {
    id: "sample-2",
    name: "Telegram Utility Bot (Sample)",
    description:
      "Contoh struktur kartu project untuk bot Telegram — placeholder untuk menunjukkan bagaimana project kategori Bot akan tampil.",
    category: "Bot",
    technology: ["Node.js", "Grammy"],
    demoUrl: "",
    sourceUrl: "",
    status: "Sample",
    thumbnail: "",
    isSample: true,
  },
];

export const sampleProofs = [];

export const sampleSocial = {
  school: {},
  team: {},
};
