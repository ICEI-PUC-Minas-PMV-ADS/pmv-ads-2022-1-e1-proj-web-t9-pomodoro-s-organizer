const integrantes = [
  {
    nome: "Isabela Santos",
    descricao: "Sou mãe de dois gatos, já tive o cabelo de todas as cores e jogo lol faz 8 anos, tenho um marco que só 0,8% dos jogadores tem.",
    foto: "./fotos-integrantes/isabela.jpeg"
  },
  {
    nome: "Lucas Silva",
    descricao: "Possuo hobbies estranhos e desconexos: coleciono moedas, amo tocar violão, já ganhei medalha em campeonato de cubo mágico e gosto de brincar com um Arduíno nas horas livres montando uns circuitos.",
    foto: "./fotos-integrantes/lucas.jpeg"
  },
  {
    nome: "Luciano Prado",
    descricao: "Joguei Atari, Nintendo, MegaDrive. Usei Irc, bate-papo da UOL e muito ICQ. Sei de cor a musiquinha do Modem discado e ficava horas esperando dar meia noite pra pagar só 1 pulso (quem sabe sabe). Até hoje adoro tecnologia mas sem me desconectar da vida.",
    foto: "./fotos-integrantes/luciano.jpeg"
  },
  {
    nome: "Leonardo Souza",
    descricao: "Primeiro colocado no torneio de Mario Kart 64 do bairro por dois anos consecutivos. Cinéfilo mas apenas de Velozes e Furiosos. Na época de ensino médio, enquanto os amigos tinham espinha, já raspava as costeletas toda semana. Não sabe usar relógio analógico até hoje.",
    foto: "./fotos-integrantes/leonardo.jpeg"
  },
]

document.getElementById('integrantes-map').innerHTML = integrantes.map((integrante) => `
  <div class="container-integrante">
    <div class="container-img-descricao">
      <div><img class="integrantes-foto" src="${integrante.foto}" alt="${integrante.foto.substring(20)}" /></div>
      <h3>${integrante.nome}</h3>
    </div>
      <div class="integrante-descricao">${integrante.descricao}</div>
  </div>
`).join('')