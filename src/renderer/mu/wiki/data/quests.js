export const quests = [
  {
    id: "q001",
    nome: "A Aranha do Abismo",
    descricao: "Investigue as aparições sombrias nas cavernas de Lorencia.",
    npc: "Capitão Sloth",
    local: "Lorencia, 120x42",
    requisitos: [
      { item: "Teia de Aranha", quantidade: 5 }
    ],
    objetivos: [
      { matar: "Arachnus", quantidade: 10 }
    ],
    recompensa: "500 XP, Núcleo de Aranha",
    img: "images/quests/quest_aranha.png"
  }
];