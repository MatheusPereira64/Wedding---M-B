export type NavId =
  | "inicio"
  | "historia"
  | "galeria"
  | "local"
  | "programacao"
  | "rsvp"
  | "presentes";

export type StoryMilestone = {
  year: string;
  title: string;
  text: string;
  photo: string;
};

export type GalleryImage = {
  src: string;
  alt: string;
  span: "normal" | "wide" | "tall";
};

export type ScheduleItem = {
  time: string;
  title: string;
  description: string;
  icon: "rings" | "cheers" | "dinner" | "music" | "sparkles";
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type RsvpPayload = {
  name: string;
  email: string;
  phone: string;
  attending: "yes" | "no";
  notes: string;
};

export const weddingData = {
  couple: {
    groom: {
      firstName: "Matheus",
      fullName: "Matheus Pereira",
      bio: "Com um sorriso fácil e o coração em Manaus, Matheus encontrou em Brena o seu lugar no mundo. Este é o começo de uma história que ele mal pode esperar para viver.",
      photo:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
    },
    bride: {
      firstName: "Brena",
      fullName: "Brena",
      bio: "Doce, determinada e cheia de luz, Brena transforma o cotidiano em celebração. Ao lado de Matheus, escolheu escrever o próximo capítulo com amor e elegância.",
      photo:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    },
  },

  names: "Matheus & Brena",
  headline: "Estamos escrevendo um novo capítulo da nossa história.",
  kicker: "Nosso grande dia",
  closingQuote:
    "Mal podemos esperar para celebrar esse momento ao lado de vocês.",

  dateISO: "2027-03-26T18:00:00-04:00",
  dateLabel: "26.03.2027",
  dateLong: "26 de março de 2027",
  timeLabel: "18:00",
  durationLabel: "5 horas",
  durationHours: 5,
  timezone: "America/Manaus",

  venue: {
    name: "Maison Myrla Eventos",
    address: "Rua Barão de Indaiá, 1434",
    neighborhood: "Flores",
    city: "Manaus",
    state: "AM",
    fullAddress: "Rua Barão de Indaiá, 1434 — Flores, Manaus - AM",
    mapsQuery: "Maison Myrla Eventos, Rua Barão de Indaiá, 1434, Flores, Manaus, AM",
    parking:
      "Estacionamento disponível no local. Recomendamos chegar com antecedência para maior comodidade.",
    accessibility:
      "O espaço conta com acesso facilitado. Em caso de necessidades específicas, fale conosco no RSVP.",
    extra:
      "O convite é pessoal e intransferível. Em caso de dúvidas, utilize o formulário de confirmação.",
  },

  dressCode: {
    title: "Social / Esporte fino",
    intro:
      "Pedimos um visual elegante, confortável para a celebração e alinhado à atmosfera romântica da noite.",
    tips: [
      "Tons sóbrios e paleta burgundy, dourado ou marfim combinam com a festa.",
      "Evite branco, off-white e vestidos muito próximos ao tom do vestido da noiva.",
      "Salto e paletó são bem-vindos, mas o mais importante é se sentir bem.",
    ],
  },

  hero: {
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=80",
  },

  closing: {
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fe9d0f?auto=format&fit=crop&w=2000&q=80",
  },

  story: [
    {
      year: "2019",
      title: "O primeiro encontro",
      text: "Um olhar, uma conversa e a certeza silenciosa de que algo especial começava a acontecer.",
      photo:
        "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80",
    },
    {
      year: "2021",
      title: "Nosso primeiro grande sonho juntos",
      text: "A vida a dois ganhou forma: planos, viagens e a escolha de construir um caminho compartilhado.",
      photo:
        "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=900&q=80",
    },
    {
      year: "2025",
      title: "O pedido",
      text: "Entre nervosismo e alegria, a pergunta que mudou tudo — e um sim que ainda ecoa.",
      photo:
        "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=900&q=80",
    },
    {
      year: "2027",
      title: "O começo de um novo capítulo",
      text: "O grande dia chega para celebrar o amor, a família e o lar que vamos construir.",
      photo:
        "https://images.unsplash.com/photo-1460978812857-470ed1c77af0?auto=format&fit=crop&w=900&q=80",
    },
  ] satisfies StoryMilestone[],

  gallery: [
    {
      src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=80",
      alt: "Casal caminhando no grande dia",
      span: "wide",
    },
    {
      src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=900&q=80",
      alt: "Retrato íntimo dos noivos",
      span: "tall",
    },
    {
      src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=900&q=80",
      alt: "Cerimônia ao ar livre",
      span: "normal",
    },
    {
      src: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1200&q=80",
      alt: "Mãos com alianças",
      span: "normal",
    },
    {
      src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80",
      alt: "Alianças sobre flores",
      span: "wide",
    },
    {
      src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=80",
      alt: "Mesa posta da recepção",
      span: "normal",
    },
    {
      src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=900&q=80",
      alt: "Detalhes da festa",
      span: "tall",
    },
    {
      src: "https://images.unsplash.com/photo-1519167758481-83f29da8c2b0?auto=format&fit=crop&w=900&q=80",
      alt: "Bolo e detalhes da festa",
      span: "normal",
    },
    {
      src: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=1400&q=80",
      alt: "Casal em um instante romântico",
      span: "wide",
    },
    {
      src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80",
      alt: "Casal em um momento de carinho",
      span: "normal",
    },
  ] satisfies GalleryImage[],

  schedule: [
    {
      time: "18:00",
      title: "Cerimônia",
      description: "O momento mais esperado: o sim, as alianças e a emoção de quem ama.",
      icon: "rings",
    },
    {
      time: "19:00",
      title: "Recepção",
      description: "Brindes, abraços e as primeiras fotos da celebração.",
      icon: "cheers",
    },
    {
      time: "20:00",
      title: "Jantar",
      description: "Uma mesa para honrar quem veio de perto e de longe.",
      icon: "dinner",
    },
    {
      time: "21:00",
      title: "Festa",
      description: "Música, pista e a noite para dançar até não poder mais.",
      icon: "music",
    },
    {
      time: "23:00",
      title: "Encerramento",
      description: "O último brinde — e o começo da nossa vida a dois.",
      icon: "sparkles",
    },
  ] satisfies ScheduleItem[],

  faq: [
    {
      question: "Posso levar acompanhante?",
      answer:
        "Não. O casamento é por convite, e cada convite vale apenas para as pessoas nomeadas nele.",
    },
    {
      question: "Existe estacionamento no local?",
      answer:
        "Sim. A Maison Myrla Eventos oferece estacionamento. Chegue com alguns minutos de antecedência para se acomodar com calma.",
    },
    {
      question: "Qual o dress code?",
      answer:
        "Social / esporte fino. Evite branco e tons muito claros. O clima de Manaus pede tecidos leves, sem perder a elegância.",
    },
    {
      question: "Qual horário devo chegar?",
      answer:
        "A cerimônia começa às 18:00 e a celebração tem duração de 5 horas. Pedimos que cheguem até 17:40 para que todos estejam acomodados.",
    },
    {
      question: "Como confirmar minha presença?",
      answer:
        "Use o formulário de RSVP nesta página. Leva menos de um minuto e nos ajuda muito na organização.",
    },
    {
      question: "Existe lista de presentes?",
      answer:
        "Sim. A sua presença já é o maior presente, mas se quiser nos presentear, há uma lista e também a opção de PIX.",
    },
  ] satisfies FaqItem[],

  pix: {
    key: "05370147213",
    name: "Matheus Pereira",
    qrImage: "/pix-qr.jpg",
    /** Código PIX Copia e Cola (não exibido; usado no botão Enviar PIX) */
    copyPaste:
      "00020101021126330014br.gov.bcb.pix0111053701472135204000053039865802BR5915MATHEUS PEREIRA6006MANAUS62070503***6304BE1F",
  },

  gifts: {
    title: "Um presente para começar nossa nova história.",
    intro:
      "A presença de vocês já é o maior presente. Se quiserem contribuir com a construção do nosso lar, deixamos uma lista e o PIX.",
    listLabel: "Lista de presentes",
    listText: "Escolha um presente para nos ajudar a construir nosso novo lar.",
  },

  rsvp: {
    title: "Você faz parte desse momento.",
    subtitle: "Confirme sua presença e nos ajude a preparar cada detalhe com carinho.",
    successTitle: "Recebemos o seu RSVP.",
    successText:
      "Obrigado por responder. Estamos muito felizes em compartilhar esse dia com você.",
  },

  nav: [
    { id: "inicio", label: "Início" },
    { id: "historia", label: "Nossa História" },
    { id: "galeria", label: "Galeria" },
    { id: "local", label: "Local" },
    { id: "programacao", label: "Programação" },
    { id: "rsvp", label: "RSVP" },
    { id: "presentes", label: "Presentes" },
  ] satisfies { id: NavId; label: string }[],

  seo: {
    title: "Matheus & Brena | Nosso Casamento",
    description:
      "Estamos muito felizes em compartilhar esse momento especial com você. Confira todos os detalhes do nosso casamento.",
    url: "https://matheus-e-brena.example",
  },
} as const;

export function mapsUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function mapsEmbed(query: string) {
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&output=embed&z=16`;
}
