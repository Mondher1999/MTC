import { Brain, Target, Leaf, Heart } from "lucide-react"

export const courses = [
  {
    name: "Fondements Théoriques MTC",
    icon: <Brain className="text-primary" />,
    description: "Principes fondamentaux de la médecine traditionnelle chinoise",
    category: "Théorie",
    progress: 0,
    duration: "8 semaines",
    instructor: "Dr. Li Wei",
    students: 52,
  },
  {
    name: "Acupuncture Clinique",
    icon: <Target className="text-secondary" />,
    description: "Techniques d'acupuncture et applications pratiques",
    category: "Pratique",
    progress: 0,
    duration: "12 semaines",
    instructor: "Dr. Zhang Ming",
    students: 56,
  },
  {
    name: "Pharmacopée Chinoise",
    icon: <Leaf className="text-accent" />,
    description: "Phytothérapie et préparations traditionnelles",
    category: "Pharmacologie",
    progress: 0,
    duration: "10 semaines",
    instructor: "Dr. Wang Hua",
    students: 42,
  },
  {
    name: "Diététique Énergétique",
    icon: <Heart className="text-chart-4" />,
    description: "Nutrition selon les principes de la MTC",
    category: "Nutrition",
    progress: 0,
    duration: "6 semaines",
    instructor: "Dr. Chen Lu",
    students: 35,
  },
]

export const recentLessons = [
  {
    title: "Les Cinq Éléments en MTC",
    course: "Fondements Théoriques",
    duration: "45 min",
    completed: true,
    date: "Il y a 2 jours",
  },
  {
    title: "Points d'Acupuncture Essentiels",
    course: "Acupuncture Clinique",
    duration: "60 min",
    completed: false,
    date: "Hier",
  },
  {
    title: "Diagnostic par la Langue",
    course: "Fondements Théoriques",
    duration: "30 min",
    completed: true,
    date: "Il y a 3 jours",
  },
]

export const upcomingEvents = [
  {
    title: "Webinaire: Cas Cliniques en MTC",
    date: "25 Mai 2025",
    time: "14:00 - 16:00",
    instructor: "Dr. Li Wei",
    participants: 120,
  },
  {
    title: "Atelier Pratique: Moxibustion",
    date: "2 Juin 2025",
    time: "10:00 - 12:00",
    instructor: "Dr. Zhang Ming",
    participants: 30,
  },
  {
    title: "Conférence: Intégration MTC-Médecine Moderne",
    date: "15 Juin 2025",
    time: "16:00 - 18:00",
    instructor: "Dr. Wang Hua",
    participants: 200,
  },
]
