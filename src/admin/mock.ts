import { slug } from "./format";
import type { Group, Guest, GuestStatus, Invite, Side } from "./types";

/**
 * 80 convidados fictícios em 40 convites, só para o protótipo.
 * Formato: [rótulo, lado, grupo, pessoas, status por pessoa (y/n/p), observações].
 */
type Row = [string, Side, Group, string[], string, string?];

const rows: Row[] = [
  ["Família Pereira", "noivo", "familia", ["Antônio Pereira", "Lúcia Pereira"], "yy"],
  ["Família Souza", "noiva", "familia", ["Raimundo Souza", "Francisca Souza", "Letícia Souza"], "yyy"],
  ["Vó Conceição", "noiva", "familia", ["Maria da Conceição Souza"], "y", "Vai com a Família Souza."],
  ["Tio Josué e família", "noivo", "familia", ["Josué Pereira", "Raquel Pereira", "Davi Pereira", "Ana Clara Pereira"], "yyyy"],
  ["Tia Socorro", "noiva", "familia", ["Socorro Nascimento", "Edilson Nascimento"], "pp"],
  ["Primos Oliveira", "noivo", "familia", ["Gabriel Oliveira", "Beatriz Oliveira"], "yn", "Beatriz estará viajando a trabalho."],
  ["Família Nascimento", "noiva", "familia", ["Cláudio Nascimento", "Rosângela Nascimento", "Pedro Nascimento"], "nnn", "Estarão fora do país em março."],
  ["Padrinhos Lima", "noivo", "amigos", ["Rafael Lima", "Camila Lima"], "yy"],
  ["Madrinha Juliana", "noiva", "amigos", ["Juliana Costa", "Thiago Costa"], "yy", "Thiago não come frutos do mar."],
  ["Lucas Andrade", "noivo", "amigos", ["Lucas Andrade"], "p"],
  ["Mariana e Felipe", "noiva", "amigos", ["Mariana Rocha", "Felipe Rocha"], "yy"],
  ["Bruno Cardoso", "noivo", "amigos", ["Bruno Cardoso"], "y"],
  ["Larissa e Diego", "noiva", "amigos", ["Larissa Mendes", "Diego Mendes"], "pp"],
  ["Família Barbosa", "noivo", "familia", ["Sebastião Barbosa", "Irene Barbosa", "Paulo Barbosa"], "yyy", "Seu Sebastião usa cadeira de rodas."],
  ["Vitória Almeida", "noiva", "trabalho", ["Vitória Almeida"], "y"],
  ["Rodrigo e Aline", "noivo", "trabalho", ["Rodrigo Tavares", "Aline Tavares"], "pp"],
  ["Carla Figueiredo", "noiva", "trabalho", ["Carla Figueiredo"], "n", "Mandou um abraço, estará de plantão."],
  ["Marcos e Patrícia", "noivo", "trabalho", ["Marcos Ribeiro", "Patrícia Ribeiro"], "yy"],
  ["Família Moraes", "noiva", "familia", ["Jorge Moraes", "Sandra Moraes", "Igor Moraes", "Yasmin Moraes"], "pppp"],
  ["Amanda Freitas", "noiva", "amigos", ["Amanda Freitas"], "y", "Vegetariana."],
  ["Henrique e Isabela", "noivo", "amigos", ["Henrique Duarte", "Isabela Duarte"], "yy"],
  ["Família Campos", "noivo", "familia", ["Wagner Campos", "Eliane Campos"], "pp"],
  ["Tia Graça", "noiva", "familia", ["Maria das Graças Souza"], "y"],
  ["Renata e Caio", "noiva", "trabalho", ["Renata Batista", "Caio Batista"], "yp", "Caio confirma até o fim do mês."],
  ["Fernando Guimarães", "noivo", "trabalho", ["Fernando Guimarães"], "p"],
  ["Família Teixeira", "noivo", "amigos", ["Eduardo Teixeira", "Priscila Teixeira", "Miguel Teixeira"], "yyy", "Miguel tem 6 anos."],
  ["Natália Rezende", "noiva", "amigos", ["Natália Rezende"], "p"],
  ["Família Araújo", "noiva", "familia", ["Francisco Araújo", "Luzia Araújo", "Kelly Araújo"], "yyn"],
  ["João Victor e Débora", "noivo", "amigos", ["João Victor Farias", "Débora Farias"], "pp"],
  ["Família Castro", "noivo", "familia", ["Roberto Castro", "Márcia Castro", "Vinícius Castro"], "yyy", "Márcia tem alergia a amendoim."],
  ["Tatiane Monteiro", "noiva", "trabalho", ["Tatiane Monteiro"], "y"],
  ["Leandro e Jéssica", "noivo", "amigos", ["Leandro Pinto", "Jéssica Pinto"], "nn"],
  ["Família Brito", "noiva", "familia", ["Osmar Brito", "Nazaré Brito", "Emanuelle Brito"], "ppp"],
  ["Gustavo e Fernanda", "noivo", "trabalho", ["Gustavo Lopes", "Fernanda Lopes"], "yy"],
  ["Daniela Siqueira", "noiva", "amigos", ["Daniela Siqueira"], "y"],
  ["Família Pacheco", "noivo", "familia", ["Ricardo Pacheco", "Helena Pacheco"], "pp"],
  ["Sabrina e Matheus", "noiva", "amigos", ["Sabrina Nunes", "Matheus Nunes"], "yy"],
  ["André Queiroz", "noivo", "amigos", ["André Queiroz"], "p"],
  ["Família Lacerda", "noiva", "familia", ["Elias Lacerda", "Rute Lacerda", "Samuel Lacerda"], "yyy"],
  ["Paula e Otávio", "noiva", "trabalho", ["Paula Vasconcelos", "Otávio Vasconcelos"], "pn"],
];

const STATUS: Record<string, GuestStatus> = { y: "yes", n: "no", p: "pending" };

export function buildMockInvites(): Invite[] {
  return rows.map(([label, side, group, names, statuses, notes], i) => {
    const n = i + 1;
    const guests: Guest[] = names.map((name, j) => {
      const status = STATUS[statuses[j] ?? "p"] ?? "pending";
      if (status === "pending") return { id: `g${n}-${j}`, name, status };
      // Respostas espalhadas entre 20/08 e 29/09/2026.
      const day = new Date(Date.UTC(2026, 7, 20 + ((n * 7) % 40), 12 + (n % 9), (n * 13) % 60));
      return {
        id: `g${n}-${j}`,
        name,
        status,
        respondedAt: day.toISOString(),
        via: n % 5 === 0 ? "manual" : "site",
      };
    });
    const ddd = n % 7 === 0 ? "11" : "92";
    return {
      id: `c${n}`,
      label,
      side,
      group,
      phone: `(${ddd}) 9${8100 + n * 37}-${1000 + n * 53}`,
      notes: notes ?? "",
      token: `${slug(label)}-${(n * 7919).toString(36)}`,
      guests,
    };
  });
}
