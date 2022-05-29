# Plano de Testes de Software
Os requisitos para realização dos testes de software são:
- Site publicado na Internet
- Navegador da Internet - Chrome, Firefox ou Edge
- Conectividade de Internet para acesso às plataformas (APISs)

Os testes funcionais a serem realizados no aplicativo são descritos a seguir.


|Caso de Teste | CT-01 - Cadastrar com sucesso uma atividade e sua duração e tempo de intervalo|
|---|---|
|Requisitos Associados|RF-01 - O site deve apresentar na página principal a agenda para a criação de atividades <br>RF-02 - O site deve apresentar o timer para configuração de  tempo da atividade criada e seu intervalo|
|Objetivo do Teste|Verificar se a criação de atividades está acontecendo corretamente|
|Passos|1) Acessar o navegador<br> 2) Informar o endereço do site<br> 3) Visualizar a página principal <br> 4) Acionar [Adicionar atividade]<br>5) Preencher os dados obrigatórios<br>6) Acionar [Confirmar]|
|Critérios de Êxito|- Site informa a mensagem “Inclusão de dados realizada”<br> - Visualizar a atividade criada no menu “agenda”|

|Caso de Teste| CT-02 - Cadastrar uma atividade sem informar o nome da atividade|
|---|---|
|Requisitos Associados|RF-03 - O site deve permitir ao usuário a criação de uma nova atividade|
|Objetivo do Teste|Verificar se os campo “nome da atividade” é obrigatório|
|Passos|1) Acessar o navegador<br>2) Informar o endereço do site<br> 3) Visualizar a página principal<br>4) Acionar [Adicionar atividade]<br>5) Não preencher o campo “Atividade”<br>6) Preencher os demais campos obrigatórios<br>7) Acionar [Confirmar]|
|Critérios de Êxito|- Site informa a mensagem “Favor preencher todos os dados”|

|Caso de Teste|CT-03 - Cadastrar uma atividade sem informar o horário de início da atividade|
|---|---|
|Requisitos Associados|RF-04 - O site deve permitir ao usuário a criação de uma nova atividade|
|Objetivo do Teste|Verificar se os campos “Hora Início e Minuto Início” são obrigatórios|
|Passos|1) Acessar o navegador<br>2) Informar o endereço do site<br>3) Visualizar a página principal<br>4) Acionar [Adicionar atividade]<br>5) Não preencher o campo “Hora Início / Minuto início”<br>6) Preencher os demais campos obrigatórios<br>7) Acionar [Confirmar]|
|Critérios de Êxito|●	Site informa a mensagem “Favor preencher todos os dados”|




|Caso de Teste|CT-04 - Cadastrar uma atividade sem informar o horário de término da atividade|
|---|---|
|Requisitos Associados|RF-05 - O site deve permitir ao usuário a criação de uma nova atividade|
|Objetivo do Teste|Verificar se os campo “Hora Fim e Minuto Fim” são obrigatórios|
|Passos|1) Acessar o navegador<br>2) Informar o endereço do site<br>3) Visualizar a página principal<br>4) Acionar [Adicionar atividade]<br>5) Não preencher o campo “Hora Fim/ Minuto Fim”<br>6) Preencher os demais campos obrigatórios<br>7) Acionar [Confirmar]|
|Critérios de Êxito|- Site informa a mensagem “Favor preencher todos os dados”|