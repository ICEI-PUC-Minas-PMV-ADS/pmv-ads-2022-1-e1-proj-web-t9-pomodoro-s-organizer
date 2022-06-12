# Especificações do Projeto

<span style="color:red">Pré-requisitos: <a href="01-Documentação de Contexto.md"> Documentação de Contexto</a></span>

A definição exata do problema e os pontos mais relevantes a serem tratados neste projeto foi consolidada através de reuniões periódicas entre os integrantes do grupo praticando um brainstorming, de trabalho de pesquisa  em reportagens e publicações acadêmicas e através de entrevistas de personas sobre o problema que o grupo propôs.

## Personas

As personas levantadas durante o processo de entendimento do problema são apresentadas nas tabelas que se seguem.

|Nome       | Idade | UF           |Motivação     |
|-----------|-------|--------------|--------------|
|Ana Carla  | 20    | Goiás        |ENEM          |
|Emanuelle  | 18    | Minas Gerais | ENEM         |
|Thamyres   | 17    | Minas Gerais | ENEM         |
|Jhoel      | 54    | Minas Gerais | Certificado  |
|Kauane     | 16    | Minas Gerais | ENEM         |
|Isabella   | 18    | Minas Gerais | ENEM         |

| Persona | Dificuldades | Em relação ao projeto |
|--------------|----------------|-------------------------|
| Ana Carla | Afirmou que manter a concentração nos estudos é difícil, apesar de dedicar de 6 a 8 horas por dia para isso. Apesar das dificuldades, conseguiu um resultado satisfatório no ENEM. Disse que sentiu muita falta de alguma ferramenta que a ajudasse na gestão do tempo. | Disse que usaria muito um site, ou até mesmo um App, que a ajudasse a focar no seu tempo de estudo e a guiasse para que não desperdiçasse seu tempo. |
| Emanuelle |Acredita que o fato de não ter tido uma boa base no Ensino Fundamental e  Ensino Médio influenciou mais do que a dificuldade de organização. Seguindo uma rotina de 6 horas por dia de estudo não atingiu a pontuação desejada. Encontrou ferramentas de gestão de tempo, porém não se adaptou a nenhuma.|Ela acredita que uma ferramenta customizável e de fácil utilização fosse contribuir muito para seus estudos.|
|Thamyres|Sua maior dificuldade foi se adaptar ao EAD, por ter ficado perdida e sem rumo quanto aos estudos. Obteve uma boa nota no ENEM, mas pretende melhorar esse resultado no próximo ano com a utilização de técnicas de estudo.|Acredita que, um site que ajudasse a elaborar um cronograma de estudos e dividir o tempo de acordo com as dificuldades entre as disciplinas, seria de grande ajuda.|
|Jhoel|Possui dificuldade em conciliar trabalho e estudos e possui poucas horas livres para se dedicar. Não se considera uma pessoa disciplinada o suficiente para fazer um planejamento de estudos, mas também não tem muita facilidade com tecnologia.|Usaria a ferramenta se ela fosse bem intuitiva e se não fosse necessário muitas configurações|
|Kauane|Sente que fica dispersa por não entender o conteúdo e não possui organização clara dos estudos. Também não encontra grande disponibilidade de aplicativos que disponham de interações para pessoas com deficiência visual.|Apresentou entusiasmo ao saber que a ferramenta dispõe de comandos de voz e avisos sonoros para diferentes momentos do estudo.|
|Isabella|Sua maior dificuldade foi lidar com a pressão que sentia e ansiedade próxima e durante as provas. Estudou cerca de 4 a 5 horas por dia e conseguiu obter o resultado esperado. Fez uso de uma ferramenta através de um site que a ajudou a montar um cronograma, e acredita que isso influenciou muito no resultado.|Disse que usaria essa ferramenta e que recomendaria bastante para estudantes inexperientes ainda com provas longas, por acreditar muito na eficiência deste tipo de site.|   

## Histórias de Usuários

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

|EU COMO...<br>`PERSONA`| ...QUERO/PRECISO ...<br>`FUNCIONALIDADE` |...PARA ...<br>`MOTIVO/VALOR`  |
|--------------------|------------------------------------|----------------------------------------|
| Ana Carla | Poder focar no meu tempo de estudo, sem desvio de atenção. | Para não me distrair durante o estudo e poder cumprir o cronograma que estabelecido. |
| Ana Carla | Poder ter um guia de quais matérias estudar. | Não desperdiçar tempo estudando matérias erradas. |
| Thamyres | Poder elaborar um cronograma de estudo que  dividisse o tempo de acordo com as dificuldades entre as disciplinas. | Não ficar perdido sobre qual matéria estudar e dividir o tempo adequadamente. |
| Emanuelle | poder fazer minha agenda de estudos, de forma rápida e fácil. | Para que eu possa seguir com minha rotina de estudos. |
| Jhoel | Algo fácil de para organizar meus estudos | Não sou muito disciplinado, preciso de algo fácil para  me ajudar com a organização |
| Jhoel | Algo que me estimula a me manter estudando | Para poder conseguir estudar todo o conteúdo de cada matéria|
| Kauane | Algo que me avise quando é momento de estudar e quando é momento de fazer pausa. | Para não ficar me dispersando durante o estudo. |
| Kauane | Avisos sonoros e poder ter comandos de voz. | Sou deficiente visual. |
| Isabella | Um ambiente sem notificações e com design clean e acolhedor | Para controlar um pouco da ansiedade. |
| Isabella | poder ver meu progresso de estudos | para saber o que falta estudar e diminuir a pressão. |

## Requisitos do Projeto

O escopo funcional do projeto é definido por meio dos requisitos funcionais que descrevem as possibilidades interação dos usuários, bem como os requisitos não funcionais que descrevem os aspectos que o sistema deverá apresentar de maneira geral. Estes requisitos são apresentados a seguir.


### Requisitos Funcionais

A tabela a seguir apresenta os requisitos do projeto, identificando a prioridade em que os mesmos devem ser entregues.

|ID     | Descrição do Requisito  | Prioridade |
|-------|-----------------------------------------|----|
| RF-01 | O site deve apresentar uma ferramenta de agenda para incluir e gerenciar as matérias que devem ser estudadas em cada horário| Alta | 
| RF-02 | O site deve apresentar um timer dentro da metodologia Pomodoro que informa o usuário se é um momento de estudo ou de intervalo. |  Alta |
| RF-03 | A agenda deve conter uma barra de status para que o usuário possa controlar o progresso de cada atividade | Alta |


### Requisitos não Funcionais

A tabela a seguir apresenta os requisitos não funcionais que o projeto deverá atender. 

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
| RNF-01 | O site deve ser publicado em um ambiente acessível publicamente na Internet (Repl.it, GitHub Pages, Heroku) |Alta | 
| RNF-02 | O site deverá ter design clean, sem muitas distrações para o usuário |  Alta | 
| RNF-03 | O site deve ser compatível com os principais navegadores do mercado (Google Chrome, Firefox, Microsoft Edge) |Alta |

## Restrições

As questões que limitam a execução desse projeto e que se configuram como obrigações claras para o desenvolvimento do projeto em questão são apresentadas na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|RE-01| A solução apresentada deve ser uma aplicação WEB, ou seja, uma solução que é executada diretamente em um navegador (browser) |
|RE-02| O projeto deverá ser entregue no final do semestre letivo, não podendo extrapolar a data de 26/06/2022 |
|RE-03| O aplicativo deve se restringir às tecnologias básicas da Web no Frontend | 
|RE-04| A equipe não pode subcontratar o desenvolvimento do trabalho |
