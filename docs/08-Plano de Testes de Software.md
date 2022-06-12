# Plano de Testes de Software
Os requisitos para realização dos testes de software são:
- Site publicado na Internet
- Navegador da Internet - Chrome, Firefox ou Edge
- Conectividade de Internet para acesso às plataformas (APISs)

Os testes funcionais a serem realizados no aplicativo são descritos a seguir.


|Caso de Teste | CT-01 - Cadastrar com sucesso uma atividade e sua duração e tempo de intervalo|
|---|---|
|Requisitos Associados|RF-01 - O site deve apresentar uma ferramenta de agenda para incluir e gerenciar as matérias que devem ser estudadas em cada horário.<br>RF-03 - A agenda deve conter uma barra de status para que o usuário possa controlar o progresso de cada atividade.
|
|Objetivo do Teste|Verificar se a criação de atividades está acontecendo corretamente|
|Passos|1) Acessar o navegador<br> 2) Informar o endereço do site<br> 3) Visualizar a página principal <br> 4) Acionar [Adicionar atividade]<br>5) Preencher os dados obrigatórios<br>6) Acionar [Confirmar]|
|Critérios de Êxito|- Site informa a mensagem “Inclusão de dados realizada”<br> - Visualizar a atividade criada no menu “agenda”|

|Caso de Teste| CT-02 - Cadastrar uma atividade sem informar o nome da atividade|
|---|---|
|Requisitos Associados|RF-01 - O site deve apresentar uma ferramenta de agenda para incluir e gerenciar as matérias que devem ser estudadas em cada horário.|
|Objetivo do Teste|Verificar se o campo “nome da atividade” é obrigatório|
|Passos|1) Acessar o navegador<br>2) Informar o endereço do site<br> 3) Visualizar a página principal<br>4) Acionar [Adicionar atividade]<br>5) Não preencher o campo “Atividade”<br>6) Preencher os demais campos obrigatórios<br>7) Acionar [Confirmar]|
|Critérios de Êxito|- Botão [Confirmar] permanece inativo|

|Caso de Teste|CT-03 - Cadastrar uma atividade sem informar o horário de início da atividade|
|---|---|
|Requisitos Associados|RF-01 - O site deve apresentar uma ferramenta de agenda para incluir e gerenciar as matérias que devem ser estudadas em cada horário.|
|Objetivo do Teste|Verificar se os campos “Hora Início e Minuto Início” são obrigatórios|
|Passos|1) Acessar o navegador<br>2) Informar o endereço do site<br>3) Visualizar a página principal<br>4) Acionar [Adicionar atividade]<br>5) Não preencher o campo “Hora Início / Minuto início”<br>6) Preencher os demais campos obrigatórios<br>7) Acionar [Confirmar]|
|Critérios de Êxito|- Botão [Confirmar] permanece inativo|

|Caso de Teste|CT-04 - Cadastrar uma atividade sem informar o horário de término da atividade|
|---|---|
|Requisitos Associados|RF-01 - O site deve apresentar uma ferramenta de agenda para incluir e gerenciar as matérias que devem ser estudadas em cada horário.|
|Objetivo do Teste|Verificar se os campo “Hora Fim e Minuto Fim” são obrigatórios|
|Passos|1) Acessar o navegador<br>2) Informar o endereço do site<br>3) Visualizar a página principal<br>4) Acionar [Adicionar atividade]<br>5) Não preencher o campo “Hora Fim/ Minuto Fim”<br>6) Preencher os demais campos obrigatórios<br>7) Acionar [Confirmar]|
|Critérios de Êxito|- Botão [Confirmar] permanece inativo|

|Caso de Teste|CT-05 - Completar uma atividade por completo|
|---|---|
|Requisitos Associados|RF-01 - O site deve apresentar uma ferramenta de agenda para incluir e gerenciar as matérias que devem ser estudadas em cada horário.<br>RF-03 - A agenda deve conter uma barra de status para que o usuário possa controlar o progresso de cada atividade.|
|Objetivo do Teste|Verificar se a mensagem “PARABÉNS! TAREFA CONCLUÍDA!” é mostrada pelo sistema|
|Passos|1) Acessar o navegador<br>2) Informar o endereço do site<br>3) Visualizar a página principal<br>4)  Acionar [Play]<br>5) Aguardar conclusão<br>|
|Critérios de Êxito|- Site informa a mensagem “PARABÉNS! TAREFA CONCLUÍDA!”<br>- Site informar barra de progresso com o status 100%|

|Caso de Teste|CT-06- Cadastrar uma atividade com coincide com o horário de outra atividade já cadastrada|
|---|---|
|Requisitos Associados|RF-01 - O site deve apresentar uma ferramenta de agenda para incluir e gerenciar as matérias que devem ser estudadas em cada horário.|
|Objetivo do Teste|Verificar se o sistema impossibilita cadastrar mais de uma atividade no mesmo horário|
|Passos|1) Acessar o navegador<br>2) Informar o endereço do site<br>3) Visualizar a página principal<br>4) Acionar [Adicionar atividade]<br>5) Preencher os dados obrigatórios<br>6) Acionar [Confirmar]<br>7) Acionar [Adicionar atividade]<br>8) Preencher os campos “Hora Início / Minuto início” e “Hora Fim/ Minuto Fim” com um valor que coincide com os valores dos campos atividade cadastrada anteriormente<br>|
|Critérios de Êxito|- Site informa a mensagem “O Fim da atividade coincide com outra atividade já programada”|

|Caso de Teste|CT-07- Deletar uma atividade com sucesso|
|---|---|
|Requisitos Associados|RF-01 - O site deve apresentar uma ferramenta de agenda para incluir e gerenciar as matérias que devem ser estudadas em cada horário.|
|Objetivo do Teste|Verificar se o sistema permite a exclusão de uma atividade com sucesso|
|Passos|1) Acessar o navegador<br>2) Informar o endereço do site<br>3) Visualizar a página principal<br>4) Acionar [Adicionar atividade]<br>5) Preencher os dados obrigatórios<br>6) Acionar [Confirmar]<br>7) Localizar a atividade criada anteriormente no menu “Agenda”<br>8) Acionar o botão  com o ícone de uma lixeira<br>9) Acionar [Confirmar exclusão]|
|Critérios de Êxito|- Atividade é removida do menu “Agenda”|

|Caso de Teste|CT-08- Editar uma atividade com sucesso|
|---|---|
|Requisitos Associados|RF-01 - O site deve apresentar uma ferramenta de agenda para incluir e gerenciar as matérias que devem ser estudadas em cada horário.|
|Objetivo do Teste|Verificar se o sistema permite a edição de uma atividade com sucesso|
|Passos|1) Acessar o navegador<br>2) Informar o endereço do site<br>3) Visualizar a página principal<br>4) Acionar [Adicionar atividade]<br>5) Preencher os dados obrigatórios<br>6) Acionar [Confirmar]<br>7) Localizar a atividade criada anteriormente no menu “Agenda”<br>8) Acionar o botão  com o ícone de um lápis<br>9) Alterar ao menos um campo da atividade<br>10) Acionar [Confirmar Alteração]|
|Critérios de Êxito|- Sistema informa a mensagem “Inclusão de dados realizada”<br>- Atividade com os dados alterados aparece no menu “Agenda”|

|Caso de Teste|CT-09- Deixar uma atividade em execução além do tempo determinado|
|---|---|
|Requisitos Associados|RF-02 - O site deve apresentar o timer para configuração de  tempo da atividade criada e seu intervalo.<br>RF-03 - A agenda deve conter uma barra de status para que o usuário possa controlar o progresso de cada atividade.|
|Objetivo do Teste|Verificar se o sistema não ultrapassa o status de 100% de uma atividade em execução|
|Passos|1) Acessar o navegador<br>2) Informar o endereço do site<br>3) Visualizar a página principal<br>4) Acionar [Adicionar atividade]<br>5) Preencher os dados obrigatórios<br>6) Acionar [Confirmar]<br>7) Acionar [Play] na atividade criada anteriormente<br>8) Deixar a atividade ultrapassar o limite de duração estabelecido<br>9) Verificar a barra de status|
|Critérios de Êxito|- Barra de status informa o valor de 100%|